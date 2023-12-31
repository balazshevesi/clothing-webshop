"use client";

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

import { UserIcon } from "@heroicons/react/24/solid";

import { useOverlaysSlice } from "@/state/useOverlaysSlice";

export default function Login() {
  const loginIsOpen = useOverlaysSlice(
    (state: any) => state.loginIsOpen,
  ) as any;
  const openLogin = useOverlaysSlice((state: any) => state.openLogin) as any;
  const closeLogin = useOverlaysSlice((state: any) => state.closeLogin) as any;

  const signupIsOpen = useOverlaysSlice(
    (state: any) => state.signupIsOpen,
  ) as any;
  const openSignup = useOverlaysSlice((state: any) => state.openSignup) as any;
  const closeSignup = useOverlaysSlice(
    (state: any) => state.closeSignup,
  ) as any;

  return (
    <>
      <Button variant="outline" onClick={() => openLogin()}>
        <UserIcon className="mr-2 size-6" />
        Log in
      </Button>
      <AlertDialog open={loginIsOpen} onOpenChange={() => closeLogin()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login</AlertDialogTitle>
            <AlertDialogDescription>
              <div className=" w-full space-y-6">
                <div className="flex gap-4"></div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className=" w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="tel">Password</Label>
                  <Input
                    className="max-w-full"
                    type="password"
                    id="password"
                    placeholder="password"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                closeLogin();
                openSignup();
              }}
              variant="link"
            >
              Don&apos;t have an account?
            </Button>
            <Button onClick={() => closeLogin()} variant="outline">
              Cancel
            </Button>
            <AlertDialogAction>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={signupIsOpen} onOpenChange={() => closeSignup()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Signup</AlertDialogTitle>
            <AlertDialogDescription className=" py-4">
              <div className=" w-full space-y-6">
                <div className="flex gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="fnamn">First Name</Label>
                    <Input type="fname" id="fnamn" placeholder="First Name" />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input type="lname" id="lname" placeholder="Last Name" />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className=" w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="tel">Phone</Label>
                  <Input
                    className="max-w-full"
                    type="tel"
                    id="tel"
                    placeholder="073"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="">Password</Label>
                  <Input
                    className="max-w-full"
                    type="password"
                    id="password"
                    placeholder="Password"
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
            <AlertDialogAction>Signup</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
