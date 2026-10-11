import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — BizPilot AI" },
      { name: "description", content: "Terms of service for BizPilot AI." },
      { property: "og:title", content: "Terms of Service — BizPilot AI" },
      { property: "og:description", content: "Terms of service for BizPilot AI." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <Link to="/"><Logo /></Link>
      <h1 className="mt-12 text-4xl font-semibold">Terms of service</h1>
      <p className="mt-6 text-soft">Terms of service will be published here once pricing and service scope are finalized.</p>
    </div>
  ),
});
