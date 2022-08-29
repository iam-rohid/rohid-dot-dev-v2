import getTagFromSlug from "./getTagFromSlug";

export default function getTagsFromSlugs(slugs: string[]) {
  slugs = [...new Set(slugs)];
  const tags = slugs
    .map((tag) => getTagFromSlug(tag))
    .sort((t1, t2) => t1.title.localeCompare(t2.title))
    .sort((t1, t2) => {
      if (t1.weight > t2.weight) {
        return -1;
      } else if (t1.weight < t2.weight) {
        return 1;
      }
      return 0;
    });

  return tags;
}
