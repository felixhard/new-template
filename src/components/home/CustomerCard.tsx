import Card from "../ui/Card";
import Text from "../ui/Text";

type Props = {
    img: string;
    name: string;
};

export default function CustomerCard({ img, name }: Props) {
    return (
        <Card className="transition-all duration-300 hover:scale-105 md:hover:scale-105 sm:hover:none">
            <div className="flex items-center gap-2 justify-start min-w-60">
                <img
                    src={img}
                    alt={name}
                    className="rounded-full w-10 h-10 object-cover"
                />

                <Text textStyle="h5">{name}</Text>
            </div>
        </Card>
    );
}
