interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // এপিআই থেকে ডেটা ফেচ করা
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
  }

  const products: Product[] = await res.json();

  // ইউআরএল থেকে পাওয়া id বা slug অনুযায়ী নির্দিষ্ট পণ্যটি খুঁজে বের করা
  const product = products.find(
    (p) => p.id.toString() === id || p.slug === id
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f3f6f3] p-8 flex items-center justify-center">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">পণ্যটি খুঁজে পাওয়া যায়নি।</p>
        </div>
      </main>
    );
  }

  // সর্বনিম্ন, সর্বাধিক ও গড় দাম হিসাব করা
  const allMinPrices = product.markets.map((m) => m.min);
  const allMaxPrices = product.markets.map((m) => m.max);

  const lowestMin = Math.min(...allMinPrices);
  const highestMax = Math.max(...allMaxPrices);

  // বাজারভিত্তিক টেবিলে প্রতিটি বাজারের গড় দাম বের করার লজিক
  const marketTableData = product.markets.map((m) => {
    const avg = Math.round((m.min + m.max) / 2);
    return {
      ...m,
      avg,
    };
  });

  const overallAvg = Math.round(
    marketTableData.reduce((acc, curr) => acc + curr.avg, 0) /
      marketTableData.length
  );

  // দাম বাড়ার বা কমার হিসাব
  const priceDiff = product.today - product.yesterday;
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f3f6f3] p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* প্রোডাক্ট ডিটেইলস হেডার */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-white p-6 shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <span className="text-3xl">{product.image || "🍚"}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"} • {product.categoryNameBn}
              </p>
              <p className="mt-2 text-xs text-gray-600">
                গতকালকের তুলনায় আজ দাম{" "}
                <span
                  className={`font-semibold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                      ? "text-emerald-600"
                      : "text-gray-600"
                  }`}
                >
                  {isUp
                    ? `বেড়েছে - ${priceDiff} টাকা`
                    : isDown
                    ? `কমেছে - ${Math.abs(priceDiff)} টাকা`
                    : "পরিবর্তন হয়নি"}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-100 p-4 text-center sm:text-right min-w-[140px]">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-extrabold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : "লিটার"}
            </p>
            <div
              className={`mt-1 inline-flex items-center text-xs font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                  ? "text-emerald-600"
                  : "text-gray-600"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </div>
          </div>
        </div>

        {/* সামারি এবং টেবিল */}
        <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="mb-4 text-base font-bold text-gray-800">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                <p className="text-xl font-bold text-emerald-600">
                  {lowestMin.toLocaleString("bn-BD")} টাকা
                </p>
                <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
                <p className="text-xl font-bold text-red-500">
                  {highestMax.toLocaleString("bn-BD")} টাকা
                </p>
                <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-xs text-gray-500">গড় দাম</p>
                <p className="text-xl font-bold text-emerald-600">
                  {overallAvg.toLocaleString("bn-BD")} টাকা
                </p>
                <p className="text-xs text-gray-400 mt-1">প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}-এর হিসাবে</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-base font-bold text-gray-800">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600">
                  <tr>
                    <th className="px-4 py-3">বাজার</th>
                    <th className="px-4 py-3">বিভাগ</th>
                    <th className="px-4 py-3">সর্বনিম্ন</th>
                    <th className="px-4 py-3">সর্বাধিক</th>
                    <th className="px-4 py-3 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {marketTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {row.market}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {row.division}
                      </td>
                      <td className="px-4 py-3">
                        {row.min.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="px-4 py-3">
                        {row.max.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        {row.avg.toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}