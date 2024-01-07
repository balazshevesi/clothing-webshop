"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import getCookie from "@/utils/getCookie";

import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { GenericInputSchema } from "@/inputValidation/schema";
import { safeParse } from "valibot";

export default function BrandForm({ data }: { data?: any }) {
  const [name, setName] = useState(data.name || "");
  const [nameValidationMsg, setNameValidationMsg] = useState("");

  const [image, setImage] = useState(data.image || "");
  const [imageValidationMsg, setImageValidationMsg] = useState("");

  const [description, setDescription] = useState(data.description || "");
  const [descriptionValidationMsg, setDescriptionValidationMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const response = await fetch("http://localhost:3000/api/admin/brand", {
        method: "post",
        body: JSON.stringify({ name, image, description }),
        headers: {
          authorization: getCookie("authorization")!,
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    if (!data) {
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
    <div>
      <Title2> {data ? `Edit ${data.name} ` : "Add new brand"}</Title2>
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
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {data ? "Edit" : "Add"}
        </Button>
        {!!success && (
          <div className=" animate-fade-up text-green-400 duration-200">
            {data ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
