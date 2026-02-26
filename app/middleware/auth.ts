export default defineNuxtRouteMiddleware((to) => {
    const user = useUser();

    if (!user.value && to.path !== "/acceder") {
        return navigateTo("/acceder");
    }

    if (user.value && to.path === "/acceder") {
        return navigateTo("/inicio");
    }
});
