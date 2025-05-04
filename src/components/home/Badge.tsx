import clsx from "clsx";

type Props = {
  bgColor?: string;
  children: string;
  className?: string;
  borderWidth?: string;
  borderColor?: string;
  useGradientText?: boolean;
};

export default function Badge({
  children,
  className,
  bgColor = "bg-primary/[0.05]",
  borderWidth = "border",
  borderColor = "border-primary/40",
  useGradientText = false,
}: Props) {
  return (
    <div
      className={clsx(
        "px-4 py-2 rounded-xl w-fit font-medium text-sm",
        bgColor,
        borderWidth,
        borderColor,
        className,
      )}
    >
      <p
        className={clsx(
          useGradientText 
            ? "bg-clip-text text-transparent bg-badge-gradient" 
            : "text-primary"
        )}
      >
        {children}
      </p>
    </div>
  );
}
