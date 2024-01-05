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

  return (
    <AlertDialog open={loginIsOpen} onOpenChange={() => closeLogin()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login</AlertDialogTitle>
          <AlertDialogDescription>
            <form className=" w-full space-y-6">
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
            </form>
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
  );
}
