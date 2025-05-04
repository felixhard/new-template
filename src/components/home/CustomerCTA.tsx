import clsx from "clsx";
import { Button } from "../ui/Button";

export default function CustomerCTA() {
  return (
    <div
      className={clsx(
        "px-4 py-3 rounded-xl font-medium text-sm w-full flex items-center justify-between mt-2 w-full",
        "bg-primary/[0.05]",
        "border",
        "border-primary/40",
      )}
    >
      <p className="text-primary font-bold text-[16px]">
        Want to become one of our happy customers?
      </p>

      <div className="flex w-full items-center justify-center gap-4 my-10">
        <Button onClick={() => window.open("/dashboard", "_self")}>
          Get Started
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open("https://google.com", "_blank")}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
