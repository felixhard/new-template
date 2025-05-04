import config from "@/config";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import PricingCard from "./PricingCard";

export default function Pricing() {
    const { starter, pro, enterprise } = config.stripe.plans;

    return (
        <div
            className="flex flex-col gap-12 items-center justify-center py-20 bg-background-secondary"
            id="pricing"
        >
            <Container>
                <FadeIn duration={100}>
                    <SectionHeader
                        title="There's something for everyone"
                        badge={<Badge>Pricing</Badge>}
                    />
                </FadeIn>

                <FadeIn duration={150} className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-0 md:mt-8 w-full">
                        <PricingCard plan={starter} />

                        <PricingCard plan={pro} />

                        <PricingCard plan={enterprise} />
                    </div>
                </FadeIn>
            </Container>
        </div>
    );
}
