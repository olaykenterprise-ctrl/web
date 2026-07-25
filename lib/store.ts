import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './db';

interface CartItem extends Product {
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: Product[];
  
  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((item) => item.id === product.id);
        if (exists) {
          return {
            wishlist: state.wishlist.filter((item) => item.id !== product.id),
          };
        }
        return { wishlist: [...state.wishlist, product] };
      }),
    }),
    {
      name: 'olayk-shop-storage',
    }
  )
);
