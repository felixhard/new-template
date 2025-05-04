import { Iconify } from "../ui/Iconify";
import Text from "../ui/Text";

type Props = {
    value: string;
};

export default function PriceItem({ value }: Props) {
    return (
        <div className="flex gap-2 items-center">
            <Iconify
                icon="material-symbols:check"
                className="text-2xl text-primary"
            />

            <Text textStyle="body2" className="text-nowrap">
                {value}
            </Text>
        </div>
    );
}
