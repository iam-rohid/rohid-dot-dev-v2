import Link from "next/link";

const Breadcrumb = ({
  data,
}: {
  data: {
    label: string;
    href: string;
  }[];
}) => {
  return (
    <ul className="mb-2 flex flex-wrap gap-2 text-sm">
      {data.map((item, i) => (
        <li key={item.href}>
          <Link href={item.href}>
            <a className="text-gray-300 hover:text-priamry-400">{item.label}</a>
          </Link>
          {i < data.length - 1 && <span className="ml-2 text-gray-500">/</span>}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
