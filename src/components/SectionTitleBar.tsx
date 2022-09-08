import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const SectionTitleBar = ({
  title,
  action,
  description,
}: {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}) => {
  return (
    <div className="mb-6 flex items-center">
      <div className="flex-1">
        <h2 className="flex-1 truncate text-2xl font-bold">{title}</h2>
        {!!description && <p className="text-gray-400">{description}</p>}
      </div>
      {!!action && (
        <Link href={action.href}>
          <a className="group flex items-center gap-1 transition-colors hover:text-priamry-400">
            {action.label}
            <span className="transition-transform group-hover:translate-x-1">
              <FaChevronRight />
            </span>
          </a>
        </Link>
      )}
    </div>
  );
};

export default SectionTitleBar;
