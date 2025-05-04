"use client";

import { Button } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <section className="py-20 md:py-32 relative w-full">
      <div className="relative max-w-7xl mx-auto gap-8 p-8 flex flex-col items-center text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* <div className="absolute h-[20rem] w-[20rem] rounded-full right-[20%] top-[20%] bg-primary/20 blur-3xl" />
            <div className="absolute h-[25rem] w-[25rem] rounded-full left-[20%] bottom-[20%] bg-secondary/20 blur-3xl" /> */}
        </div>

        {/* <div className="flex flex-col items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-black/5 backdrop-blur border border-accent/50 text-content/80">
            <span className="text-sm leading-tight">
              Creating a SaaS has never been easier 🚀
            </span>
          </div>
          <Link href="https://docs.rapiddev.app" target="_blank">
            <span className="text-sm underline text-content/70">
              Read the docs →
            </span>
          </Link>
        </div> */}

        <div className="max-w-4xl flex flex-col items-center gap-4 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight sm:leading-tight ">
            Launch your app in days with our template
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8 relative z-20">
          <button 
            onClick={handleContactClick} 
            className="h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors cursor-pointer relative z-30"
            style={{ 
              position: 'relative', 
              zIndex: 50, 
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            Get Started
          </button>
          
          <Button variant="outline" size="lg" className="relative z-20">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
