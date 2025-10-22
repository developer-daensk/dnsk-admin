import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";

interface DashboardContentProps {
  locale: iLocale;
}

const DashboardContent = ({ locale }: DashboardContentProps) => {
  const dictionary = getDictionary(locale);
  return <div className="text-foreground">{dictionary.helloWorld}</div>;
};

export default DashboardContent;
