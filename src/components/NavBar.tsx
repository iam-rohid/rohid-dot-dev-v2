import { mainMenu } from "@/data/site";
import { themeAtom } from "@/stores/theme";
import clsx from "clsx";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";

const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
});

const NavBar = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const links = useMemo(() => {
    return mainMenu.map((link) => ({
      ...link,
      isActive: router.pathname.match(link.match),
    }));
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  return (
    <Fragment>
      <nav className="h-14">
        <div className="mx-auto flex h-full max-w-4xl items-center gap-2 px-4">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-lg leading-6 text-gray-700 shadow-lg shadow-blue-900/10 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none md:hidden"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <i
              className={clsx("fa-solid", {
                "fa-close": showSidebar,
                "fa-bars": !showSidebar,
              })}
            ></i>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a
                    className={clsx(
                      "flex h-9 items-center justify-center rounded-md px-4 shadow-blue-900/10",
                      {
                        "bg-white text-blue-500 shadow-lg dark:bg-gray-800 dark:text-blue-500 dark:shadow-none":
                          link.isActive,
                        "text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white":
                          !link.isActive,
                      }
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-lg leading-6 text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none"
              onClick={() => {
                setTheme({
                  colorScheme: theme.colorScheme == "dark" ? "light" : "dark",
                });
              }}
            >
              <i
                className={clsx("fa-solid", {
                  "fa-moon": theme.colorScheme === "dark",
                  "fa-sun": theme.colorScheme === "light",
                })}
              ></i>
            </button>
          </div>
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
