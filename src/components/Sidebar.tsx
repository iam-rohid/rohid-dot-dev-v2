import clsx from "clsx";
import Link from "next/link";
import { createPortal } from "react-dom";

type Props = {
  links: {
    isActive: RegExpMatchArray | null;
    label: string;
    href: string;
    match: string;
  }[];
  open: boolean;
  onClose: () => void;
};

const Sidebar = (props: Props) => {
  const { links, open, onClose } = props;
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute left-0 top-0 bottom-0 w-screen max-w-xs bg-gray-100 dark:bg-gray-900">
        <ul className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a
                  className={clsx(
                    "py-2 px-4 rounded-md flex items-center shadow-blue-900/10",
                    {
                      "bg-white dark:bg-gray-800 dark:text-blue-500 text-blue-500 shadow-lg dark:shadow-none":
                        link.isActive,
                      "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white":
                        !link.isActive,
                    }
                  )}
                  onClick={onClose}
                >
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
