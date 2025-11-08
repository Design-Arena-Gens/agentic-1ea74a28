import Image from "next/image";
import Link from "next/link";

const metrics = [
  { label: "Luxury Residences", value: "180+" },
  { label: "Buyer Satisfaction", value: "98%" },
  { label: "Global Cities", value: "24" },
  { label: "Avg. Closing Time", value: "12 days" },
];

const featureHighlights = [
  {
    title: "Curated Listings",
    description:
      "Personalized property recommendations powered by market intelligence and lifestyle data.",
  },
  {
    title: "Concierge Tours",
    description:
      "Virtual and in-person experiences with dedicated advisors guiding each step of the journey.",
  },
  {
    title: "Smart Transactions",
    description:
      "Secure digital paperwork, transparent negotiations, and comprehensive legal support.",
  },
];

const showcaseProperties = [
  {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    title: "Skyline Penthouse, Manhattan",
    price: "$8.4M",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630697087882-6acf13ecb68c?auto=format&fit=crop&w=1200&q=80",
    title: "Cliffside Villa, Amalfi Coast",
    price: "$5.2M",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
    title: "Palm Cove Estate, Malibu",
    price: "$12.8M",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,_189,_248,_0.25),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,_116,_144,_0.25),_transparent_50%)]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-8 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-white/90 backdrop-blur">
                Horizon Estates
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Elevate your lifestyle with{" "}
                <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
                  curated luxury residences
                </span>
              </h1>
              <p className="max-w-xl text-lg text-white/70 lg:text-xl">
                Concierge-level guidance, immersive tours, and a fully connected
                booking experience tailored to discerning buyers across the
                globe.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-all duration-300 hover:translate-y-0.5 hover:bg-sky-100"
                >
                  Dashboard
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
                >
                  Browse Residences
                </a>
              </div>
            </div>
            <div className="flex-1">
              <div className="glass-surface relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[32px] p-8 text-slate-900 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-sky-100/90 opacity-90" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-500">
                      Featured Listing
                    </span>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Skyline Penthouse
                    </h2>
                    <p className="text-sm text-slate-600">
                      Central Park West, New York City
                    </p>
                  </div>
                  <div className="relative h-56 w-full overflow-hidden rounded-3xl">
                    <Image
                      src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
                      alt="Skyline penthouse interior"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="flex flex-col rounded-2xl bg-white/60 p-3">
                      <span className="text-xs uppercase tracking-widest text-slate-400">
                        Price
                      </span>
                      <span className="text-lg font-semibold text-slate-800">
                        $8,400,000
                      </span>
                    </div>
                    <div className="flex flex-col rounded-2xl bg-white/60 p-3">
                      <span className="text-xs uppercase tracking-widest text-slate-400">
                        Interior Space
                      </span>
                      <span className="text-lg font-semibold text-slate-800">
                        4,750 sq ft
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">
                  {metric.label}
                </p>
                <p className="mt-4 text-3xl font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 bg-white">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              Why Horizon
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Seamless experiences from discovery to closing
            </h2>
            <p className="max-w-2xl text-lg text-slate-600">
              Your dedicated advisory team combines local expertise, data-driven
              insights, and curated service to open doors to remarkable homes
              around the world.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
              >
                <span className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500/90 to-indigo-500/90 text-white ring-4 ring-sky-100 transition-transform duration-300 group-hover:scale-105" />
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="showcase"
          className="bg-slate-950 py-20 text-white sm:py-24 lg:py-28"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">
                Featured Residences
              </span>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Distinctive spaces reimagined for modern living
              </h2>
              <p className="max-w-2xl text-lg text-white/70">
                From architectural icons to private coastal estates, explore a
                portfolio that blends timeless design with contemporary
                comforts.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {showcaseProperties.map((property) => (
                <article
                  key={property.title}
                  className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-white/30"
                >
                  <div className="relative h-64">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-3 px-6 py-6">
                    <h3 className="text-xl font-semibold">{property.title}</h3>
                    <p className="text-white/70">{property.price}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        Private tours available
                      </span>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-sky-200 transition-colors duration-300 hover:text-white"
                      >
                        Schedule
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                A concierge team crafted for ambitious buyers
              </h2>
              <p className="text-lg text-slate-600">
                Your Horizon advisor coordinates private showings, negotiates on
                your behalf, and manages every detail until keys are in your
                hands. We leverage market analytics, global partnerships, and
                exclusive networks to surface opportunities unavailable
                elsewhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">
                    Custom Market Reports
                  </p>
                  <p className="text-base text-slate-700">
                    Real-time pricing analytics & comps
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">
                    White-Glove Coordination
                  </p>
                  <p className="text-base text-slate-700">
                    Financing, legal, relocation handled
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,_130,_246,_0.25),_transparent_60%)]" />
              <div className="relative flex flex-col gap-4">
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200/90">
                  Client Spotlight
                </span>
                <p className="text-lg text-white/80">
                  “The Horizon team orchestrated private showings across three
                  continents in one week. Their dashboard made scheduling,
                  documentation, and negotiations effortless.”
                </p>
                <div>
                  <p className="text-base font-semibold text-white">
                    Daniel Li
                  </p>
                  <p className="text-sm text-white/60">
                    Founder, Meridian Capital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-lg font-semibold text-slate-900">
              Horizon Estates
            </p>
            <p className="text-sm text-slate-500">
              Crafted experiences for extraordinary living.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <Link
              href="/dashboard"
              className="rounded-full border border-slate-200 px-5 py-2 font-semibold text-slate-700 transition-colors duration-300 hover:border-slate-900 hover:text-slate-900"
            >
              Access Dashboard
            </Link>
            <a href="mailto:advisor@horizonestates.com">advisor@horizonestates.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
