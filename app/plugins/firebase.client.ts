import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, connectAuthEmulator } from "firebase/auth";
import type { PiloteaiUser } from "../../types/user";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    const firebaseUser = useUser();
    const { setAuthReady, setAuthUser } = useAuthState();

    const useEmulators =
        !config.public.firebaseApiKey ||
        config.public.firebaseProjectId === "demo-piloteai" ||
        config.public.firebaseApiKey === "demo-api-key";

    const emulatorHost = typeof window !== "undefined" ? window.location.hostname : "localhost";

    const firebaseConfig = {
        apiKey: useEmulators ? "AIzaSyDEMO-fake-api-key-for-emulator" : config.public.firebaseApiKey,
        authDomain: useEmulators ? `${emulatorHost}:9099` : config.public.firebaseAuthDomain,
        projectId: useEmulators ? "demo-piloteai" : config.public.firebaseProjectId,
    };

    const app = initializeApp(firebaseConfig as FirebaseOptions);

    let auth;
    if (useEmulators) {
        auth = initializeAuth(app, { persistence: browserLocalPersistence });
        connectAuthEmulator(auth, `http://${emulatorHost}:9099`, { disableWarnings: true });
    } else {
        auth = getAuth(app);
    }

    let isFirebaseInitialized = false;

    auth.authStateReady().then(() => {
        isFirebaseInitialized = true;
        setAuthReady(true);
    });

    auth.onIdTokenChanged(async (user) => {
        if (user) {
            try {
                const idToken = await user.getIdToken();
                await $fetch("/api/auth/sessionLogin", {
                    method: "POST",
                    body: { idToken },
                });
            } catch (e) {
                console.error("Error creating session cookie:", e);
            }

            const appUser: PiloteaiUser = {
                uid: user.uid,
                email: user.email ?? undefined,
            };
            firebaseUser.value = appUser;
            setAuthUser(appUser);
        } else {
            if (isFirebaseInitialized) {
                try {
                    await $fetch("/api/auth/sessionLogout", { method: "POST" });
                } catch (e) {
                    console.error("Error clearing session cookie:", e);
                }
            }
            firebaseUser.value = null;
            setAuthUser(null);
        }
    });

    if (import.meta.client) {
        setInterval(async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                try {
                    await currentUser.getIdToken(true);
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            }
        }, 5 * 60 * 1000);
    }

    return {
        provide: {
            auth,
        },
    };
});
