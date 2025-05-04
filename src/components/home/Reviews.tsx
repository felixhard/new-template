import { REVIEWS } from "@/data/reviews";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import CustomerCTA from "./CustomerCTA";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
    return (
        <div
            className="flex flex-col gap-12 items-center justify-center py-20 bg-background"
            id="reviews"
        >
            <Container>
                <FadeIn duration={100}>
                    <SectionHeader
                        title="What our customers say"
                        badge={<Badge>Reviews</Badge>}
                    />
                </FadeIn>

                <FadeIn duration={150}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {REVIEWS.map((review) => (
                            <ReviewCard key={review.name} {...review} />
                        ))}
                    </div>
                </FadeIn>

                <FadeIn duration={200} className="w-full">
                    <CustomerCTA />
                </FadeIn>
            </Container>
        </div>
    );
}
