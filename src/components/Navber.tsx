"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryDataType {
id: string;
slug: string;
nameBn: string;
icon: string;
categoryNameBn: string;
}

const Navber = ({ navs }: { navs: CategoryDataType[] }) => {
const pathname = usePathname();

return ( <nav className="mt-5 mb-4 flex flex-wrap gap-3">
{navs.map((ca) => {
const isActive = pathname === `/id/${ca.slug}`;

    return (
      <Link
        key={ca.id}
        href={`/id/${ca.slug}`}
        className={`rounded-lg py-2 px-2 border-none ${
          isActive
            ? "bg-emerald-600 font-semibold text-white"
            : "text-gray-75 hover:bg-emerald-100"
        }`}
      >
        {ca.icon} {ca.nameBn}
      </Link>
    );
  })}
</nav>

);
};

export default Navber;
