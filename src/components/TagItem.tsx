import { Tag } from "@/models/tag";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface Props {
  tag: Tag;
  size?: "sm" | "md" | "lg";
}

const TagItem = (props: Props) => {
  const { tag, size = "md" } = props;
  return (
    <Link href={tag.url}>
      <a
        href={tag.url}
        className={clsx([
          "flex items-center justify-start bg-gray-100 dark:bg-gray-700",
          {
            "px-1.5 py-0.5 text-xs rounded-sm": size === "sm",
            "px-2 py-1 rounded text-sm": size === "md",
            "px-2.5 py-1 text-base rounded-md": size === "lg",
          },
        ])}
        style={{
          backgroundColor: tag.backgroundColor,
          color: tag.foregroundColor,
        }}
      >
        {tag.title}
      </a>
    </Link>
  );
};

export default TagItem;
