import { Star } from "../icons";
import Card from "../ui/Card";
import Text from "../ui/Text";

type Props = {
  img: string;
  name: string;
  header: string;
  review: string;
  company: string;
  stars: number;
};

export default function ReviewCard({
  name,
  header,
  review,
  company,
  img,
  stars,
}: Props) {
  const maxStars = 5;

  return (
    <Card bgColor="bg-background-secondary" padding="p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={img}
          alt={name}
          className="w-40 self-stretchs rounded-lg object-cover grayscale"
        />

        <div className="flex flex-col gap-4 items-start justify-between">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              {Array.from({ length: maxStars }).map((_, index) => (
                <Star key={index} fill="#404BE3" />
              ))}
            </div>

            <Text textStyle="h5" className="font-medium">
              {header}
            </Text>

            <Text textStyle="body2">{review}</Text>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <Text textStyle="body3">{name}</Text>

            <Text textStyle="body3">{company}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
