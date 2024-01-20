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

import {
  EmailSchema,
  FirstNameSchema,
  LastNameSchema,
  PasswordSchema,
  PhoneSchema,
} from "@/inputValidation/schema";
import { useAuthSlice } from "@/state/useAuthSlice";
import { useFavsSlice } from "@/state/useFavsSlice";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";
import { parse, flatten, safeParse } from "valibot";

export default function SignupModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [serverError, setServerError] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const [firstNameValidationMsg, setFirstNameValidationMsg] = useState("");
  const [lastNameValidationMsg, setLastNameValidationMsg] = useState("");
  const [emailValidationMsg, setEmailValidationMsg] = useState("");
  const [phoneValidationMsg, setPhoneValidationMsg] = useState("");
  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");

  const openLogin = useAuthSlice((state) => state.openLogin);
  const signupIsOpen = useAuthSlice((state) => state.signupIsOpen);
  const closeSignup = useAuthSlice((state) => state.closeSignup);
  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);

  const resetCart = useShoppingCartSlice((state) => state.resetCart);
  const fetchAndSetCart = useShoppingCartSlice(
    (state) => state.fetchAndSetCart,
  );
  const fetchAndSetFavs = useFavsSlice(
    (state: any) => state.fetchAndSetFavs,
  ) as any;
  const resetFavs = useFavsSlice((state: any) => state.fetchAndSetFavs) as any;

  const handleSignup = async (formData: any) => {
    let validInput = true;
    const fnameValStatus = safeParse(FirstNameSchema, formData.firstName);
    if (!fnameValStatus.success) {
      setFirstNameValidationMsg(fnameValStatus.issues[0].message);
      validInput = false;
    } else setFirstNameValidationMsg("");

    const lastNameValStatus = safeParse(LastNameSchema, formData.lastName);
    if (!lastNameValStatus.success) {
      setLastNameValidationMsg(lastNameValStatus.issues[0].message);
      validInput = false;
    } else setLastNameValidationMsg("");

    const emailValStatus = safeParse(EmailSchema, formData.email);
    if (!emailValStatus.success) {
      setEmailValidationMsg(emailValStatus.issues[0].message);
      validInput = false;
    } else setEmailValidationMsg("");

    const phoneValStatus = safeParse(PhoneSchema, formData.phone);
    if (!phoneValStatus.success) {
      setPhoneValidationMsg(phoneValStatus.issues[0].message);
      validInput = false;
    } else setPhoneValidationMsg("");

    const passwordValStatus = safeParse(PasswordSchema, formData.password);
    if (!passwordValStatus.success) {
      setPasswordValidationMsg(passwordValStatus.issues[0].message);
      validInput = false;
    } else setPasswordValidationMsg("");
    if (!validInput) return;

    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/signup`,
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
    //on sucess
    if (data.userIdJwt) {
      document.cookie = `userAuth=${data.userIdJwt}`;
      document.cookie = `userInfo=${JSON.stringify(data.userInfo)}`;

      setLoggedinTrue();
      closeSignup();

      resetCart();
      fetchAndSetCart();

      resetFavs();
      fetchAndSetFavs();

      reset();
    } else if (data.errorMessage === "email is taken") setEmailIsTaken(true);
    else setEmailIsTaken(false);

    setIsLoading(false);
  };

  return (
    <AlertDialog
      open={signupIsOpen}
      onOpenChange={() => {
        closeSignup();
        reset();
      }}
    >
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
                      warningText={firstNameValidationMsg}
                      novalidate={true}
                      type="text"
                      id="fname"
                      placeholder="First Name"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      warningText={lastNameValidationMsg}
                      novalidate={true}
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
                    novalidate={true}
                    warningText={
                      emailValidationMsg ||
                      (emailIsTaken && "This email is already in use")
                    }
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
                    novalidate={true}
                    warningText={phoneValidationMsg}
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
                    novalidate={true}
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
          {!!serverError && (
            <div className="py-2 font-medium text-red-500">
              We're having difficulties reaching our server, try again later
            </div>
          )}
          <AlertDialogFooter className="pt-6">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                closeSignup();
                reset();
                openLogin();
              }}
            >
              Already have an account?
            </Button>
            <Button
              type="button"
              onClick={() => {
                closeSignup();
                reset();
              }}
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
