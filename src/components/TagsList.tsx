import { Tag } from "@/models/tag";
import Link from "next/link";

const TagsList = ({ tags }: { tags: Tag[] }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Link href={tag.url}>
            <a
              className="flex items-center justify-center rounded-md bg-gray-800 px-2.5 py-1"
              style={{
                backgroundColor: tag.backgroundColor,
                color: tag.foregroundColor,
              }}
            >
              {tag.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
