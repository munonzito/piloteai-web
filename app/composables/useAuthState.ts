import { ref, watch, readonly } from "vue";
import type { PiloteaiUser } from "../../types/user";

const isAuthReady = ref(false);
const authUser = ref<PiloteaiUser | null>(null);

export const useAuthState = () => {
    const setAuthReady = (ready: boolean) => {
        isAuthReady.value = ready;
    };

    const setAuthUser = (user: PiloteaiUser | null) => {
        authUser.value = user;
    };

    const waitForAuthReady = (): Promise<void> => {
        return new Promise((resolve) => {
            if (isAuthReady.value) {
                resolve();
                return;
            }

            const unwatch = watch(isAuthReady, (ready) => {
                if (ready) {
                    unwatch();
                    resolve();
                }
            });
        });
    };

    return {
        isAuthReady: readonly(isAuthReady),
        authUser: readonly(authUser),
        setAuthReady,
        setAuthUser,
        waitForAuthReady,
    };
};
