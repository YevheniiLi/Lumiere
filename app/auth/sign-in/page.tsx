import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Lumière account.",
};

export default function SignInPage() {
  return (
    <>
      <PageHeader eyebrow="Welcome back" title="Sign in to Lumière" />
      <section className="px-6 pb-24 lg:px-8">
        <AuthForm mode="sign-in" />
      </section>
    </>
  );
}
