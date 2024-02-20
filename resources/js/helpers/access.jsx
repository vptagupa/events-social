export const canAccess = (user, permission, action = "ALL") => {
    const access = (user?.access ?? [])[permission] ?? [];

    return access.includes(action) || access.includes("ALL");
};
