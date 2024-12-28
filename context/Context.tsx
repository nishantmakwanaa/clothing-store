import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  product: any;
  color: string;
  size: string;
  image: any;
}

interface Order {
  id: number;
  product: any;
  color: string;
  size: string;
  image: any;
  date: string;
  status: string;
}

interface CartContextType {
  cartItems: CartItem[];
  previousOrders: Order[];
  addToCart: (product: any, color: string, size: string) => void;
  removeFromCart: (cartItemId: number) => void;
  addOrder: (order: Order) => void;
  removeOrder: (orderId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);

  const addToCart = (product: any, color: string, size: string) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: Math.random(),
        product,
        color,
        size,
        image: product.image,
      },
    ]);
  };

  const removeFromCart = (cartItemId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== cartItemId));
  };

  const addOrder = (order: Order) => {
    setPreviousOrders((prevOrders) => [...prevOrders, order]);
  };

  const removeOrder = (orderId: number) => {
    setPreviousOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <CartContext.Provider value={{ cartItems, previousOrders, addToCart, removeFromCart, addOrder, removeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart Must Be Used Within A CartProvider');
  }
  return context;
};