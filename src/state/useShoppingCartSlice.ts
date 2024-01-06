import { create } from "zustand";

interface useShoppingCart {
  items: any[];
  isOpen: Boolean;
  addItem: Function;
  removeItem: Function;
  updateCount: Function;
  increment: Function;
  decrement: Function;
  open: Function;
  close: Function;
}

export const useShoppingCartSlice = create<useShoppingCart>()((set) => ({
  items: [],
  isOpen: false,

  addItem: (item: any) => {
    return set((state: any) => {
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
    });
  },

  removeItem: (item: any) =>
    set((state: any) => {
      const newItems = state.items.filter(
        (stateItem: any) => stateItem.id !== item.id,
      );
      return { items: newItems };
    }),

  updateCount: (item: any, newCount: number) =>
    set((state: any) => {
      const updatedItems = state.items.map((stateItem: any) => {
        if (item.id === stateItem.id) stateItem.count = newCount;
        return stateItem;
      });
      const removeIfCountIsNull = updatedItems.filter(
        (stateItem: any) => stateItem.count > 0,
      );
      return { items: removeIfCountIsNull };
    }),

  increment: (item: any) =>
    set((state: any) => {
      const updatedCount = state.items.map((stateItem: any) => {
        if (stateItem.id === item.id) stateItem.count++;
        return stateItem;
      });
      return { items: updatedCount };
    }),
  decrement: (item: any) =>
    set((state: any) => {
      const updatedCount = state.items.map((stateItem: any) => {
        if (stateItem.id === item.id) {
          stateItem.count--;
        }
        return stateItem;
      });
      const removeIfCountIsNull = updatedCount.filter(
        (stateItem: any) => stateItem.count > 0,
      );

      return { items: removeIfCountIsNull };
    }),

  open: () =>
    set((state: any) => {
      return { isOpen: true };
    }),
  close: () =>
    set((state: any) => {
      return { isOpen: false };
    }),
}));
