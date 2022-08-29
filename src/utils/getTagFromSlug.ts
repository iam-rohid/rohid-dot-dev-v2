import tags from "@/data/tags";
import type { Tag } from "@/models/tag";

const getTagFromSlug = (slug: string) => {
  const storeTag = tags.find((tag) => tag.slug === slug);

  const tag: Tag = {
    title: slug,
    weight: 0,
    slug,
    ...storeTag,
    url: `/tags/${slug}`,
  };

  return tag;
};

export default getTagFromSlug;
