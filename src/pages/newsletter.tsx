import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { Fragment } from "react";

const NewsletterPage: CustomNextPage = () => {
  return <></>;
};

NewsletterPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default NewsletterPage;
