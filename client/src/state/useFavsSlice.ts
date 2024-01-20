import getCookie from "@/utils/getCookie";

import { create } from "zustand";

interface useFavsSlice {
  favArticles: any[];
  setFav: Function;
  removeFav: Function;
  fetchAndSetFavs: Function;
  toggleFav: Function;
}

const handleSync = async (item: any, action: "post" | "delete") => {
  const userInfoCookie = getCookie("userInfo");
  const guestUserIdCookie = getCookie("guestUserId");

  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${
      userInfoCookie ? "user" : "guest-user"
    }/${
      userInfoCookie ? JSON.parse(userInfoCookie).id : guestUserIdCookie
    }/favs`,
    {
      method: action,
      headers: {
        userAuth: getCookie("userAuth")!,
        guestUserAuth: getCookie("guestUserAuth")!,
      },
      body: JSON.stringify({
        articleId: item.id,
      }),
    },
  );
};

export const useFavsSlice = create<useFavsSlice>()((set) => ({
  favArticles: [],
  setFav: (article: any) => {
    set((state: any) => {
      if (
        state.favArticles.filter(
          (articleState: any) => +articleState.id === +article.id,
        ).length > 0
      ) {
        return { favArticles: state.favArticles };
      }
      const newArticles = state.favArticles.push(article);
      return { favArticles: newArticles };
    });
  },
  removeFav: (article: any) => {
    set((state: any) => ({
      favArticles: state.favArticles.filter(
        (articleState: any) => +article.id !== +articleState.id,
      ),
    }));
  },
  toggleFav: (article: any) => {
    set((state: any) => {
      if (
        state.favArticles.filter(
          (articleState: any) => +articleState.id === +article.id,
        ).length > 0
      ) {
        handleSync(article, "delete");
        return {
          favArticles: state.favArticles.filter(
            (articleState: any) => +article.id !== +articleState.id,
          ),
        };
      }
      handleSync(article, "post");
      return { favArticles: [...state.favArticles, article] };
    });
  },

  fetchAndSetFavs: async () => {
    const userInfoCookie = getCookie("userInfo");
    const guestUserIdCookie = getCookie("guestUserId");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${
        userInfoCookie ? "user" : "guest-user"
      }/${
        userInfoCookie ? JSON.parse(userInfoCookie).id : guestUserIdCookie
      }/favs`,
      {
        method: "get",
        headers: {
          userAuth: getCookie("userAuth")!,
          guestUserAuth: getCookie("guestUserAuth")!,
        },
      },
    );
    const data = await response.json();

    const stateFormat = data.content.map((favItem: any) => {
      const frozenArticle = { ...favItem };
      frozenArticle.id = frozenArticle.articleId;
      return frozenArticle;
    });

    set((state: any) => ({ favArticles: stateFormat }));
  },
}));
