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
    pct: number;
  };
}


export default async function Home() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("পণ্যের ডেটা লোড করা যায়নি");
  }

  const data = await res.json();
  const section: Product[] = Array.isArray(data)
    ? data
    : data.data ?? [];

 

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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