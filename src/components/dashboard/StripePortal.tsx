import Button from "../ui/Button";

export default function StripePortal() {
    return (
        // This button will take your users to a Stripe hosted page where your users can manage their subscription.
        // You can generate a Stripe portal from this link - https://docs.stripe.com/no-code/customer-portal
        <Button
            onClick={() => {
                window.open(
                    "https://billing.stripe.com/p/login/test_4gwbMk1h9dDmh0s4gg",
                    "_blank"
                );
            }}
        >
            Dashboard
        </Button>
    );
}
