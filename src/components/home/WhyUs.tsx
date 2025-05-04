import { WHY_US } from "@/data/whyUs";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import FeatureItem from "./FeatureItem";

export default function WhyUs() {
    return (
        <div
            className="flex flex-col gap-12 items-center justify-center py-20 bg-background-secondary"
            id="why-us"
        >
            <Container>
                <FadeIn duration={100}>
                    <SectionHeader
                        title="Why us?"
                        badge={<Badge>Why us?</Badge>}
                    />
                </FadeIn>

                <FadeIn duration={150}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {WHY_US.map((benefit) => (
                            <FeatureItem
                                key={benefit.title}
                                title={benefit.title}
                                description={benefit.description}
                            />
                        ))}
                    </div>
                </FadeIn>
            </Container>
        </div>
    );
}
