import { mainMenu } from "@/data/site.json";
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
      <nav className="h-16">
        <div className="max-w-4xl flex items-center h-full mx-auto px-4 gap-2">
          <button
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-md bg-white text-lg leading-6 text-gray-700 shadow-lg shadow-blue-900/10 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none"
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

          <ul className="items-center gap-1 hidden md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a
                    className={clsx(
                      "h-10 px-4 rounded-md flex items-center justify-center shadow-blue-900/10",
                      {
                        "bg-white dark:bg-gray-800 dark:text-blue-500 text-blue-500 shadow-lg dark:shadow-none":
                          link.isActive,
                        "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white":
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

          <div className="flex items-center justify-end gap-2 flex-1">
            <SearchBar />

            <button
              className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-lg leading-6 text-gray-700 shadow-lg shadow-blue-900/10 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none"
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
      <div className="bg-white dark:bg-gray-800 gap-2 flex items-center h-10 rounded-md shadow-lg dark:shadow-none relative overflow-hidden shadow-blue-900/10 w-full">
        <input
          className="placeholder-gray-400 dark:placeholder-gray-600 bg-transparent flex-1 absolute inset-0 pl-12 pr-2 outline-none"
          placeholder="Search"
        />
        <span className="leading-6 text-lg absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
    </form>
  );
};
