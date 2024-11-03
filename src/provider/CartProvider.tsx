'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartProviderProps {
}

const CartContext = createContext<{
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
}
