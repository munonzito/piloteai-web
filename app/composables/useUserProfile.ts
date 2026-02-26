import type { UserProfile } from "../../types/progress";
import type { LicenseId } from "../../types/lesson";

export const useUserProfile = () => {
    const profile = useState<UserProfile | null>("userProfile", () => null);
    const loading = useState("userProfileLoading", () => false);

    const fetchProfile = async () => {
        loading.value = true;
        try {
            const data = await $fetch("/api/user/stats");
            const user = useUser();
            profile.value = {
                uid: user.value?.uid || "",
                email: user.value?.email || "",
                displayName: data.displayName,
                activeLicense: data.activeLicense as LicenseId,
                onboardingCompleted: data.onboardingCompleted,
                streak: data.streak,
                lastActivityDate: data.lastActivityDate,
                totalXP: data.totalXP,
                lessonsCompleted: data.lessonsCompleted,
            };
        } catch {
            profile.value = null;
        } finally {
            loading.value = false;
        }
    };

    const updateActiveLicense = async (licenseId: LicenseId) => {
        await $fetch("/api/user/update-license", {
            method: "POST",
            body: { licenseId },
        });
        if (profile.value) {
            profile.value = { ...profile.value, activeLicense: licenseId };
        }
    };

    const deleteAccount = async () => {
        await $fetch("/api/user/account", { method: "DELETE" });
    };

    return {
        profile,
        loading,
        fetchProfile,
        updateActiveLicense,
        deleteAccount,
    };
};
