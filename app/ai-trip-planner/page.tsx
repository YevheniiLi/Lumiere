import type { Metadata } from "next";
import { AiTripPlannerChat } from "@/components/ai-trip-planner-chat";

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description:
    "A ChatGPT-style trip planning interface — a frontend design demo, not connected to a real AI model.",
};

export default function AiTripPlannerPage() {
  return <AiTripPlannerChat />;
}
