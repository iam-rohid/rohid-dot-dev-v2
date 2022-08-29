import { Fragment, ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type Props = {
  children: ReactNode;
};

const BaseLayout = (props: Props) => {
  const { children } = props;
  return (
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  );
};

export default BaseLayout;
