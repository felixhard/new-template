import { auth } from "@/app/auth";
import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/branding/Logo";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function page() {
    const session = await auth();

    return (
        <div className="relative flex flex-col justify-center items-center min-h-[100vh] bg-background">
            <Card width="w-fit">
                <Logo />

                <AuthForm session={session} />
            </Card>

            <Link className="text-grey-100 text-[14px] mt-4" href="/">
                {" "}
                Back To Home
            </Link>
        </div>
    );
}
