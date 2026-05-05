import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem("ak-wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ak-wishlist", JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const clearWishlist = () => setItems([]);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, clearWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
