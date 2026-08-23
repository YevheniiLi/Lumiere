import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a Lumière account.",
};

export default function SignUpPage() {
  return (
    <>
      <PageHeader eyebrow="Get started" title="Create your Lumière account" />
      <section className="px-6 pb-24 lg:px-8">
        <AuthForm mode="sign-up" />
      </section>
    </>
  );
}
