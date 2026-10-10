import { readFile } from "fs/promises";
import path from "path";

import Banner from "@/components/Banner";
import Card from "@/components/All-Card/Card";
import PriceUp from "@/components/All-Card/Price";

interface Product {
  id: number;
  nameBn: string;
  slug: string;
  today: number;
  unit: string;
  image: string;
  change: {
    pct: string;
  };
}

export default async function Home() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "alldata.json"
  );

  let section: Product[] = [];

  try {
    const jsonData = await readFile(filePath, "utf8");
    section = JSON.parse(jsonData);
  } catch (error) {
    console.error("Product data load failed:", error);
    throw new Error("পণ্যের ডেটা লোড করা যায়নি");
  }

  return (
    <div>
      <Banner />

      <div className="container mx-auto mt-6 mb-12 px-4">
        <PriceUp />

        <div className="my-7 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            সব পণ্য
          </h2>

          <p>
            মোট {section.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {section.map((product) => (
            <Card
              key={product.id}
              main={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
