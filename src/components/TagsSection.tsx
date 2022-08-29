import { Tag } from "@/models/tag";
import TagItem from "./TagItem";

interface Props {
  title?: string;
  tags: Tag[];
}

const TagsSection = (props: Props) => {
  const { title, tags } = props;
  return (
    <section>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <ul className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <li key={tag.slug}>
            <TagItem tag={tag} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TagsSection;
