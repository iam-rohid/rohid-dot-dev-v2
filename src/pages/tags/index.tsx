import PageHeader from "@/components/PageHeader";
import TagItem from "@/components/TagItem";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import allPosts from "@/utils/allPosts";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import { GetStaticProps } from "next";
import { Fragment } from "react";

interface Props {
  tags: Tag[];
}

const TagsPage: CustomNextPage<Props> = (props) => {
  const { tags } = props;
  return (
    <Fragment>
      <PageHeader title="Tags" subtitle={`${tags.length} tags`} />
      <main className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <TagItem tag={tag} size="lg" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Fragment>
  );
};

TagsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: any) => {
  const tags = getTagsFromPosts(allPosts);

  return {
    props: { tags },
  };
};
