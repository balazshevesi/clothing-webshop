import { create } from "zustand";

export const useShoppingCart = create((set) => ({
  items: [],

  addItem: (item: any) =>
    set((state: any) => {
      const itemAlredyExists = state.items.includes(item);
      if (itemAlredyExists) {
        const updatedItems = state.items.map((stateItem: any) => {
          if (stateItem.id === item.id) stateItem.count++;
          return stateItem;
        });
        return { items: updatedItems };
      }
      item.count = 1;
      return { items: [...state.items, item] };
    }),

  removeItem: (item: any) =>
    set((state: any) => {
      const newItems = state.items.filter(
        (stateItem: any) => stateItem.id !== item.id,
      );
      return { items: newItems };
    }),
}));
