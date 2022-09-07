import PageHeader from "@/components/PageHeader";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { Fragment } from "react";

const NewsletterPage: CustomNextPage = () => {
  return (
    <Fragment>
      <PageHeader title="Newsletter" />
      <main className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 py-16"></div>
      </main>
    </Fragment>
  );
};

NewsletterPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default NewsletterPage;
