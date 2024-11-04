'use client';

import { OrderItemRequest } from '@/interfaces/order';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartProviderProps {
}

const CartContext = createContext<{
  cart: OrderItemRequest[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  addItem: (item: OrderItemRequest) => void;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<OrderItemRequest[]>([]);

  const addItem = (item: OrderItemRequest) => {
    const existingItem = cart.find((i) => i.menu_id === item.menu_id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.menu_id === item.menu_id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      setCart([...cart, item]);
    }
  }

  // debug
  useEffect(() => {
    console.log(cart);
  })
  
  return <CartContext.Provider value={{ cart, setCart, addItem }}>{children}</CartContext.Provider>;
}
