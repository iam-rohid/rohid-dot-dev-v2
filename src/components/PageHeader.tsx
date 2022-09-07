import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}
const PageHeader = (props: Props) => {
  const { title, subtitle } = props;
  return (
    <header>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{subtitle}</p>
      </div>
    </header>
  );
};

export default PageHeader;
