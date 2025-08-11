import React, { createContext, useContext } from "react";

export type MenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggleMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context)
    throw new Error("useMenu must be used within MenuContext.Provider");
  return context;
}
