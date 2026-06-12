import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/data/content";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "CV — Euan Hill",
  description:
    "Curriculum vitae of Euan Hill, AI consultant specialising in enterprise AI strategy, multi-agent platforms, and intelligent automation.",
  alternates: { canonical: "/cv" },
};

export default function CV() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-20 print:py-0 print:px-0">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-heading text-brown">{content.hero.name}</h1>
          <p className="text-label text-copper mt-1">{content.hero.subtitle}</p>
        </div>
        <div className="flex gap-3 print:hidden">
          <Link
            href="/"
            className="text-label text-copper border border-copper-muted px-5 py-2.5 rounded-full hover:text-brown hover:border-copper transition-colors duration-300"
          >
            Back
          </Link>
          <PrintButton />
        </div>
      </div>

      <p className="text-body text-brown-light mb-4">
        <a href={`mailto:${content.contact.email}`} className="underline">
          {content.contact.email}
        </a>
        {content.contact.links.map((link) => (
          <span key={link.label}>
            {" · "}
            <a href={link.url} className="underline">
              {link.url.replace("https://", "").replace(/\/$/, "")}
            </a>
          </span>
        ))}
      </p>

      <section className="mb-10">
        <h2 className="text-label text-copper border-b border-copper-muted/40 pb-2 mb-4">
          Profile
        </h2>
        <p className="text-body text-brown-light">{content.about.paragraph}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-label text-copper border-b border-copper-muted/40 pb-2 mb-4">
          Skills
        </h2>
        <dl className="space-y-2">
          {content.skills.groups.map((group) => (
            <div key={group.label} className="text-body text-brown-light">
              <dt className="inline font-semibold text-brown">
                {group.label}:{" "}
              </dt>
              <dd className="inline">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-10">
        <h2 className="text-label text-copper border-b border-copper-muted/40 pb-2 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          {content.career.entries.map((entry) => (
            <div key={`${entry.period}-${entry.role}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-body font-semibold text-brown">
                  {entry.role} — {entry.company}
                </h3>
                <p className="text-label text-copper">{entry.period}</p>
              </div>
              <p className="text-body text-brown-light text-sm mt-1">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-label text-copper border-b border-copper-muted/40 pb-2 mb-4">
          Selected engagements
        </h2>
        <div className="space-y-5">
          {content.work.entries.map((entry) => (
            <div key={entry.number}>
              <h3 className="text-body font-semibold text-brown">
                {entry.title}{" "}
                <span className="font-normal text-copper">({entry.tag})</span>
              </h3>
              <p className="text-body text-brown-light text-sm mt-1">
                {entry.description}
              </p>
              <p className="text-body text-brown-light text-sm mt-1">
                Outcomes: {entry.outcomes.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
