import { Head, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <html>
      <Head />
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <NextScript />
      </body>
    </html>
  );
};

export default MyDocument;
