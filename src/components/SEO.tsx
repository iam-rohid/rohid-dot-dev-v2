import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  image?: string;
};

const SEO = (props: SEOProps) => {
  const { title, description, keywords, image } = props;
  const router = useRouter();
  const KEYWORDS = useMemo(
    () => (typeof keywords === "string" ? keywords : keywords?.join(", ")),
    [keywords]
  );
  const TITLE = useMemo(() => `${title ? `${title} - ` : ""}Rohid`, [title]);
  const DESCRIPTION = useMemo(() => description, [description]);
  const IMAGE = useMemo(
    () =>
      image
        ? image.startsWith("/")
          ? window.location.origin + image
          : image
        : undefined,
    [image]
  );
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rohid_dev" />
      <meta name="twitter:creator" content="@rohid_dev" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE} />
      <meta name="twitter:image:alt" content={TITLE} />
      {/* END TWITTER */}

      {/* FACEBOOK */}
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:image:alt" content={TITLE} />
      <meta property="og:url" content={router.asPath} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={TITLE} />
      {/* END FACEBOOK */}

      {/* GOOGLE */}
      <meta itemProp="name" content={TITLE} />
      <meta itemProp="description" content={DESCRIPTION} />
      <meta itemProp="image" content={IMAGE} />
      {/* END GOOGLE */}

      {/* ROBOTS */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="msnbot" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      <meta name="baiduspider" content="index, follow" />
      <meta name="sosospider" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      <meta name="ia_archiver" content="index, follow" />
      <meta name="nutch" content="index, follow" />
      <meta name="spider" content="index, follow" />
      <meta name="crawler" content="index, follow" />
      <meta name="robot" content="index, follow" />
      <meta name="bot" content="index, follow" />
      <meta name="crawling" content="index, follow" />
      <meta name="crawl" content="index, follow" />
      <meta name="crawlable" content="index, follow" />
      <meta name="crawlability" content="index, follow" />
      <meta name="crawlability_rank" content="index, follow" />
      {/* END ROBOTS */}
    </Head>
  );
};

export default SEO;
