import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";

const NewsletterPage: CustomNextPage = () => {
  return (
    <main>
      <section className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <iframe
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
