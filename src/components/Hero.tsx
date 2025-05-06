"use client";

import { Button } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FadeIn from "./ui/FadeIn";
import Text from "./ui/Text";

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    console.log("Button clicked, scrolling to:", id);
    e.preventDefault();
    const element = document.getElementById(id);
    console.log("Found element:", element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Element not found:", id);
    }
  };

  // Make this a direct function to debug
  const handleContactClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log("Get Started button clicked");
    handleScroll(e, 'contact');
  };

  return (
    <FadeIn duration={250}>
      <section className="py-20 md:py-32 relative w-full">
        <div className="relative max-w-7xl mx-auto gap-8 p-8 flex flex-col items-center text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Here you can add an image behind the hero section */}
          </div>


          <div className="max-w-4xl flex flex-col items-center gap-4 z-10">
            <Text 
              textStyle="h1" 
              fontWeight="font-extrabold" 
              className="text-4xl sm:text-5xl md:text-6xl leading-tight sm:leading-tight"
              alignment="center"
            >
              Launch your app in days with our template
            </Text>
            <Text 
              textStyle="body1" 
              className="text-lg sm:text-xl max-w-3xl"
              alignment="center"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </Text>
          </div>

          <div className="flex gap-4 items-center pointer-events-auto">
            <Button
              onClick={(e) => handleScroll(e, "contact")}
              className="bg-primary backdrop-blur-md"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={(e) => handleScroll(e, "faq")}
              className="bg-background-secondary backdrop-blur-md"
            >
              Learn More
            </Button>
          </div>
        
      </div>
    </section>
    </FadeIn>
  );
}
