import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BizPilot AI" },
      { name: "description", content: "How BizPilot AI approaches business data." },
      { property: "og:title", content: "Privacy Policy — BizPilot AI" },
      { property: "og:description", content: "How BizPilot AI approaches business data." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <Link to="/"><Logo /></Link>
      <h1 className="mt-12 text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-6 text-soft">The full privacy policy is being prepared and will be published here before the platform launches. Until then, this website does not collect or store personal data through its forms.</p>
    </div>
  ),
});
