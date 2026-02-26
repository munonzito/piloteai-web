import { firebaseAuth } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ idToken?: string }>(event);
    const idToken = body?.idToken;

    if (!idToken) {
        throw createError({ statusCode: 400, statusMessage: "Missing idToken" });
    }

    const expiresInMs = 14 * 24 * 60 * 60 * 1000;
    const sessionCookie = await firebaseAuth.createSessionCookie(idToken, { expiresIn: expiresInMs });
    const maxAgeSeconds = Math.floor(expiresInMs / 1000);

    const useEmulators = !process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID;

    setCookie(event, "session", sessionCookie, {
        httpOnly: true,
        secure: !useEmulators && process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: maxAgeSeconds,
    });

    return { success: true };
});
