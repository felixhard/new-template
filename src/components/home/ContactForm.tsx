import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Text from "../ui/Text";
import Textarea from "../ui/Textarea";

export default function ContactForm() {
    const { mutate: sendContact, isPending: isSending } =
        trpc.contact.sendContact.useMutation({
            onSuccess: () => {
                setState(initialState);
                toast.success(
                    "Thank you for your message. We'll be in touch soon!"
                );
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });

    const initialState = {
        name: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
    };

    const [state, setState] = useState(initialState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendContact(state);
    };

    return (
        <Card width="w-full md:w-[600px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Text textStyle="h5">Contact Us</Text>

                <Text textStyle="body2">
                    Let us know your details and we will be in touch asap.
                </Text>

                <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Name"
                            name="name"
                            value={state.name}
                            onChange={(e) =>
                                setState({ ...state, name: e.target.value })
                            }
                        />

                        <Input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={state.email}
                            onChange={(e) =>
                                setState({ ...state, email: e.target.value })
                            }
                        />

                        <Input
                            placeholder="Phone (optional)"
                            name="phone"
                            type="tel"
                            value={state.phone}
                            onChange={(e) =>
                                setState({ ...state, phone: e.target.value })
                            }
                        />

                        <Input
                            placeholder="Budget"
                            name="budget"
                            value={state.budget}
                            onChange={(e) =>
                                setState({ ...state, budget: e.target.value })
                            }
                        />
                    </div>

                    <Textarea
                        placeholder="Message"
                        name="message"
                        value={state.message}
                        onChange={(e) =>
                            setState({ ...state, message: e.target.value })
                        }
                    />

                    <Button
                        type="submit"
                        width="w-full"
                        className="mt-2"
                        isLoading={isSending}
                        isDisabled={
                            isSending ||
                            !state.name ||
                            !state.email ||
                            !state.message
                        }
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
