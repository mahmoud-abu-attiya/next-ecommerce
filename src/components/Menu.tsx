"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const { counter } = useCartStore()

  useEffect(() => {
    if(open) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [open]);

  return (
    <div className="">
      {open && <div className="absolute left-0 top-20 w-full h-[calc(100vh-80px)] bg-black/50 backdrop-blur-sm z-10" />}
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {/* {open && ( */}
        <div className={`absolute bg-black text-white right-0 top-20 w-[70vw] h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-20 transition ${!open ? "translate-x-full" : "translate-x-0"}`}>
          <Link href="/">Home</Link>
          <Link href="/list">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/cart">Cart({counter})</Link>
        </div>
      {/* )} */}
    </div>
  );
};

export default Menu;
