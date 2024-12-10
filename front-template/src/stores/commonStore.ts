import { ServerError } from "@/model/CommonInterfaces";
import { create } from "zustand";

interface CommonState {
  error: ServerError | null;
  token: string | null;
  appLoaded: boolean;
  setServerError: (error: ServerError) => void;
  setToken: (token: string | null) => void;
  setAppLoaded: () => void;
}

export const useCommonStore = create<CommonState>((set) => ({
  error: null,
  token:
    typeof window !== "undefined" ? window.localStorage.getItem("jwt") : null,
  appLoaded: false,

  setServerError: (error) => {
    set({ error });
  },

  setToken: (token) => {
    set({ token });
    if (token) {
      window.localStorage.setItem("jwt", token);
    } else {
      window.localStorage.removeItem("jwt");
    }
  },

  setAppLoaded: () => {
    set({ appLoaded: true });
  },
}));
