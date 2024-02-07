"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import getCookie from "@/utils/getCookie";

import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { TrashIcon } from "@heroicons/react/24/solid";

import SelectArticlesModal from "./SelectArticlesModal";
import { GenericInputSchema } from "@/inputValidation/schema";
import { safeParse } from "valibot";

export default function ListingForm({
  listingContent,
}: {
  listingContent?: any;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(
    listingContent ? listingContent.title : "",
  );
  const [titleValidationMsg, setTitleValidationMsg] = useState("");

  const [image, setImage] = useState(
    listingContent ? listingContent.imagePath : "",
  );
  const [imageValidationMsg, setImageValidationMsg] = useState("");

  const [description, setDescription] = useState(
    listingContent ? listingContent.description : "",
  );
  const [descriptionValidationMsg, setDescriptionValidationMsg] = useState("");

  const [includedArticles, setIncludedArticles] = useState(
    listingContent
      ? listingContent.articleListingRelations.map(
          (relation: any) => relation.articles,
        )
      : [],
  );

  const [defaultArticle, setDefaultArticle] = useState<any>(
    listingContent ? [listingContent.articles] : [],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleDelete = async () => {
    const isSure = confirm(
      `Are you sure you want to delete ${listingContent.title}?`,
    );
    if (!isSure) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/listing/${listingContent.id}`,
      {
        method: "delete",
        headers: {
          userAuth: getCookie("userAuth")!,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setServerError(true);
      return;
    }
    router.push("/admin/listings");
  };

  const handleCategory = async (e: any) => {
    e.preventDefault();

    // let validInput = true;
    // const nameValStatus = safeParse(GenericInputSchema, name);
    // if (!nameValStatus.success) {
    //   setNameValidationMsg(nameValStatus.issues[0].message);
    //   validInput = false;
    // } else setNameValidationMsg("");

    // const imageValStatus = safeParse(GenericInputSchema, image);
    // if (!imageValStatus.success) {
    //   setImageValidationMsg(imageValStatus.issues[0].message);
    //   validInput = false;
    // } else setImageValidationMsg("");

    // const descriptionValStatus = safeParse(GenericInputSchema, description);
    // if (!descriptionValStatus.success) {
    //   setDescriptionValidationMsg(descriptionValStatus.issues[0].message);
    //   validInput = false;
    // } else setDescriptionValidationMsg("");
    // if (!validInput) return;

    setIsLoading(true);
    const formData = {
      title,
      includedArticles,
      defaultArticle: defaultArticle[0],
      image,
      description,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/listing${
          listingContent ? `/${listingContent.id}` : ""
        }`,
        {
          method: listingContent ? "put" : "post",
          body: JSON.stringify(formData),
          headers: {
            userAuth: getCookie("userAuth")!,
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

    // if (!categoryData) {
    //   setName("");
    //   setImage("");
    //   setDescription("");
    // }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className=" max-w-xl">
      <Title2>
        {listingContent ? `Edit ${listingContent.title} ` : "Add new listing"}
      </Title2>
      <form onSubmit={handleCategory} className="space-y-4  ">
        <Input
          value={title}
          onInput={(e: any) => setTitle(e.target.value)}
          warningText={titleValidationMsg}
          className="w-full"
          type="title"
          id="title"
          placeholder="Title"
        />
        <div className=" flex flex-col gap-4">
          <SelectArticlesModal
            multiple
            text="Chose articles to be included"
            selectedArticlesProp={includedArticles}
            setSelectedArticlesProp={setIncludedArticles}
          />
          <SelectArticlesModal
            text="Chose default article"
            availableArticles={includedArticles}
            selectedArticlesProp={defaultArticle}
            setSelectedArticlesProp={setDefaultArticle}
          />
        </div>
        <div className=" flex gap-2">
          <Input
            value={image}
            onInput={(e: any) => setImage(e.target.value)}
            warningText={imageValidationMsg}
            className="w-full"
            type="text"
            id="image"
            placeholder="Image Path"
          />
          <Button
            type="button"
            onClick={() =>
              setImage(
                defaultArticle.length > 0
                  ? defaultArticle[0].articleImages[0].imagePath
                  : "",
              )
            }
          >
            Match Default
          </Button>
        </div>
        {!!image && (
          <img className=" w-24 overflow-hidden rounded" src={image} alt="" />
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
            {listingContent ? "Edit" : "Add"}
          </Button>
          {!!listingContent && (
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
            {listingContent ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
