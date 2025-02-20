import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
   const wixClient = await wixClientServer();

   const cats = await wixClient.collections.queryCollections().find();

   return (
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {cats.items.map((item) => (
               <Link
                  href={`/list?cat=${item.slug}`}
                  className="flex-shrink-0 w-full shadow-md aspect-video relative rounded-lg group overflow-hidden"
                  key={item._id}
               >
                  <div className="absolute w-full h-full object-cover object-center">
                     <Image
                        src={item.media?.mainMedia?.image?.url || "cat.png"}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover group-hover:scale-110 transition duration-500"
                     />
                  </div>
                  <div className="flex items-end w-full h-full bg-gradient-to-t from-black to-transparent text-white z-10 relative">
                  <h1 className="text-xl tracking-wide p-4 font-bold">
                     {item.name}
                  </h1>
                  </div>
               </Link>
            ))}
         </div>
   );
};

export default CategoryList;