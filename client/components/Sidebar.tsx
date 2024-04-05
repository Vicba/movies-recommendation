"use client";

import Image from "next/image";
import React from "react";
import { Bookmark, Clapperboard, Film, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Movies",
    icon: Film,
    href: "/movies",
  },
  {
    name: "Bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed h-[95%] w-[64px] m-5 flex flex-col justify-between items-center my-5 py-8 px-2 bg-primary rounded-md">
      <div className="flex flex-col gap-8">
        <Link href="/dashboard">
          <Clapperboard size={28} color="red" />
        </Link>
        <ul className="flex flex-col gap-6 items-center">
          {NAV_ITEMS.map((item) => (
            <Link key={item.name} href={item.href}>
              <item.icon
                size={24}
                className={cn(
                  "text-slate-500",
                  "hover:transition ease-in-out duration-150",
                  pathname === item.href
                    ? "text-white"
                    : "active:text-white hover:text-white"
                )}
              />
            </Link>
          ))}
        </ul>
      </div>
      <Image
        src="/portret.png"
        alt="logo"
        width={40}
        height={40}
        className="rounded-full"
      />
    </nav>
  );
}

export default Sidebar;
