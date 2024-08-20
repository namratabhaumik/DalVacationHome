import { create } from "zustand";

const useReservationStore = create((set) => ({
    reservationIds: [],
    addReservationId: (reservationId) => {
        set((state) => ({
            reservationIds: [...state.reservationIds,reservationId]
        }))
    },
    removeAllReservationIds: () => {
        set(({
            reservationIds: []
        }))
    }
}))

export default useReservationStore;