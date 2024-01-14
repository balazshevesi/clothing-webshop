"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";

import getCookie from "@/utils/getCookie";

import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { TrashIcon } from "@heroicons/react/24/solid";

import { GenericInputSchema } from "@/inputValidation/schema";
import { safeParse } from "valibot";

export default function BrandForm({ brandData }: { brandData?: any }) {
  const router = useRouter();

  const [name, setName] = useState(brandData ? brandData.name : "");
  const [nameValidationMsg, setNameValidationMsg] = useState("");

  const [image, setImage] = useState(brandData ? brandData.image : "");
  const [imageValidationMsg, setImageValidationMsg] = useState("");

  const [description, setDescription] = useState(
    brandData ? brandData.description : "",
  );
  const [descriptionValidationMsg, setDescriptionValidationMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleDelete = async () => {
    const isSure = confirm(
      `Are you sure you want to delete ${brandData.name}?`,
    );
    if (!isSure) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/brand/${brandData.id}`,
      {
        method: "delete",
        headers: {
          authorization: getCookie("userAuth")!,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setServerError(true);
      return;
    }
    router.push("/admin/brands");
  };

  const handleBrand = async (e: any) => {
    e.preventDefault();

    let validInput = true;
    const nameValStatus = safeParse(GenericInputSchema, name);
    if (!nameValStatus.success) {
      setNameValidationMsg(nameValStatus.issues[0].message);
      validInput = false;
    } else setNameValidationMsg("");

    const imageValStatus = safeParse(GenericInputSchema, image);
    if (!imageValStatus.success) {
      setImageValidationMsg(imageValStatus.issues[0].message);
      validInput = false;
    } else setImageValidationMsg("");

    const descriptionValStatus = safeParse(GenericInputSchema, description);
    if (!descriptionValStatus.success) {
      setDescriptionValidationMsg(descriptionValStatus.issues[0].message);
      validInput = false;
    } else setDescriptionValidationMsg("");
    if (!validInput) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/brand${
          brandData ? `/${brandData.id}` : ""
        }`,
        {
          method: brandData ? "put" : "post",
          body: JSON.stringify({ name, image, description }),
          headers: {
            authorization: getCookie("userAuth")!,
          },
        },
      );
      if (!response.ok) {
        setServerError(true);
        return;
      } else setServerError(false);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    if (!brandData) {
      setName("");
      setImage("");
      setDescription("");
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };
  return (
    <div className=" max-w-xl">
      <Title2>{brandData ? `Edit ${brandData.name} ` : "Add new brand"}</Title2>
      <form onSubmit={handleBrand} className="space-y-4  ">
        <Input
          value={name}
          onInput={(e: any) => setName(e.target.value)}
          warningText={nameValidationMsg}
          className="w-full"
          type="name"
          id="name"
          placeholder="Name"
        />
        <Input
          value={image}
          onInput={(e: any) => setImage(e.target.value)}
          warningText={imageValidationMsg}
          className="w-full"
          type="text"
          id="image"
          placeholder="Image Path"
        />
        {!!image && (
          <img className=" w-full overflow-hidden rounded" src={image} alt="" />
        )}
        <Textarea
          value={description}
          onInput={(e: any) => setDescription(e.target.value)}
          warningText={descriptionValidationMsg}
          className="w-full"
          id="description"
          placeholder="Description"
        />
        <div className=" flex gap-4">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {brandData ? "Edit" : "Add"}
          </Button>
          {!!brandData && (
            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={handleDelete}
            >
              <TrashIcon className="size-5" />
            </Button>
          )}
        </div>
        {!!serverError && (
          <div className=" animate-fade-up text-red-400 duration-200">
            Server error, try again later
          </div>
        )}
        {!!success && (
          <div className=" animate-fade-up text-green-400 duration-200">
            {brandData ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
