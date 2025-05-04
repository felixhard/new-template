import { ReactNode } from "react";
import Card from "../ui/Card";
import Text from "../ui/Text";

type Props = {
    title: string;
    asset?: ReactNode;
    description: string;
};

export default function FeatureItem({ title, asset, description }: Props) {
    return (
        <Card
            bgColor="bg-background"
            className="hover:scale-105 transition-all duration-300"
        >
            <div className="flex flex-col items-start gap-4">
                {asset && (
                    <div className="flex items-center justify-center">
                        {asset}
                    </div>
                )}

                <Text textStyle="h5">{title}</Text>

                <Text>{description}</Text>
            </div>
        </Card>
    );
}
