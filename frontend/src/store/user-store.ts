import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserProps {
  id: string;
  name: string;
}

interface UserState {
  user: UserProps | undefined;
  favoriteIds: number[];
}

interface UserActions {
  saveUser: (user: UserProps | undefined) => void;
  saveFavoriteIds: (ids: number[]) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,
      favoriteIds: [],

      saveUser: (user) => set({ user }),
      saveFavoriteIds: (ids) => set({ favoriteIds: ids }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserContext = () => useUserStore();
