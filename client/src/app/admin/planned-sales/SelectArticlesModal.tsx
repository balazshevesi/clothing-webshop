"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface SelectArticles {
  selectedArticlesProp: any[];
  setSelectedArticlesProp: Function;
  multiple?: boolean;
  text: string;
  availableArticles?: any[];
}

export default function SelectArticlesModal({
  selectedArticlesProp,
  setSelectedArticlesProp,
  multiple = false,
  text,
  availableArticles,
}: SelectArticles) {
  const [modelIsOpen, setModelIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [articles, setArticles] = useState<any[]>(availableArticles || []);

  const [selectedArticles, setSelectedArticles] = useState<any>(
    selectedArticlesProp || [],
  );
  useEffect(() => {
    setSelectedArticlesProp(selectedArticles);
  }, [selectedArticles]);

  const getArticles = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles`,
    );
    const data = await response.json();
    setArticles(data.content);
  };
  useEffect(() => {
    availableArticles || getArticles();
  }, []);

  useEffect(() => {
    //syncs availableArticles to articles (if availableArticles is provided)
    availableArticles && setArticles(() => availableArticles);
    //resets selectedArticle(s) incase it is no longer present in availableArticles (if availableArticles is provided)
    if (availableArticles) {
      try {
        availableArticles.filter(
          (article) => +article.id === +selectedArticles[0].id,
        ).length === 0 &&
          setSelectedArticles(
            availableArticles.length > 0 ? [availableArticles[0]] : [],
          );
      } catch {}
      //incase there is only one aricle present in availableArticles, select it
      if (availableArticles.length === 1)
        setSelectedArticles([availableArticles[0]]);
    }
  }, [availableArticles]);

  return (
    <>
      <Button
        onClick={() => setModelIsOpen(true)}
        type="button"
        variant="outline"
      >
        {text}
      </Button>
      <div className=" flex flex-col flex-wrap gap-2">
        {!!selectedArticles &&
          selectedArticles.map((article: any) => {
            return (
              <div className="flex items-center gap-2 text-sm font-medium text-white/50">
                <img
                  className=" size-6 rounded"
                  src={article.articleImages[0].imagePath}
                />
                <Input
                  placeholder="new price"
                  value={article.price}
                  className="w-20"
                  type="text"
                  onInput={(e: any) =>
                    setSelectedArticles((ps: any) =>
                      ps.map((articleState: any) =>
                        articleState.id === article.id
                          ? { ...article, price: e.target.value }
                          : articleState,
                      ),
                    )
                  }
                />
                <div>{article.name}</div>
              </div>
            );
          })}
      </div>
      <AlertDialog
        open={modelIsOpen}
        onOpenChange={() => setModelIsOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{text}</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid max-h-72 gap-4 overflow-auto">
                {articles.map((article: any) => (
                  <>
                    <div className="flex items-center gap-4 rounded-lg bg-slate-900 p-2">
                      {multiple ? (
                        <Checkbox
                          checked={
                            selectedArticles.filter(
                              (articleState: any) =>
                                articleState.id === article.id,
                            ).length > 0
                          }
                          onClick={(e: any) => {
                            if (e.target.dataset.state === "unchecked")
                              setSelectedArticles(() => [
                                ...selectedArticles,
                                article,
                              ]);
                            else {
                              setSelectedArticles(() =>
                                selectedArticles.filter(
                                  (articleState: any) =>
                                    articleState.id !== article.id,
                                ),
                              );
                            }
                          }}
                          className="mx-2"
                        />
                      ) : (
                        <Checkbox
                          checked={
                            selectedArticles.filter(
                              (articleState: any) =>
                                articleState.id === article.id,
                            ).length > 0
                          }
                          onClick={() => setSelectedArticles(() => [article])}
                          className="mx-2 rounded-full"
                        />
                      )}
                      <img
                        className="size-8 rounded"
                        src={article.articleImages[0].imagePath}
                        alt=""
                      />
                      <div>{article.name}</div>
                      <div>{article.price}</div>
                    </div>
                  </>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-6">
            <Button
              type="button"
              onClick={() => setModelIsOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setModelIsOpen(false)}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Okay
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
