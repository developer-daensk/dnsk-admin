import React from "react";
import { iLocale } from "@/Components/Entity/Locale/types";
import Final from "@/Main/Dashboard/Product/Search/Listing/Final/Final";

interface PageProps {
  params: {
    locale: iLocale;
    productId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <Final locale={params.locale} />;
};

export default Page;
