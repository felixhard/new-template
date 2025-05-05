"use client";

import { NAV_OPTIONS } from "@/data/navigation";
import clsx from "clsx";
import { useState } from "react";
import AuthButton from "./auth/AuthButton";
import Logo from "./branding/Logo";
import { Button } from "./ui/Button";
import Card from "./ui/Card";
import { Iconify } from "./ui/Iconify";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-lg py-4">
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <Logo />

            <div className="hidden md:flex items-center gap-2">
              {NAV_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  onClick={(e) => handleScroll(e, option.id)}
                >
                  {option.label}
                </Button>
              ))}

              {!isAuthenticated && <ThemeToggle />}
              <AuthButton />
              {isAuthenticated && <ThemeToggle />}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block md:hidden relative w-8 h-8"
            >
              <Iconify
                icon="mdi:menu"
                className={clsx(
                  "absolute inset-0 transition-all duration-300 text-3xl text-foreground/50",
                  isMenuOpen && "opacity-0 rotate-90",
                )}
              />
              <Iconify
                icon="mdi:close"
                className={clsx(
                  "absolute inset-0 transition-all duration-300 text-3xl text-foreground/50",
                  !isMenuOpen && "opacity-0 -rotate-90",
                )}
              />
            </button>
          </div>

          <div
            className={clsx(
              "grid transition-all duration-300 md:hidden",
              isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col items-center gap-4 w-full py-4">
                {NAV_OPTIONS.map((option) => (
                  <Button
                    key={option.id}
                    variant="ghost"
                    onClick={(e) => handleScroll(e, option.id)}
                  >
                    {option.label}
                  </Button>
                ))}

                {!isAuthenticated && <ThemeToggle />}
                <AuthButton />
                {isAuthenticated && <ThemeToggle />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
