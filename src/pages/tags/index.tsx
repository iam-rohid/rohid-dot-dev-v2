import PageHeader from "@/components/PageHeader";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { Fragment } from "react";

const TagsPage: CustomNextPage = () => {
  return (
    <Fragment>
      <PageHeader title="Tags" subtitle={`${0} tags`} />
      <main className="bg-white dark:bg-gray-800">
        <div className="max-w-4xl px-4 mx-auto py-16"></div>
      </main>
    </Fragment>
  );
};

TagsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default TagsPage;
