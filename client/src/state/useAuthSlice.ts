import { create } from "zustand";

interface UseAuthSlice {
  //handle loginModal
  loginIsOpen: boolean;
  openLogin: Function;
  closeLogin: Function;

  //handle signupModal
  signupIsOpen: boolean;
  openSignup: Function;
  closeSignup: Function;

  //handle logged in state
  isLoggedIn: boolean;
  setLoggedinTrue: Function;
  setLogedginFalse: Function;
}

export const useAuthSlice = create<UseAuthSlice>()((set) => ({
  isLoggedIn: false,
  setLoggedinTrue: () =>
    set((state: any) => {
      return { isLoggedIn: true };
    }),
  setLogedginFalse: () =>
    set((state: any) => {
      return { isLoggedIn: false };
    }),

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
