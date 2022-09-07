import nav from "@/data/nav.json";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";

const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
});

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const links = useMemo(() => {
    console.log(router.pathname);
    return nav.items.map((link) => ({
      ...link,
      isActive: router.pathname.match(link.match),
    }));
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  return (
    <Fragment>
      <nav className="h-16">
        <div className="mx-auto flex h-full max-w-4xl items-center gap-8 px-8">
          <ul className="flex h-full flex-1 items-center justify-end gap-8">
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
      <Sidebar
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        links={links}
      />
    </Fragment>
  );
};

export default NavBar;

const SearchBar = () => {
  return (
    <form className="w-full max-w-[280px] flex-1">
      <div className="relative flex h-9 w-full items-center gap-2 overflow-hidden rounded-md bg-white shadow-lg shadow-blue-900/10 dark:bg-gray-800 dark:shadow-none">
        <input
          className="absolute inset-0 flex-1 bg-transparent pl-10 pr-2 placeholder-gray-400 outline-none dark:placeholder-gray-600"
          placeholder="Search"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg leading-6 text-gray-600 dark:text-gray-300">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
    </form>
  );
};
