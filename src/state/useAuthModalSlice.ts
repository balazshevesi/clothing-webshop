import { create } from "zustand";

interface useOverlays {
  loginIsOpen: boolean;
  openLogin: Function;
  closeLogin: Function;

  signupIsOpen: boolean;
  openSignup: Function;
  closeSignup: Function;
}

export const useAuthModalSlice = create<useOverlays>()((set) => ({
  loginIsOpen: false,
  openLogin: () =>
    set((state: any) => {
      return { loginIsOpen: true };
    }),
  closeLogin: () =>
    set((state: any) => {
      return { loginIsOpen: false };
    }),

  signupIsOpen: false,
  openSignup: () =>
    set((state: any) => {
      return { signupIsOpen: true };
    }),
  closeSignup: () =>
    set((state: any) => {
      return { signupIsOpen: false };
    }),
}));
