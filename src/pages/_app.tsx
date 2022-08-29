import "@/styles/globals.css";
import { themeAtom } from "@/stores/theme";
import { CustomAppProps } from "@/types/next";
import { useAtom } from "jotai";
import Head from "next/head";
import { Fragment, useEffect } from "react";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [theme] = useAtom(themeAtom);

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme.colorScheme === "dark"
    );
  }, [theme]);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </Fragment>
  );
}

export default MyApp;
