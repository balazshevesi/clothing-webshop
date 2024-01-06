"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function LoginModal() {
  const loginIsOpen = useAuthSlice((state) => state.loginIsOpen);
  const closeLogin = useAuthSlice((state) => state.closeLogin);
  const openSignup = useAuthSlice((state) => state.openSignup);
  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleSignup = async (formData: any) => {
    setIsLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    if (response.status === 500) {
      setServerError(true);
      setIsLoading(false);
    } else {
      setServerError(false);
      setIsLoading(false);
    }

    const data = await response.json();
    //on success
    if (data.userIdJwt) {
      document.cookie = `Authorization=${data.userIdJwt}`;
      document.cookie = `UserInfo=${JSON.stringify(data.userInfo)}`;
      setLoggedinTrue();
      setIsIncorrect(false);
      closeLogin();
      reset();
    } else setIsIncorrect(true);

    setIsLoading(false);
  };

  return (
    <AlertDialog open={loginIsOpen} onOpenChange={() => closeLogin()}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(handleSignup)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Login</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="w-full"
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="max-w-full"
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!!isIncorrect && (
            <div className="py-2 font-medium text-red-500">
              Incorrect login information, try again
            </div>
          )}
          {!!serverError && (
            <div className="py-2 font-medium text-red-500">
              We're having difficulties reaching our server, try again later
            </div>
          )}
          <AlertDialogFooter>
            <Button
              type="button"
              onClick={() => {
                closeLogin();
                openSignup();
              }}
              variant="link"
            >
              Don't have an account?
            </Button>
            <Button
              type="button"
              onClick={() => closeLogin()}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
