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

export default function CategoryForm({ categoryData }: { categoryData?: any }) {
  const router = useRouter();

  const [name, setName] = useState(categoryData ? categoryData.name : "");
  const [nameValidationMsg, setNameValidationMsg] = useState("");

  const [image, setImage] = useState(categoryData ? categoryData.image : "");
  const [imageValidationMsg, setImageValidationMsg] = useState("");

  const [description, setDescription] = useState(
    categoryData ? categoryData.description : "",
  );
  const [descriptionValidationMsg, setDescriptionValidationMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleDelete = async () => {
    const isSure = confirm(
      `Are you sure you want to delete ${categoryData.name}?`,
    );
    if (!isSure) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/category/${categoryData.id}`,
      {
        method: "delete",
        headers: {
          authorization: getCookie("authorization")!,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setServerError(true);
      return;
    }
    router.push("/admin/categories");
  };

  const handleCategory = async (e: any) => {
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
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/category${
          categoryData ? `/${categoryData.id}` : ""
        }`,
        {
          method: categoryData ? "put" : "post",
          body: JSON.stringify({ name, image, description }),
          headers: {
            authorization: getCookie("authorization")!,
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

    if (!categoryData) {
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
      <Title2>
        {categoryData ? `Edit ${categoryData.name} ` : "Add new category"}
      </Title2>
      <form onSubmit={handleCategory} className="space-y-4  ">
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
            {categoryData ? "Edit" : "Add"}
          </Button>
          {!!categoryData && (
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
            {categoryData ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
