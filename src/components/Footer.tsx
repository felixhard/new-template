import Logo from "./branding/Logo";
import Container from "./ui/Container";
import Text from "./ui/Text";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between py-12 w-full">
                <div className="flex flex-col gap-2">
                    <Logo />

                    <Text textStyle="body2">
                        Copyright © {year} Example. All rights reserved.
                    </Text>
                </div>

                <div className="flex w-full md:w-auto gap-12">
                    <div className="flex flex-col gap-4">
                        <Text textStyle="body2">Terms & Conditions</Text>

                        <Text textStyle="body2">Privacy Policy</Text>

                        <Text textStyle="body2">Contact</Text>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Text textStyle="body2">Pricing</Text>

                        <Text textStyle="body2">Demo</Text>
                    </div>
                </div>
            </div>
        </Container>
    );
}
