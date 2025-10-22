import { Button } from "../../Shadcn/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const backHandler = () => {
    const handlePopState = () => {
      router.refresh();
      window.removeEventListener("popstate", handlePopState);
    };
    window.addEventListener("popstate", handlePopState);
    router.back();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8"
      type="button"
      onClick={backHandler}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}
