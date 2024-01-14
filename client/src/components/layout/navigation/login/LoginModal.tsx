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

import { EmailSchema, PasswordSchema } from "@/inputValidation/schema";
import { useAuthSlice } from "@/state/useAuthSlice";
import { parse, flatten, safeParse } from "valibot";

export default function LoginModal() {
  const loginIsOpen = useAuthSlice((state) => state.loginIsOpen);
  const closeLogin = useAuthSlice((state) => state.closeLogin);
  const openSignup = useAuthSlice((state) => state.openSignup);
  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);

  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
  const [emailValidationMsg, setEmailValidationMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleSignup = async (formData: any) => {
    let validInput = true;
    const emailValStatus = safeParse(EmailSchema, formData.email);
    if (!emailValStatus.success) {
      setEmailValidationMsg(emailValStatus.issues[0].message);
      validInput = false;
    } else setEmailValidationMsg("");

    const passwordValStatus = safeParse(PasswordSchema, formData.password);
    if (!passwordValStatus.success) {
      setPasswordValidationMsg(passwordValStatus.issues[0].message);
      validInput = false;
    } else setPasswordValidationMsg("");

    if (!validInput) return;

    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/login`,
      {
        method: "post",
        body: JSON.stringify(formData),
      },
    );

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
      document.cookie = `userAuth=${data.userIdJwt}`;
      document.cookie = `userInfo=${JSON.stringify(data.userInfo)}`;
      setLoggedinTrue();
      setIsIncorrect(false);
      closeLogin();
      reset();
    } else setIsIncorrect(true);

    setIsLoading(false);
  };

  return (
    <AlertDialog
      open={loginIsOpen}
      onOpenChange={() => {
        closeLogin();
        reset();
      }}
    >
      <AlertDialogContent>
        <form onSubmit={handleSubmit(handleSignup)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Login</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    warningText={emailValidationMsg}
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
                    warningText={passwordValidationMsg}
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
          <AlertDialogFooter className="pt-6">
            <Button
              type="button"
              onClick={() => {
                closeLogin();
                reset();
                openSignup();
              }}
              variant="link"
            >
              Don't have an account?
            </Button>
            <Button
              type="button"
              onClick={() => {
                closeLogin();
                reset();
              }}
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
