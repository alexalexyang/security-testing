import { NextSeo } from "next-seo";

export default function Seo({ description }: { description: string }) {
  return (
    <NextSeo
      title="Security testing"
      description={description}
      // canonical={pageUrl}
      openGraph={{
        // url: pageUrl,
        title: "Security testing",
        description: description,
        // images: [pageImage],
        site_name: "Security testing",
      }}
      twitter={{
        // handle: twitter,
        site: "Security testing",
        // cardType: "summary_large_image",
      }}
      // noindex={disallowRobot}
      // nofollow={disallowRobot}
    />
  );
}
