import Link from "next/link";

interface Product {
  id: number;
  nameBn: string;
  category: string;
  today: number;
  unit: string;
  changePercentage?: number;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
  }

  const products: Product[] = await res.json();
  const filteredProducts = products.filter((product) => product.category === slug);

  return (
    <main className="min-h-screen bg-[#f3f6f3] p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* ক্যাটাগরি হেডার */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl">🍚</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">চাল</h1>
            <p className="text-sm text-gray-500">প্রতি সপ্তাহের বাজারদরের গড় ও পরিবর্তন</p>
          </div>
        </div>

        {/* ফিল্টার বার */}
        <div className="flex justify-end items-center rounded-2xl bg-white px-6 py-3 shadow-sm">
          <p className="text-sm font-medium text-gray-600">
            সাজান
          </p>
          <button className="bg-amber-50 p-3 rounded-2xl flex items-center">ডিফল্ট <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-360 280-560h400L480-360Z"/></svg></span></button>
        </div>
        <p>মোট {filteredProducts.length.toLocaleString("bn-BD")} টি পণ্য পাওয়া গেছে</p>

        {/* প্রোডাক্ট গ্রিড - ক্লিক করলে ডিটেইলস পেজে যাবে */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block transition transform hover:-translate-y-1"
              >
                <div className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm hover:shadow-md cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xl">🍚</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{product.nameBn}</h2>
                      <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400">আজকের দাম</p>
                      <p className="text-xl font-extrabold text-gray-900">
                        {product.today.toLocaleString("bn-BD")} <span className="text-sm font-normal">টাকা</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                      <span>▲</span>
                      <span>২.৮%</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        )}
      </div>
    </main>
  );
}