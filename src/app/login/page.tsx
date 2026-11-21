import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-10 md:py-16">
      <h1 className="text-3xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-muted">
        Concept mockup, not affiliated with Airbnb. This form does not create an account.
      </p>
      <LoginForm />
    </div>
  );
}
