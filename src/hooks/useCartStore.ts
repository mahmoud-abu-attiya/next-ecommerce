import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const notify = (content: string, state: string) => {
  if (state === 'add') {
    toast.success(content)
  } else if (state === 'remove') {
    toast.error(content)
  }
};

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number,
    productName: string | null | undefined,
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string, productName: string | null | undefined) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity, productName) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
    notify(`${quantity} ${productName} has been added to the cart.`, 'add');
  },
  removeItem: async (wixClient, itemId, productName) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
    notify(`${productName} has been removed from the cart.`, 'remove');
  },
}));
