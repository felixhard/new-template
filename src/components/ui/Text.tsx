import clsx from "clsx";
import { HTMLAttributes, ReactNode, CSSProperties } from "react";

type Props = {
  color?: string;
  lines?: 1 | 2 | 3;
  children?: ReactNode;
  className?: string;
  alignment?: "left" | "center" | "right";
  textStyle?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "body3";
  fontWeight?: "font-normal" | "font-medium" | "font-semibold" | "font-bold" | "font-extrabold";
} & HTMLAttributes<HTMLParagraphElement>;

export default function Text({
  color = "text-foreground",
  lines,
  children,
  alignment = "left",
  textStyle = "body1",
  className,
  fontWeight = "font-normal",
  ...props
}: Props) {
  const variants = {
    h1: "text-4xl md:text-7xl font-heading",
    h2: "text-4xl md:text-5xl font-heading",
    h3: "text-3xl md:text-4xl font-heading",
    h4: "text-2xl md:text-3xl font-heading",
    h5: "text-xl md:text-2xl font-heading",
    h6: "text-lg md:text-lg font-heading",
    body1: "text-lg md:text-lg font-body opacity-70",
    body2: "text-md md:text-md font-body opacity-70",
    body3: "text-sm md:text-sm font-body opacity-70",
  };

  const lineClamp = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
  };

  const textAlignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Tag =
    textStyle === "h1"
      ? "h1"
      : textStyle === "h2"
        ? "h2"
        : textStyle === "h3"
          ? "h3"
          : "p";

  return (
    <Tag
      className={clsx(
        variants[textStyle],
        color,
        lines && lineClamp[lines],
        textAlignment[alignment],
        fontWeight,
        className,
      )}
      style={fontWeight === "font-extrabold" ? { letterSpacing: "-0.050em" } as CSSProperties : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
