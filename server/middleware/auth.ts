import { firebaseAuth } from "../lib/firebase";
import { getSubscriptionStatusByEmail } from "../utils/subscriptions";
import type { PiloteaiUser } from "../../types/user";

export default defineEventHandler(async (event) => {
    const sessionCookie = getCookie(event, "session");
    let user: PiloteaiUser | null = null;

    if (sessionCookie) {
        try {
            const decoded = await firebaseAuth.verifySessionCookie(sessionCookie, true);
            user = {
                uid: decoded.uid,
                email: decoded.email,
            };

            if (user.email) {
                const subscriptionStatus = await getSubscriptionStatusByEmail(user.email);
                event.context.subscriptionStatus = subscriptionStatus;
            }
        } catch (_e) {
            user = null;
        }
    }

    event.context.user = user;
});
