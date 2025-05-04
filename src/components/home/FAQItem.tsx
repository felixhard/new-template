"use client";

import clsx from "clsx";
import Card from "../ui/Card";
import { Iconify } from "../ui/Iconify";
import Text from "../ui/Text";

type Props = {
  answer: string;
  isOpen: boolean;
  question: string;
  onToggle: () => void;
};

export default function FAQItem({ question, answer, isOpen, onToggle }: Props) {
  return (
    <Card bgColor="bg-background">
      <button
        onClick={onToggle}
        className="flex gap-2 items-center w-full justify-between cursor-pointer"
      >
        <Text textStyle="h6">{question}</Text>

        <Iconify
          icon="ic:baseline-plus"
          className={clsx(
            "transition-transform duration-300 text-2xl",
            isOpen && "rotate-45",
          )}
        />
      </button>

      <div
        className={clsx(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Text textStyle="body2" className="mt-4">
            {answer}
          </Text>
        </div>
      </div>
    </Card>
  );
}
