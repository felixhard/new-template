import { FAQ_ITEMS } from "@/data/faqItems";
import { useState } from "react";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import FAQItem from "./FAQItem";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div 
      id="faq"
      className="flex flex-col gap-12 items-center justify-center py-20 bg-background-secondary"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-20">
          <FadeIn duration={100}>
            <SectionHeader
              title="Have questions?"
              justify="start"
              description="Here is a list of frequently asked questions"
              badge={<Badge>FAQ</Badge>}
            />
          </FadeIn>

          <FadeIn duration={150} className="w-full md:w-1/2">
            <div className="flex flex-col gap-6 w-full">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
