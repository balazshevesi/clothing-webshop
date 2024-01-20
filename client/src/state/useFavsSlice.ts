import { create } from "zustand";

interface useFavsSlice {
  favArticles: any[];
  setFav: Function;
  removeFav: Function;
  fetchAndSetFavs: Function;
  toggleFav: Function;
}

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
      )
        return {
          favArticles: state.favArticles.filter(
            (articleState: any) => +article.id !== +articleState.id,
          ),
        };

      return { favArticles: [...state.favArticles, article] };
    });
  },

  fetchAndSetFavs: () => {},
}));
