"use client";

//TODO VALIDATE INPUT
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function SignupModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [passwordIsWeak, setPasswordIsWeak] = useState(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const openLogin = useAuthSlice((state) => state.openLogin);
  const signupIsOpen = useAuthSlice((state) => state.signupIsOpen);
  const closeSignup = useAuthSlice((state) => state.closeSignup);
  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);

  const handleSignup = async (formData: any) => {
    console.log("handleSignup was called");
    if (formData.password.length < 8) {
      setPasswordIsWeak(true);
      return;
    } else {
      setPasswordIsWeak(false);
    }
    setIsLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "post",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      setServerError(true);
      setIsLoading(false);
    } else {
      setServerError(false);
      setIsLoading(false);
    }

    const data = await response.json();
    //on sucess
    if (data.userIdJwt) {
      document.cookie = `Authorization=${data.userIdJwt}`;
      document.cookie = `UserInfo=${JSON.stringify(data.userInfo)}`;

      setLoggedinTrue();
      closeSignup();
      reset();
    } else if (data.errorMessage === "email is taken") setEmailIsTaken(true);
    else setEmailIsTaken(false);

    setIsLoading(false);
  };

  return (
    <AlertDialog open={signupIsOpen} onOpenChange={() => closeSignup()}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(handleSignup)}>
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
                      {...register("firstName")}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      type="text"
                      id="lname"
                      placeholder="Last Name"
                      {...register("lastName")}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    warningText={emailIsTaken && "This email is already in use"}
                    className="w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="tel">Phone</Label>
                  <Input
                    className="max-w-full"
                    type="tel"
                    id="tel"
                    placeholder="Phone Number"
                    {...register("phone")}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    warningText={
                      passwordIsWeak &&
                      "Please choose a stronger password, minimum 8 characters"
                    }
                    className="max-w-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!!serverError && (
            <div className="py-2 font-medium text-red-500">
              We're having difficulties reaching our server, try again later
            </div>
          )}
          <AlertDialogFooter>
            <Button
              type="button"
              variant="link"
              onClick={() => {
                closeSignup();
                openLogin();
              }}
            >
              Already have an account?
            </Button>
            <Button
              type="button"
              onClick={() => closeSignup()}
              variant="outline"
            >
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
