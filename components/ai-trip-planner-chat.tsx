"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bed,
  Bot,
  Check,
  CloudSun,
  Compass,
  Copy,
  Luggage,
  MapPin,
  Send,
  Sparkles,
  Trash2,
  User,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { tripTemplates, type TripTemplate } from "@/data/ai-trip-templates";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  template?: TripTemplate;
}

const starterPrompts = [
  "Plan a trip to Italy",
  "10 days in Japan",
  "Europe rail trip",
  "Trekking in Patagonia",
];

let messageId = 0;
function nextId() {
  messageId += 1;
  return `msg-${messageId}`;
}

function getThinkingDelay() {
  return 700 + Math.random() * 500;
}

interface GeneratedResponse {
  text: string;
  template?: TripTemplate;
}

// Scripted, keyword-matched responses only — this page is a frontend
// interface demo and is not connected to any AI model. Region-level prompts
// (Italy, Japan, Europe, Patagonia) return a full structured template from
// data/ai-trip-templates.ts; anything more specific falls back to the
// existing destination dataset or a generic prompt for more detail.
function generateResponse(prompt: string): GeneratedResponse {
  const q = prompt.toLowerCase();

  const templateKey = Object.keys(tripTemplates).find((key) => q.includes(key));
  if (templateKey) {
    const template = tripTemplates[templateKey];
    return {
      text: `Here's a starting plan for ${template.region} — itinerary, stays, food, transport, budget, weather, and what to pack.`,
      template,
    };
  }

  const match = destinations.find((d) => q.includes(d.city.toLowerCase()));
  if (match) {
    return {
      text: `${match.city} is a strong pick — best visited ${match.bestSeason}. ${match.description} Travelers rate it ${match.rating}/5 on average. Want a sample day-by-day itinerary, or should I compare it with somewhere else?`,
    };
  }

  const warmMonths = ["nov", "dec", "jan", "feb", "march", "march"];
  if (
    warmMonths.some((m) => q.includes(m)) ||
    q.includes("warm") ||
    q.includes("winter")
  ) {
    const warm = destinations.filter((d) => /Nov|Dec|Jan|Feb/.test(d.bestSeason));
    const pick = warm[Math.floor(Math.random() * warm.length)] ?? destinations[0];
    return {
      text: `${pick.city}, ${pick.country} is a good call for that window — best ${pick.bestSeason}. ${pick.description}`,
    };
  }

  if (q.includes("compare") || q.includes(" vs ") || q.includes(" or ")) {
    const [a, b] = destinations.sort(() => Math.random() - 0.5);
    return {
      text: `If it were between ${a.city} and ${b.city}: ${a.city} leans toward ${a.description.toLowerCase()} while ${b.city} is more about ${b.description.toLowerCase()} Tell me what you're optimizing for — food, pace, or scenery — and I'll narrow it down.`,
    };
  }

  const fallbacks = [
    "I can help plan that. Try a country or region — Italy, Japan, Europe, and Patagonia have full sample plans ready.",
    "Tell me a city or a region and I'll suggest a route — Italy, Japan, Europe, and Patagonia are fully mapped out here.",
    "Happy to sketch an itinerary. Do you want somewhere new, or a repeat trip done differently?",
  ];
  return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)] };
}

function LoadingDots() {
  return (
    <div
      className="flex items-center gap-1.5 px-1 py-2"
      aria-label="Assistant is thinking"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-foreground-secondary h-1.5 w-1.5 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(interval);
        onDone?.();
      }
    }, 14);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span>
      {shown}
      {shown.length < text.length && (
        <span className="bg-foreground ml-0.5 inline-block h-4 w-[2px] animate-pulse align-middle" />
      )}
    </span>
  );
}

function templateToText(intro: string, template: TripTemplate): string {
  const lines = [
    intro,
    "",
    `ITINERARY — ${template.region}`,
    ...template.itinerary.map((d) => `${d.day}: ${d.plan}`),
    "",
    "HOTELS",
    ...template.hotels.map((h) => `${h.name} (${h.area}) — ${h.price}`),
    "",
    "RESTAURANTS",
    ...template.restaurants.map((r) => `${r.name} — ${r.cuisine}: ${r.note}`),
    "",
    "TRANSPORT",
    ...template.transport.map((t) => `- ${t}`),
    "",
    "BUDGET",
    ...template.budget.map((b) => `${b.category}: ${b.estimate}`),
    "",
    `WEATHER: ${template.weather}`,
    "",
    "PACKING LIST",
    ...template.packingList.map((p) => `- ${p}`),
    "",
    "TRAVEL TIPS",
    ...template.tips.map((t) => `- ${t}`),
  ];
  return lines.join("\n");
}

function TemplateSection({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: typeof Bed;
  title: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="border-border border-t pt-4 first:border-t-0 first:pt-0"
    >
      <p className="text-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
        <Icon className="text-accent h-3.5 w-3.5" />
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
    </motion.div>
  );
}

function TemplateCard({ template }: { template: TripTemplate }) {
  return (
    <div className="mt-3 space-y-4 text-sm leading-relaxed">
      <TemplateSection icon={Compass} title="Itinerary" delay={0.05}>
        <ul className="space-y-1">
          {template.itinerary.map((d) => (
            <li key={d.day} className="text-foreground-secondary">
              <span className="text-foreground font-medium">{d.day}:</span> {d.plan}
            </li>
          ))}
        </ul>
      </TemplateSection>

      <TemplateSection icon={Bed} title="Hotels" delay={0.1}>
        <ul className="space-y-1">
          {template.hotels.map((h) => (
            <li key={h.name} className="text-foreground-secondary">
              <span className="text-foreground font-medium">{h.name}</span> — {h.area} ·{" "}
              {h.price}
            </li>
          ))}
        </ul>
      </TemplateSection>

      <TemplateSection icon={UtensilsCrossed} title="Restaurants" delay={0.15}>
        <ul className="space-y-1">
          {template.restaurants.map((r) => (
            <li key={r.name} className="text-foreground-secondary">
              <span className="text-foreground font-medium">{r.name}</span> ({r.cuisine})
              — {r.note}
            </li>
          ))}
        </ul>
      </TemplateSection>

      <TemplateSection icon={MapPin} title="Transport" delay={0.2}>
        <ul className="text-foreground-secondary list-inside list-disc space-y-1">
          {template.transport.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </TemplateSection>

      <TemplateSection icon={Wallet} title="Budget" delay={0.25}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
          {template.budget.map((b) => (
            <div key={b.category}>
              <p className="text-foreground-secondary text-[11px]">{b.category}</p>
              <p className="text-foreground font-medium">{b.estimate}</p>
            </div>
          ))}
        </div>
      </TemplateSection>

      <TemplateSection icon={CloudSun} title="Weather" delay={0.3}>
        <p className="text-foreground-secondary">{template.weather}</p>
      </TemplateSection>

      <TemplateSection icon={Luggage} title="Packing list" delay={0.35}>
        <ul className="text-foreground-secondary list-inside list-disc space-y-1">
          {template.packingList.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </TemplateSection>

      <TemplateSection icon={Sparkles} title="Travel tips" delay={0.4}>
        <ul className="text-foreground-secondary list-inside list-disc space-y-1">
          {template.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </TemplateSection>
    </div>
  );
}

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked (permissions/insecure context) —
      // failing silently is preferable to breaking the chat.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy response"
      className="focus-ring text-foreground-secondary hover:text-foreground border-border bg-background hover:border-accent/40 mt-2 flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-medium transition-all duration-300 hover:-translate-y-0.5"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy response
        </>
      )}
    </button>
  );
}

export function AiTripPlannerChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typingId, setTypingId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: ChatMessage = { id: nextId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    window.setTimeout(() => {
      const response = generateResponse(trimmed);
      const reply: ChatMessage = {
        id: nextId(),
        role: "assistant",
        content: response.text,
        template: response.template,
      };
      setThinking(false);
      setTypingId(reply.id);
      setMessages((prev) => [...prev, reply]);
    }, getThinkingDelay());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col px-4 sm:px-6">
      <div className="border-border glass sticky top-0 z-10 flex items-center justify-between gap-3 border-b py-3.5 sm:py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <motion.span
            className="from-primary to-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white"
            animate={{
              boxShadow: [
                "0 0 0 rgba(212,165,116,0)",
                "0 0 14px rgba(212,165,116,0.35)",
                "0 0 0 rgba(212,165,116,0)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          <div className="min-w-0">
            <h1 className="font-display text-sm font-semibold">AI Trip Planner</h1>
            <p className="text-foreground-secondary hidden truncate text-xs sm:block">
              Interface demo — scripted responses, no AI model connected
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMessages([])}
          disabled={messages.length === 0}
          aria-label="Clear chat"
          className="focus-ring border-border text-foreground-secondary hover:text-foreground hover:bg-background-secondary flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Clear chat</span>
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto py-6"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full flex-col items-center justify-center text-center"
          >
            <span className="from-primary to-accent flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="font-display mt-5 text-xl font-semibold">
              Where should we plan today?
            </h2>
            <p className="text-foreground-secondary mt-2 max-w-sm text-sm">
              Ask about a destination, a season, or have two places compared.
            </p>
            <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
              {starterPrompts.map((prompt, i) => (
                <motion.button
                  key={prompt}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  onClick={() => sendMessage(prompt)}
                  className="focus-ring border-border bg-background hover:border-accent/40 hover:bg-background-secondary rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" && "flex-row-reverse",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      message.role === "user"
                        ? "bg-background-secondary text-foreground"
                        : "from-primary to-accent bg-gradient-to-br text-white",
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </span>
                  <div
                    className={cn(
                      "glass border-border rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                      message.template ? "max-w-[92%] sm:max-w-[85%]" : "max-w-[80%]",
                      message.role === "user" ? "bg-primary/5" : "bg-background",
                    )}
                  >
                    {message.role === "assistant" && message.id === typingId ? (
                      <TypingText
                        text={message.content}
                        onDone={() => setTypingId(null)}
                      />
                    ) : (
                      message.content
                    )}
                    {message.template && <TemplateCard template={message.template} />}
                    {message.role === "assistant" && (
                      <CopyButton
                        getText={() =>
                          message.template
                            ? templateToText(message.content, message.template)
                            : message.content
                        }
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3"
              >
                <span className="from-primary to-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="glass border-border bg-background rounded-2xl border px-2">
                  <LoadingDots />
                </div>
              </motion.div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-border glass sticky bottom-0 border-t py-4"
      >
        <div className="border-border bg-background focus-within:border-accent/50 focus-within:ring-accent/20 flex items-end gap-2 rounded-2xl border p-2 shadow-sm transition-all duration-300 focus-within:ring-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Message"
            placeholder="Ask about a destination, season, or itinerary…"
            className="text-foreground placeholder:text-foreground-secondary max-h-[200px] flex-1 resize-none bg-transparent px-2.5 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="bg-primary text-primary-foreground focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-foreground-secondary mt-2 text-center text-[11px]">
          Portfolio demo — responses are scripted locally, not generated by an AI model.
        </p>
      </form>
    </div>
  );
}
