import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BlogLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default BlogLayout;
