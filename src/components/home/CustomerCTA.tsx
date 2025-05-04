import clsx from "clsx";
import Button from "../ui/Button";

export default function CustomerCTA() {
    return (
        <div
            className={clsx(
                "px-4 py-3 rounded-xl font-medium text-sm w-full flex items-center justify-between mt-2 w-full",
                "bg-primary/[0.05]",
                "border",
                "border-primary/40"
            )}
        >
            <p className="bg-clip-text text-transparent bg-badge-gradient text-[16px]">
                Want to become one of our happy customers?
            </p>

            <Button size="small">Get In Touch</Button>
        </div>
    );
}
