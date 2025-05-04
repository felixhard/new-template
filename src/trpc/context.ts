import { auth } from "@/app/auth";
import { type Session } from "next-auth";

export type Context = {
    session: Session | null;
    userId?: string;
    role?: string;
};

export async function createContext(): Promise<Context> {
    const session = await auth();

    if (!session?.user) {
        return { session: null };
    }

    return {
        session,
        userId: session.user.id,
        role: session.user.role,
    };
}
