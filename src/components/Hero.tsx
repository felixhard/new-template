import Badge from "./home/Badge";
import FlickeringGrid from "./special/FlickeringGrid";
import Button from "./ui/Button";
import Container from "./ui/Container";
import FadeIn from "./ui/FadeIn";
import Text from "./ui/Text";

export default function Hero() {
    return (
        <div className="relative pointer-events-none">
            <Container>
                <div className="flex flex-col gap-6 items-center justify-center py-40 z-0">
                    <FadeIn duration={100}>
                        <Badge>Welcome to your app!</Badge>
                    </FadeIn>

                    <FadeIn duration={150}>
                        <Text textStyle="h1" className="text-center pb-4">
                            The main problem <br /> you are solving
                        </Text>
                    </FadeIn>

                    <FadeIn duration={200}>
                        <Text textStyle="body1" alignment="center">
                            This should offer extra context about what your
                            product is/does.
                        </Text>
                    </FadeIn>

                    {/* You can use the email lead or the buttons for CTA  */}
                    {/* <EmailLead /> */}

                    <FadeIn duration={250}>
                        <div className="flex gap-4 items-center pointer-events-auto">
                            <Button>Get Started</Button>

                            <Button variant="secondary">Learn More</Button>
                        </div>
                    </FadeIn>
                </div>
            </Container>

            <div className="w-full h-full absolute top-0 left-0 z-0 opacity-30 pointer-events-none">
                <FlickeringGrid maxOpacity={0.5} color="rgb(255, 255, 255)" />
            </div>
        </div>
    );
}
