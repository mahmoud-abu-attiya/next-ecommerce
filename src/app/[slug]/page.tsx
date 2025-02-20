import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import Toast from "@/components/Toast";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  // new % old / old * 100
  const discountPercentage = product.priceData?.price !== product.priceData?.discountedPrice ? Math.round(
    ((product.priceData?.price! - product.priceData?.discountedPrice!) /
      product.priceData?.price!) *
    100
  ) : null;
  console.log(discountPercentage);



  return (
    <div className="container relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {!discountPercentage ? (
          <h2 className="font-medium text-2xl">${product.priceData?.price}</h2>
        ) : (
          <>
            <h4 className="shine-effect overflow-hidden text-sm uppercase w-fit text-white bg-red-600 font-bold px-3 py-1 rounded-full">
              Save {discountPercentage}%!
            </h4>
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                ${product.priceData?.price}
              </h3>
              <h2 className="font-medium text-2xl">
                ${product.priceData?.discountedPrice}
              </h2>
            </div>
          </>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product && (product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
            productName={product.name}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
            productName={product.name}
          />
        ))}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
