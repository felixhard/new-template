import Logo from "@/components/branding/Logo";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function page() {
  return (
    <div className="relative flex flex-col  justify-center items-center min-h-[100vh]">
      <Card width="w-fit">
        <Logo />

        <p>Opps, there was an error, please try again.</p>
      </Card>

      <Link className="text-grey-100 text-[14px] mt-4" href="/auth/signin">
        Back To Login
      </Link>
    </div>
  );
}
