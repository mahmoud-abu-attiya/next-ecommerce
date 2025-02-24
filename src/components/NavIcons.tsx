"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import Link from "next/link";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
    const cartModal = document.querySelector(".car-modal");
    cartModal?.addEventListener('mouseleave', () => {
      setIsCartOpen(false);
    })
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Link href={isLoggedIn ? "/profile" : "/login"}>
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </Link>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      <div className={isCartOpen ? "contents" : "hidden"}><CartModal /></div>
    </div>
  );
};

export default NavIcons;
