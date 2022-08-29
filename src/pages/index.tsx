import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { Fragment } from "react";

const HomePage: CustomNextPage = () => {
  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
