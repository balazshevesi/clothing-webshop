"use client";

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

import { useAuthModalSlice } from "@/state/useAuthModalSlice";

export default function SignupModal() {
  // State management for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const openLogin = useAuthModalSlice((state) => state.openLogin);
  const signupIsOpen = useAuthModalSlice((state) => state.signupIsOpen);
  const closeSignup = useAuthModalSlice((state) => state.closeSignup);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    // Add validation logic here if needed
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    // TODO: Send userData to backend or API endpoint
    console.log("Submitting user data:", userData);

    const response = await fetch(`/api/auth/signup`, {
      method: "post",
      body: JSON.stringify({ userData }),
    });
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
            <Button type="submit">Signup</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
