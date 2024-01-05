"use client";

//! TODO VALIDATE INPUT, BOTH CLIENT SIDE AND SERVER SIDE!!!
import { collectAppConfig } from "next/dist/build/utils";

import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ResponseAuthSignup } from "@/app/api/auth/signup/route";
import { useAuthSlice } from "@/state/useAuthSlice";

export default function SignupModal() {
  // State management for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [passwordIsWeak, setPasswordIsWeak] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);

  const openLogin = useAuthSlice((state) => state.openLogin);
  const signupIsOpen = useAuthSlice((state) => state.signupIsOpen);
  const closeSignup = useAuthSlice((state) => state.closeSignup);

  const isLoggedIn = useAuthSlice((state) => state.isLoggedIn);
  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);
  const setLogedginFalse = useAuthSlice((state) => state.setLogedginFalse);

  const onSuccessfullSignup = (data: ResponseAuthSignup) => {
    document.cookie = `Authorization=${data.userIdJwt}`;
    document.cookie = `UserInfo=${JSON.stringify(data.userInfo)}`;

    closeSignup();
    setLoggedinTrue();

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordIsWeak(true);
      return;
    } else setPasswordIsWeak(false);

    setIsLoading(true);

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    const response = await fetch("/api/auth/signup", {
      method: "post",
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.userIdJwt) onSuccessfullSignup(data);
    if (data.errorMessage === "email is taken") setEmailIsTaken(true);
    else setEmailIsTaken(false);
    setIsLoading(false);
  };

  return (
    <AlertDialog open={signupIsOpen} onOpenChange={() => closeSignup()}>
      <AlertDialogContent>
        <form onSubmit={handleSignup}>
          <AlertDialogHeader>
            <AlertDialogTitle>Signup</AlertDialogTitle>
            <AlertDialogDescription className="py-4">
              <div className="w-full space-y-6">
                <div className="flex gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      type="text"
                      id="lname"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    warningText={
                      !!emailIsTaken && "This email is alredy in use"
                    }
                    className="w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="tel">Phone</Label>
                  <Input
                    className="max-w-full"
                    type="tel"
                    id="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    warningText={
                      !!passwordIsWeak &&
                      "Please choose a stronger password, minimum 8 characters"
                    }
                    className="max-w-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="link"
              onClick={() => {
                closeSignup();
                openLogin();
              }}
            >
              Already have an account?
            </Button>
            <Button onClick={() => closeSignup()} variant="outline">
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Signup
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
