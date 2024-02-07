"use client";

import { createKey } from "next/dist/shared/lib/router/router";

import { useState } from "react";

import getCookie from "@/utils/getCookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useMutation, useQuery } from "@tanstack/react-query";

interface EditProps {
  initialData: any;
}
export default function Edit({ initialData }: EditProps) {
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [email, setEmail] = useState(initialData.email);
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber);

  const initialIsDiff =
    initialData.firstName !== firstName ||
    initialData.lastName !== lastName ||
    initialData.email !== email ||
    initialData.phoneNumber !== phoneNumber;

  const { data } = useQuery({
    queryKey: ["userData", initialData.id],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${initialData.id}`,
        {
          method: "get",
          headers: {
            userAuth: getCookie("userAuth")!,
          },
        },
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = (await response.json()).userInfo;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      // return response.json();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userData: typeof initialData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${userData.id}`,
        {
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          }),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            userAuth: getCookie("userAuth")!,
          },
        },
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      id: initialData.id,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 py-4">
      <Input
        placeholder="First name"
        value={firstName}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFirstName(e.target.value)
        }
      />
      <Input
        placeholder="Last name"
        value={lastName}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(e.target.value)
        }
      />
      <Input
        placeholder="Email"
        value={email}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Input
        placeholder="Phone number"
        value={phoneNumber}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value)
        }
      />
      {initialIsDiff && (
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      )}
    </form>
  );
}
