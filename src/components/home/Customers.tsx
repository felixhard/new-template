import { CUSTOMERS } from "@/data/customers";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import Badge from "./Badge";
import CustomerCard from "./CustomerCard";

export default function Customers() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center bg-background py-20">
      <Container>
        <FadeIn duration={100} className="w-full">
          <SectionHeader
            title="Our customers"
            description="Here are some of the companies using our services."
            badge={<Badge>Our customers</Badge>}
          />
        </FadeIn>

        <FadeIn duration={150} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {CUSTOMERS.slice(0, 4).map((customer) => (
              <CustomerCard key={customer.name} {...customer} />
            ))}
          </div>
        </FadeIn>

        <FadeIn duration={200} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {CUSTOMERS.slice(4).map((customer) => (
              <CustomerCard key={customer.name} {...customer} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
