import Image from "next/image";

const Reviews = async ({ productId }: { productId: string }) => {
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'Public-Key': process.env.NEXT_PUBLIC_FERA_ID}
  };
  const url = `https://api.fera.ai/v3/public/reviews/`;
  const reviewRes = await fetch(url, options);
  const res = await reviewRes.json();
  const reviews = res.data.filter((review: any) => review.external_product_id === productId);


  return reviews.map((review: any) => (
    <div className="flex flex-col gap-4" key={review.id}>
      {/* USER */}
      <div className="flex items-center gap-4 font-medium">
        <Image
          src={review.customer.avatar_url}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{review.customer.display_name}</span>
      </div>
      {/* STARS */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => ( // ( _ ) is a throwaway variable => it's dosn't matter what the variable name is
          <Image src="/star.png" className={index > review.rating ? 'sepia' : 'opacity-100'} alt="" key={index} width={20} height={20} />
        ))}
      </div>
      {/* DESC */}
      {review.heading && <p>{review.heading}</p>}
      {review.body && <p className="break-words">{review.body}</p>}
      <div className="">
        {review.media.map((media: any) => (
          <Image
            src={media.url}
            key={media.id}
            alt=""
            width={100}
            height={50}
            className="object-cover"
          />
        ))}
      </div>
    </div>
  ));
};

export default Reviews;
