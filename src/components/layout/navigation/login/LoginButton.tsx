"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import getCookie from "@/utils/getCookie";

import { Button } from "@/components/ui/button";

import { UserIcon } from "@heroicons/react/24/solid";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuthSlice } from "@/state/useAuthSlice";

export default function LoginButton() {
  const openLogin = useAuthSlice((state: any) => state.openLogin) as any;
  const isLoggedIn = useAuthSlice((state) => state.isLoggedIn);
  const router = useRouter();

  const userInfoString = getCookie("userInfo");
  const userInfoJson = userInfoString ? JSON.parse(userInfoString) : "";

  return (
    <>
      {!isLoggedIn ? (
        <Button variant="outline" onClick={() => openLogin()}>
          <UserIcon className="mr-2 size-6" />
          Log in
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => router.push(`/account/${userInfoJson.email}`)}
        >
          <UserIcon className="mr-2 size-6" />
          View Account
        </Button>
      )}{" "}
      <LoginModal />
      <SignupModal />
    </>
  );
}
