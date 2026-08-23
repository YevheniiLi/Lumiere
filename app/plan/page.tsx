import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PlanForm } from "@/components/plan-form";

export const metadata: Metadata = {
  title: "Plan your trip",
  description: "Tell Lumière where and when — a demo of the planning experience.",
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan your trip"
        title="Where to, and when?"
        description="A short brief is all it takes to start routing your trip."
      />
      <section className="px-6 pb-24 lg:px-8">
        <PlanForm />
      </section>
    </>
  );
}
