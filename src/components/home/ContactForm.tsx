import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Text from "../ui/Text";

// Initial state for the contact form
const initialState = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  message: "",
};

// Contact form submission function
const sendContact = (data: typeof initialState) => {
  console.log("Sending contact form data:", data);
  // Here you would typically make an API call
};

export default function ContactForm() {
  const [state, setState] = useState(initialState);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Mock API call with timeout
    setTimeout(() => {
      sendContact(state);
      toast.success("Message sent! We'll be in touch soon.");
      setIsSending(false);
    }, 1500);
  };

  return (
    <Card className="w-full md:w-[600px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Text fontWeight="font-bold" textStyle="h5">Contact Us</Text>

        <Text textStyle="body2" className="text-foreground/70">
          Fill out the form below to get in touch with our team.
        </Text>

        <div className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              name="name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />

            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />

            <Input
              placeholder="Phone (optional)"
              name="phone"
              type="tel"
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />

            <Input
              placeholder="Budget (optional)"
              name="budget"
              value={state.budget}
              onChange={(e) => setState({ ...state, budget: e.target.value })}
            />
          </div>

          <Textarea
            placeholder="Message"
            name="message"
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isSending || !state.name || !state.email || !state.message}
        >
          {isSending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Card>
  );
}
