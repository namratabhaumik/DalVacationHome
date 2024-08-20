import { create } from "zustand";

const userStore = create((set) => ({
    userRole: localStorage.getItem('userRole') || null,
    userId: localStorage.getItem('userId') || null,
    setUserRoleAndId: (role, userId) => {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', userId);
        set({ userRole: role, userId: userId })
    },
    deleteUserRoleAndId: () => {
        localStorage.clear();
        set({ userRole: null, userId: null })
    },
}))

export default userStore;