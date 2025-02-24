'use client'
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { products } from "@wix/stores";
import ProductCard from "@/components/ProductCard";

const profileLinks = [
  {
    name: 'profile',
    action: 'profile'
  },
  {
    name: 'wishlist',
    action: 'wishlist'
  },
  {
    name: 'orders',
    action: 'ordersHistory'
  },
  {
    name: 'log out',
    action: 'logout'
  }
]

const Profile = () => {
  const [action, setAction] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<products.Product[]>([]);
  const wixClient = useWixClient();
  const router = useRouter();
  const memoizedProducts = useMemo(() => products, [products]);

  const getProducts = async (limit: number) => {
    const productQuery = wixClient.products.queryProducts().limit(limit);
    const res = await productQuery.find();
    setProducts(res.items);
  };


  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    setIsLoading(false);
    window.location.href = '/login';
  };

  const handleClick = (action: string) => {
    if (action === 'logout') {
      handleLogout();
    } else {
      setAction(action);
    }
  }

  useEffect(() => {
    if (action === 'wishlist') {
      getProducts(4);
    }
  }, [action])
  return (
    <div className='container grid grid-cols-4 gap-4'>
      <div className="col-span-4 md:col-span-1">
        <div className="flex flex-row md:flex-col gap-2 sm:gap-4 items-center md:items-start bg-gray-100 rounded-lg p-2 sm:p-4">
          {profileLinks.map((link, i) => (
            <button key={i} onClick={() => handleClick(link.action)} disabled={isLoading} className={`capitalize hover:bg-lama/10 transition w-full rounded-md text-start px-2 pt-1 text-sm sm:text-xl sm:px-4 sm:py-2 ${action === link.action ? "bg-lama/20 shadow-inner" : "bg-gray-50 shadow"}`}>{link.name}</button>
          ))}
        </div>
      </div>
      {action === 'profile' && <div className="col-span-4 md:col-span-3">
        <h1 className="text-2xl md:text-4xl mb-4">Profile</h1>
        <div className="bg-gray-100 rounded-lg p-4 flex gap-4 items-center mb-4">
          <div className="pic rounded-full bg-blue-700 p-8 md:p-11 w-fit relative">
            <span className="text-2xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">M</span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Mahmoud Abu attiya</h2>
            <Link href={'/'} className="text-sm text-gray-700 underline">Login With Another Account?</Link>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
          <h3 className="text-4xl">your data is here.</h3>
        </div>
      </div>}
      {action === 'wishlist' &&  <div className="col-span-4 md:col-span-3">
        <h1 className="text-2xl md:text-4xl mb-4">Wishlist</h1>
        <div className="bg-gray-100 rounded-lg p-4 items-center mb-4 flex gap-4 flex-wrap justify-around">
          {memoizedProducts.map((product: products.Product) => <ProductCard product={product} key={product._id} />)}
        </div>
      </div>}
      {action === 'ordersHistory' &&  <div className="col-span-4 md:col-span-3">
        <h1 className="text-2xl md:text-4xl mb-4">Orders</h1>
        <div className="bg-gray-100 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
          <h3 className="text-4xl">your data is here.</h3>
        </div>
      </div>}
    </div>
  )
}

export default Profile