import { create } from "zustand";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  favoriteItems: string[];
  fetchCartItems: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, newQuantity: number) => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  fetchUserData: () => Promise<void>;
  clearCart: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  favoriteItems: [],

  //load cart item from db when user logs in
  fetchCartItems: async () => {
    const response = await fetch("/api/cart");
    if (response.ok) {
      const data = await response.json();
      const items = data.cart?.items || [];
      const normalized = items.map((it: any) => ({
        productId:
          // populated product object
          it.productId?._id?.toString?.() ||
          // raw ObjectId
          it.productId?.toString?.() ||
          // fallback
          String(it.productId),
        quantity: it.quantity || 0,
      }));
      set({ cartItems: normalized });
    } else {
      console.error("Failed to fetch cart items");
    }
  },

  //add item instantly to UI then sync with db
  addToCart: async (productId: string) => {
    const currentCartItems = get().cartItems;

    // UI check if product already exists in cart
    const existingItemIndex = currentCartItems.findIndex(
      (item: CartItem) => item.productId === productId,
    );

    let updatedCartItems;

    if (existingItemIndex !== -1) {
      updatedCartItems = [...currentCartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems = [...currentCartItems, { productId, quantity: 1 }];
    }

    //update frontend state instantly so buttons change immmediately
    set({ cartItems: updatedCartItems });

    //sync with backend
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        const items = data.cart?.items || [];
        const normalized = items.map((it: any) => ({
          productId:
            it.productId?._id?.toString?.() ||
            it.productId?.toString?.() ||
            String(it.productId),
          quantity: it.quantity || 0,
        }));
        // reconcile frontend state with authoritative backend state if available
        set({ cartItems: normalized.length ? normalized : updatedCartItems });
      } catch (err) {
        // if parsing fails, keep optimistic state
        console.error("Failed to parse cart POST response", err);
      }
    } else {
      console.error("Failed to sync addToCart with backend");
    }
  },

  //quantity update and removal of items can be added here in the future
  updateQuantity: async (productId: string, newQuantity: number) => {
    const currentCartItems = get().cartItems;
    let updatedItems;
    if (newQuantity <= 0) {
      // Remove item if quantity is zero or less
      updatedItems = currentCartItems.filter(
        (item) => item.productId !== productId,
      );
    } else {
      //update quantity if product exists
      updatedItems = currentCartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    }
    set({ cartItems: updatedItems });

    //sync with backend
    const response = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity: newQuantity }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        const items = data.cart?.items || [];
        const normalized = items.map((it: any) => ({
          productId:
            it.productId?._id?.toString?.() ||
            it.productId?.toString?.() ||
            String(it.productId),
          quantity: it.quantity || 0,
        }));
        set({ cartItems: normalized.length ? normalized : updatedItems });
      } catch (err) {
        console.error("Failed to parse cart PUT response", err);
      }
    } else {
      console.error("Failed to sync updateQuantity with backend");
    }
  },

  fetchUserData: async () => {
    //fetch favorite products from the backend
    const response = await fetch("/api/favorite");
    if (response.ok) {
      const data = await response.json();
      set({
        favoriteItems: (data.favoriteProducts || []).map(String),
      });
    } else {
      console.error("Failed to fetch user data");
    }
  },

  //toggle favorite product in the frontend state and sync with backend
  toggleFavorite: async (productId: string) => {
    const pid = String(productId);
    const currentFavorites = get().favoriteItems;
    const isFavorite = currentFavorites.includes(pid);
    let updatedFavorites;

    //instant UI swap
    if (isFavorite) {
      updatedFavorites = currentFavorites.filter((id) => id !== pid);
    } else {
      updatedFavorites = [...currentFavorites, pid];
    }
    set({ favoriteItems: updatedFavorites });

    //sync with backend
    const response = await fetch("/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: pid }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        set({ favoriteItems: (data.favoriteProducts || []).map(String) });
      } catch (err) {
        console.error("Failed to parse favorite toggle response", err);
      }
    } else {
      console.error("Failed to sync toggleFavorite with backend");
      set({ favoriteItems: currentFavorites });
    }
  },

  //clear cart
  clearCart: async () => {
    set({ cartItems: [] });
  },
}));
