import clsx from "clsx";

type CardProps = {
    width?: string;
    cursor?: string;
    bgColor?: string;
    padding?: string;
    children: React.ReactNode;
    border?: string;
    borderColor?: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Card({
    width = "w-full",
    cursor = "default",
    bgColor = "bg-bg-gradient",
    padding = "p-4",
    children,
    onClick,
    border = "border-x border-t",
    borderColor = "border-border",
    className,
}: CardProps) {
    return (
        <div
            className={clsx(
                "relative gap-4 rounded-2xl backdrop-blur-md",
                cursor,
                borderColor,
                border,
                width,
                bgColor,
                padding,
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
