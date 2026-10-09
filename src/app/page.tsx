import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
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
    pct: string
  }
}

export default async function Home() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const section: Product[] = await res.json();

  return (
    <div>
      <Marquee />

      <Banner />

      <div className="max-w-7xl mx-auto mt-6 mb-12">
        <div className="p-2 container mx-auto">
          <PriceUp></PriceUp>
          <div className="my-7 flex flex-col gap-5">
              <h2 className="text-2xl font-bold">সব পণ্য</h2>
              <p>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            </div>
          <div className="grid grid-cols-3 gap-5 ">   
            {section.map((product) => (
              <Card
                key={product.id}
                main={product}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}