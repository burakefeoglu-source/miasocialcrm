"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconUsers } from "@tabler/icons-react";

// Sayfalar hazır oldukça buraya eklenir.
const NAV = [
  { href: "/dashboard", label: "Panel", icon: IconLayoutDashboard },
  { href: "/team", label: "Ekip", icon: IconUsers },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col bg-white border-r border-line p-4 sticky top-0 h-screen">
      <div className="flex items-center gap-2.5 px-2 pt-1 mb-8">
        <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white font-display font-semibold">M</div>
        <span className="font-display font-medium text-[15px]">Mia Social CRM</span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-brand-100 text-brand font-medium" : "text-black/60 hover:bg-black/5"
              }`}
            >
              <Icon size={18} stroke={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
