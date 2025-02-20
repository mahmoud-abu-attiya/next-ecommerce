'use client';

import Link from "next/link"
import Image from 'next/image'
import DOMPurify from "isomorphic-dompurify";

const ProductCard = (product: any) => {
   const item = product.product;
   const discountPercentage = item.priceData?.price !== item.priceData?.discountedPrice ? Math.round(
      ((item.priceData?.price! - item.priceData?.discountedPrice!) /
         item.priceData?.price!) *
      100
   ) : null;
   return (
      <Link
         href={"/" + item.slug}
         className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
         key={item._id}
      >
         <div className="relative w-full h-80 overflow-hidden rounded-md">
            {discountPercentage && (<div className="absolute w-full z-20 top-[35px] left-[35px] translate-x-[-50%] translate-y-[-50%] -rotate-45 shadow-md">
               <span className="bg-red-600 shine-effect text-white text-sm px-2 py-1 w-full block text-center rounded-tl-md rounded-br-md">
                  Save {discountPercentage}%
               </span>
            </div>)}
            <Image
               src={item.media?.mainMedia?.image?.url || "/product.png"}
               alt=""
               fill
               sizes="25vw"
               className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {item.media?.items && (
               <Image
                  src={item.media?.items[1]?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
               />
            )}
         </div>
         <div className="flex justify-between">
            <span className="font-medium">{item.name}</span>
            {!discountPercentage ?
               (<span className="font-semibold">${item.priceData?.price}</span>) : (
                  <div className="flex items-center gap-4">
                     <h3 className="text-sm text-gray-500 line-through">
                        ${item.priceData?.price}
                     </h3>
                     <h2 className="font-medium text-md">
                        ${item.priceData?.discountedPrice}
                     </h2>
                  </div>
               )}
         </div>
         {item.additionalInfoSections && (
            <div
               className="text-sm text-gray-500"
               dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                     item.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                     )?.description || ""
                  ),
               }}
            ></div>
         )}
         <button className="rounded-2xl ring-1 ring-lama text-lama transition py-2 w-full px-4 text-xs hover:bg-lama hover:text-white">
            View
         </button>
      </Link>
   )
}

export default ProductCard