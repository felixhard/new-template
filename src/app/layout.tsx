import AppProviders from "@/providers/appProvider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { auth } from "./auth";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Define metadata for the application
// This will be used by Next.js for SEO and document head
// You can add these to subsequent pages to override these values
// You can also query the database directly using db.blog for example to get dynamic metadata whilst keeping the layout serverside
export const metadata: Metadata = {
  metadataBase: new URL("https://quizzrr.com"),
  title: "RapidDev | Ship Your App In Days",
  description:
    "RapidDev is a platform that helps you ship your app in days. We provide you with the tools and resources to get your app to market quickly.",
};

// Root layout component that wraps the entire application
// This is a Next.js specific component that runs on the server
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the authentication session
  const session = await auth();

  return (
    // Set the HTML language and force dark theme
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      {/* Apply global styles to the body */}
      <body className="min-h-[100vh] text-foreground">
        {/* Wrap the app with providers and pass authentication session */}
        <AppProviders session={session}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {/* Add toast notifications support */}
            <Toaster />

            {/* Render child components */}
            {children}
          </ThemeProvider>
        </AppProviders>
      </body>
    </html>
  );
}
