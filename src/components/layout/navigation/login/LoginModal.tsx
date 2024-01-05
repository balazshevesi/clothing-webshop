import { useState } from "react";

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

import { useAuthSlice } from "@/state/useAuthSlice";

export default function LoginModal() {
  const loginIsOpen = useAuthSlice((state: any) => state.loginIsOpen) as any;
  const closeLogin = useAuthSlice((state: any) => state.closeLogin) as any;
  const openSignup = useAuthSlice((state: any) => state.openSignup) as any;

  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const setLoggedinTrue = useAuthSlice((state) => state.setLoggedinTrue);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSuccessfullLogin = (data: any) => {
    document.cookie = `Authorization=${data.userIdJwt}`;
    document.cookie = `UserInfo=${JSON.stringify(data.userInfo)}`;

    setEmail("");
    setPassword("");

    setLoggedinTrue();
    setIsIncorrect(false);

    closeLogin();
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.userIdJwt) onSuccessfullLogin(data);
    if (data.errorMessage === "unauthorized") setIsIncorrect(true);
    else setIsIncorrect(false);
    setIsLoading(false);
  };

  return (
    <AlertDialog open={loginIsOpen} onOpenChange={() => closeLogin()}>
      <AlertDialogContent>
        <form onSubmit={handleSignup}>
          <AlertDialogHeader>
            <AlertDialogTitle>Login</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex gap-4"></div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  className=" w-full"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="max-w-full"
                  type="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!!isIncorrect && (
            <div className="py-2 font-medium text-red-500">
              Incorrect login information, try again
            </div>
          )}
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
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
