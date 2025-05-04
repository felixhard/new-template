import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
    gap?: string;
    children: ReactNode;
    className?: string;
};

export default function Container({
    children,
    gap = "gap-6",
    className,
}: Props) {
    return (
        <div
            className={clsx(
                "relative mx-auto flex w-screen flex-col px-4 items-center justify-center md:w-[728px] md:px-0 lg:w-[984px] lg:px-0 xl:w-[1240px] xl:px-0 2xl:w-[1596px] 2xl:px-0",
                gap,
                className
            )}
        >
            {children}
        </div>
    );
}
