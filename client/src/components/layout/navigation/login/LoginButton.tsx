"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { UserIcon } from "@heroicons/react/24/solid";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuthSlice } from "@/state/useAuthSlice";

export default function LoginButton({ serverAuth }: { serverAuth: boolean }) {
  const router = useRouter();

  const openLogin = useAuthSlice((state: any) => state.openLogin);
  const isLoggedIn = useAuthSlice((state) => state.isLoggedIn);

  //this block of code initilizes the state pre-hydration
  const [localLoginState, setLocalLoginState] = useState(serverAuth);
  useEffect(() => {
    if (isLoggedIn) setLocalLoginState(true);
    else setLocalLoginState(false);
  }, [isLoggedIn]);

  return (
    <>
      {!localLoginState ? (
        <Button variant="outline" onClick={() => openLogin()}>
          <UserIcon className="mr-2 size-6" />
          Log in
        </Button>
      ) : (
        <Button variant="outline" onClick={() => router.push(`/account`)}>
          <UserIcon className="mr-2 size-6" />
          View Account
        </Button>
      )}
      <LoginModal />
      <SignupModal />
    </>
  );
}
