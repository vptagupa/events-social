export const canAccess = (user, pagePermission) => {
    return true;
    const access = Object.keys(user?.data?.access ?? []);

    return access.includes(pagePermission);
};
