import Image from "next/image";
import Link from "next/link";
import Navber from "./Navber";
import AuthLinks from "./AuthLinks ";


interface CategoryDataType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  categoryNameBn: string;
}

const Header = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  let navs: CategoryDataType[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      navs = await res.json();
    }

  } catch (error) {
    console.error("Category fetch failed:", error);
  }

  return (
  <header className="bg-white text-black">
    <div className="container mx-auto"> <div className="mt-5 flex items-center justify-between"> <div className="flex items-center gap-2"> <Link href="/"> <Image
    className="h-13 w-13 rounded-2xl bg-emerald-600 p-3"
    height={50}
    width={50}
    src="/logo-icon.png"
    alt="বাজার দর"
  /> </Link>
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-red-500">
        বাজার দর
      </h2>
      <p>{date}</p>
    </div>
  </div>

    <AuthLinks></AuthLinks>
  </div>

    <Navber navs={navs} />
  </div>
  </header>

  );
};

export default Header;
