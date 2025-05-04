import { X } from "../icons/X";
import { Button } from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import { Iconify } from "../ui/Iconify";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import ContactForm from "./ContactForm";
import Text from "../ui/Text";

export default function ContactUs() {
  return (
    <div
      className="flex flex-col gap-12 items-center justify-center py-20 bg-background w-full"
      id="contact"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between w-full gap-20">
          <div className="flex flex-col">
            <FadeIn duration={100}>
              <SectionHeader
                title="Need to talk to us?"
                badge={<Badge>Let's Chat</Badge>}
                justify="start"
                description="Fill out the form or book a 15 minute chat, let's see how we can help you."
              />
            </FadeIn>

            <FadeIn duration={150}>
              <div className="flex gap-4">

                <Button>
                  <Iconify icon="mdi:phone" className="text-xl" />
                  Book A Call
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn duration={200}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
