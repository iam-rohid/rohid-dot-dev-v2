import nav from "@/data/nav.json";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const links = useMemo(() => {
    return nav.items.map((link) => ({
      ...link,
      isActive: link.match && router.pathname.match(link.match),
    }));
  }, [router]);

  return (
    <nav className="h-16">
      <div className="mx-auto flex h-full max-w-5xl items-center gap-8 px-8">
        <ul className="flex h-full flex-1 items-center justify-end gap-6">
          {links.map((item) => (
            <li key={item.link}>
              <Link href={item.link}>
                <a
                  className={clsx([
                    "",
                    {
                      "text-priamry-400": item.isActive,
                      "": !item.isActive,
                    },
                  ])}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
