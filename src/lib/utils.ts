import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats the subscription plan code into a user-friendly display name
 * @param planCode The subscription plan code (e.g., "FREE", "FTF", "FSMVP", "ENTERPRISE")
 * @returns A user-friendly display name for the plan
 */
export function formatPlanName(planCode: string | undefined): string {
  if (!planCode) return "Unknown";
  
  const planMap: Record<string, string> = {
    "FREE": "Free",
    "FTF": "Figma to Frontend",
    "FSMVP": "Fullstack MVP",
    "ENTERPRISE": "Enterprise"
  };
  
  return planMap[planCode] || planCode;
}
