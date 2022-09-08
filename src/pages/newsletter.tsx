import SEO from "@/components/SEO";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";

const NewsletterPage: CustomNextPage = () => {
  return (
    <main>
      <SEO title="Newsletter" />
      <section className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <iframe
            title="Substack Newsletter"
            src="https://rohid.substack.com/embed"
            style={{
              width: "100%",
              height: 512,
              backgroundColor: "transparent",
            }}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>
    </main>
  );
};

NewsletterPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default NewsletterPage;
