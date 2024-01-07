"use client";

import { useForm } from "react-hook-form";

import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const handleAddNewBrand = async (formData: any) => {
    reset();
  };
  const { register, handleSubmit, reset } = useForm();
  return (
    <div>
      <Title2>Add new aricle</Title2>
      <form onSubmit={handleSubmit(handleAddNewBrand)} className="space-y-6  ">
        <Input
          warningText={""}
          className="w-full"
          type="name"
          id="name"
          placeholder="Name"
          {...register("name")}
        />
        <Input
          warningText={""}
          className="w-full"
          type="text"
          id="image"
          placeholder="Image Path"
          {...register("image")}
        />
        <Textarea
          warningText={""}
          className="w-full"
          id="description"
          placeholder="Description"
          {...register("description")}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}
