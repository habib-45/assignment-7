import Link from "next/link";

interface catagoriDataType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string
}

const Navber = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const categoriesData: catagoriDataType[] = await res.json();

  return (
    <div className="flex gap-5 mt-5 ml-7 mb-4">
      {categoriesData.map((ca) => (
        <Link key={ca.id} href={`/${ca.slug}`}>
          {ca.icon}{ca.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default Navber;