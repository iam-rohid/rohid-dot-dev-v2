import TagsList from "@/components/TagsList";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import allPosts from "@/utils/allPosts";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import { GetStaticProps } from "next";

interface Props {
  tags: Tag[];
}

const TagsPage: CustomNextPage<Props> = (props) => {
  const { tags } = props;
  return (
    <main>
      <header className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <h1 className="mb-1 text-3xl font-bold">Tag</h1>
          <p className="text-gray-300">
            Total <b>{tags.length}</b> tags
          </p>
        </div>
      </header>
      <section className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <TagsList tags={tags} />
        </div>
      </section>
    </main>
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
