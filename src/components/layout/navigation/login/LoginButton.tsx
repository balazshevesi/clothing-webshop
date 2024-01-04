"use client";

import { Button } from "@/components/ui/button";

import { UserIcon } from "@heroicons/react/24/solid";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuthModalSlice } from "@/state/useAuthModalSlice";

export default function Login() {
  const openLogin = useAuthModalSlice((state: any) => state.openLogin) as any;

  return (
    <>
      <Button variant="outline" onClick={() => openLogin()}>
        <UserIcon className="mr-2 size-6" />
        Log in
      </Button>
      <LoginModal />
      <SignupModal />
    </>
  );
}
