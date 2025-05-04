import { ReactNode } from "react";
import Text from "./Text";

type Props = {
    title: string;
    badge: ReactNode;
    description?: string;
    justify?: "center" | "start";
};

export default function SectionHeader({
    title,
    description,
    badge,
    justify = "center",
}: Props) {
    return (
        <div
            className={`flex flex-col gap-6 items-${justify} justify-${justify} mb-10`}
        >
            {badge}

            <Text
                textStyle="h2"
                alignment={justify === "center" ? "center" : "left"}
            >
                {title}
            </Text>

            {description && (
                <Text
                    textStyle="body1"
                    alignment={justify === "center" ? "center" : "left"}
                >
                    {description}
                </Text>
            )}
        </div>
    );
}
