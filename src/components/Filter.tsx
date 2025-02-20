"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const Filter = (cats: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [max, setMax] = useState<string | number>(0);
  const [min, setMin] = useState<string | number>(9999);
  const [cat, setCat] = useState<string>('all-products');

  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`)
  };

  useEffect(() => {
    setMin(params.get("min") || 0);
    setMax(params.get("max") || 99999);
    setCat(params.get("cat") || 'all-products');
  }, [params]);

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          defaultValue={min}
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={(e) => handleFilterChange(e)}
        />
        <input
          type="text"
          name="max"
          defaultValue={max}
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={(e) => handleFilterChange(e)}
        />
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={(e) => handleFilterChange(e)}
        >
          {cats.cats.map((item: any) => (<option key={item.slug} selected={cat === item.slug} value={item.slug}>{item.name}</option>))}
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={(e) => handleFilterChange(e)}
        >
          <option selected>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
