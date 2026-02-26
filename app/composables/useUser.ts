import { useState } from "#app";
import type { PiloteaiUser } from "../../types/user";

export default function () {
    const user = useState<PiloteaiUser | null>("user", () => null);

    if (import.meta.server) {
        const event = useRequestEvent();
        if (event) {
            user.value = event.context.user ?? null;
        }
    }

    return user;
}
