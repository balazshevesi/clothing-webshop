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

import SelectArticlesModal from "./SelectArticlesModal";
import { GenericInputSchema } from "@/inputValidation/schema";
import { safeParse } from "valibot";

export default function PlannedSaleForm({
  saleData: saleData,
}: {
  saleData?: any;
}) {
  const router = useRouter();

  const [name, setName] = useState(saleData ? saleData.name : "");
  const [nameValidationMsg, setNameValidationMsg] = useState("");

  const [announcementTitle, setAnnouncementTitle] = useState(
    saleData ? saleData.announcementTitle : "",
  );
  const [announcementTitleValidationMsg, setAnnouncementTitleValidationMsg] =
    useState("");

  const [startDate, setStartDate] = useState<Date>(
    saleData
      ? new Date(
          new Date(saleData.startTime).setHours(
            new Date(saleData.startTime).getHours() + 1,
          ),
        )
      : new Date(),
  );

  const [endDate, setEndDate] = useState<Date>(
    saleData
      ? new Date(
          new Date(saleData.endTime).setHours(
            new Date(saleData.endTime).getHours() + 2,
          ),
        )
      : new Date(),
  );

  const [includedArticles, setIncludedArticles] = useState(
    saleData
      ? saleData.articlePlannedSalesRelations.map(
          (plannedSaleRelation: any) => ({
            ...plannedSaleRelation.articles,
            price: plannedSaleRelation.newPrice,
          }),
        )
      : [],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleDelete = async () => {
    const isSure = confirm(`Are you sure you want to delete ${saleData.name}?`);
    if (!isSure) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/planned-sale/${saleData.id}`,
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
    router.push("/admin/planned-sales");
  };

  const handlePlannedSale = async (e: any) => {
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

    const body = {
      startTime: startDate,
      endTime: endDate,
      name: name,
      announcementTitle: announcementTitle,
      includedArticleIds: includedArticles.map((articleObj: any) => {
        const frozenArticle: any = {};
        frozenArticle.articleId = articleObj.id;
        frozenArticle.newPrice = articleObj.price;
        return frozenArticle;
      }),
    } as const;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/planned-sale${
          saleData ? `/${saleData.id}` : ""
        }`,
        {
          method: saleData ? "put" : "post",
          body: JSON.stringify(body),
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

    if (!saleData) {
      setName("");
      // setImage("");
      // setDescription("");
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className=" max-w-xl">
      <Title2>
        {saleData ? `Edit ${saleData.name} ` : "Add new planned sale"}
      </Title2>
      <form onSubmit={handlePlannedSale} className="space-y-4">
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
          value={announcementTitle}
          onInput={(e: any) => setAnnouncementTitle(e.target.value)}
          warningText={announcementTitleValidationMsg}
          className="w-full"
          type="name"
          id="announcementTitle"
          placeholder="Announcement title"
        />
        <div className="flex w-full gap-2">
          <Input
            value={startDate.toISOString().split("T")[0]}
            onInput={(e: any) =>
              setStartDate((ps) => {
                const inputDate = new Date(e.target.value);
                const newStartDate = new Date(ps.getTime());
                newStartDate.setFullYear(
                  inputDate.getFullYear(),
                  inputDate.getMonth(),
                  inputDate.getDate(),
                );
                return newStartDate;
              })
            }
            // warningText={nameValidationMsg}
            className="w-full"
            type="date"
            id="startDate"
            placeholder="Start date"
          />
          <Input
            value={`${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}`}
            onInput={(e: any) => {
              const [hours, minutes] = e.target.value.split(":");
              setStartDate(new Date(startDate.setHours(+hours, +minutes)));
            }}
            // warningText={nameValidationMsg}
            className="w-full"
            type="time"
            id="startTime"
            placeholder="Start time"
          />
        </div>
        <div className="flex w-full gap-2">
          <Input
            value={endDate.toISOString().split("T")[0]}
            onInput={(e: any) =>
              setEndDate((ps) => {
                const inputDate = new Date(e.target.value);
                const newStartDate = new Date(ps.getTime());
                newStartDate.setFullYear(
                  inputDate.getFullYear(),
                  inputDate.getMonth(),
                  inputDate.getDate(),
                );
                return newStartDate;
              })
            }
            // warningText={nameValidationMsg}
            className="w-full"
            type="date"
            id="endDate"
            placeholder="End date"
          />
          <Input
            value={`${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`}
            onInput={(e: any) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const newEndDate = endDate.setHours(+hours, +minutes);
              setEndDate(new Date(newEndDate));
            }}
            // warningText={nameValidationMsg}
            className="w-full"
            type="time"
            id="endTime"
            placeholder="End time"
          />
        </div>
        <SelectArticlesModal
          multiple
          text="Chose articles to be included"
          selectedArticlesProp={includedArticles}
          setSelectedArticlesProp={setIncludedArticles}
        />
        <div className=" flex gap-4">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {saleData ? "Edit" : "Add"}
          </Button>
          {!!saleData && (
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
            {saleData ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
