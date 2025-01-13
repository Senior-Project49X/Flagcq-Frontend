import { getCookie } from "./cookies";

const role = { 
    admin: "Admin",
    user: "User",
    Ta : "Ta"
};

const checkUserRole = (expectedRole: string) => {
    return getCookie("user-role") === expectedRole;
}

export const isRoleUser = () => checkUserRole(role.user);
export const isRoleTa = () => checkUserRole(role.Ta);
export const isRoleAdmin = () => checkUserRole(role.admin);