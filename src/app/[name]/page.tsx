// app/[name]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fraunces } from "next/font/google";
import { getWebsiteData } from "@/lib/get-website";
import {
  ArrowUpRight,
  Wand2,
  Sparkles,
  Hammer,
  CheckCircle2,
  ExternalLink,
  PenTool,
  LayoutGrid,
} from "lucide-react";
import VideoPlayer from "@/components/video-player"; // Your existing video component
import Linkedinicon from "@/icons/linkedinicon";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const DEMO_VIDEO_URL =
  "https://pd4wte44db.ufs.sh/f/fWb6RP7YsNVEbbO8aGeBy3eAgqoicxWusU9HMSL45X2mTOPC";

// Products we're actively building — shown as a scrollable strip of
// in-progress pills rather than a finished ecosystem list.
const PRODUCTS = [
  { name: "NexPetCare Booking", href: "https://www.nexpetcare.org/", logo: "/loho.png" },
  { name: "NexPetCare", href: "https://nexpetcare.com/", logo: "/logo.svg" },
];

const demos = [
  {
    href: "websiteone",
    tag: "Demo 01",
    dot: "bg-[#2383E2]",
    title: "The Modern Brand Flow",
    desc: "Clean, high-conversion layout built around your services and reviews.",
    url: "yourbrand.com",
    gradient: "from-[#DCEBFD] via-[#EFE7FB] to-[#FBE7F3]",
    image: "/websiteone.png",
  },
  {
    href: "websitetwo",
    tag: "Demo 02",
    dot: "bg-[#AD1A72]",
    title: "The Visual Booking Flow",
    desc: "Image-forward design built to showcase your grooming results.",
    url: "yourbrand.com/book",
    gradient: "from-[#FDEFDC] via-[#FCE4E1] to-[#F3E3FB]",
    image: "/websitetwo.webp",
  },
];

const templates = [
  { website: "https://nexpetcareone.netlify.app/", logoUrl: "template/oneimg.webp", tag: "Minimal" },
  { website: "https://nexpetcarenine.netlify.app/", logoUrl: "template/nineimg.webp", tag: "Editorial" },
  { website: "https://nexpetcarefour.netlify.app/", logoUrl: "template/fourimg.webp", tag: "Editorial" },
  { website: "https://nexpetcaretwelve.netlify.app/", logoUrl: "template/twelveimg.webp", tag: "Warm" },
  { website: "https://nexpetcaretwo.netlify.app/", logoUrl: "template/twoimg.webp", tag: "Warm" },
  { website: "https://nexpetcareten.netlify.app/", logoUrl: "template/tenimg.webp", tag: "Playful" },
  { website: "https://nexpetcareseven.netlify.app/", logoUrl: "template/sevenimg.webp", tag: "Warm" },
  { website: "https://nexpetcarefive.netlify.app/", logoUrl: "template/fiveimg.webp", tag: "Playful" },
  { website: "https://nexpetcaresix.netlify.app/", logoUrl: "template/siximg.webp", tag: "Minimal" },
  { website: "https://nexpetcarethree.netlify.app/", logoUrl: "template/threeimg.webp", tag: "Bold" },
  { website: "https:/nexpetcareeight.netlify.app/", logoUrl: "template/eightimg.webp", tag: "Bold" },
  { website: "https://nexpetcareeleven.netlify.app/", logoUrl: "template/elevenimg.webp", tag: "Minimal" },
];

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const website = await getWebsiteData(name);

  if (!website) {
    notFound();
  }
  return (
    <div
      className={`${fraunces.variable} font-[family-name:var(--font-inter)] bg-white text-[#191919] min-h-screen`}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { opacity: 0; animation: fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes softPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .pulse-dot { animation: softPulse 1.8s ease-in-out infinite; }

        @keyframes coverDrift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cover-drift { background-size: 200% 200%; animation: coverDrift 12s ease-in-out infinite; }

        @keyframes iconTilt {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(-6deg) scale(1.08); }
        }
        .icon-tilt-hover:hover .icon-tilt-target { animation: iconTilt 0.25s ease forwards; }

        .notion-link {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.25s ease;
        }
        .notion-link:hover { background-size: 100% 1px; }

        .arrow-nudge { transition: transform 0.2s ease; }
        .group:hover .arrow-nudge { transform: translate(2px, -2px); }

        .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 28px -12px rgba(25,25,25,0.22); }

        .gallery-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .group:hover .gallery-overlay { opacity: 1; }
        .gallery-img { transition: transform 0.4s ease; }
        .group:hover .gallery-img { transform: scale(1.06); }

        .chip-scroll::-webkit-scrollbar { display: none; }
        .chip-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ---------- COVER ---------- */}
      <div className="relative h-40 z-0 sm:h-52 w-full overflow-hidden">
        <img src="/bgdog.gif" alt="bgdog" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="mx-auto  max-w-4xl px-6">
        {/* icon overlapping the cover, Notion page-header style */}
        <div className="icon-tilt-hover scale-[1.01]  -mt-10 sm:-mt-12 inline-block">
          {website.websiteTwoData.navbar.logo.src ? (
            <img
              src={website.websiteTwoData.navbar.logo.src}
              alt={website.businessName}
              className="icon-tilt-target  h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-contain bg-white border border-[#EAEAE9] shadow-sm p-2"
            />
          ) : (
            <div className="icon-tilt-target h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white border border-[#EAEAE9] shadow-sm flex items-center justify-center text-2xl font-semibold">
              {website.businessName?.charAt(0) || name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* ---------- TITLE + PROPERTIES ---------- */}
        <div className="mt-5 fade-in-up">
          <p className="text-sm font-medium text-[#9B9A97] tracking-wide">Client case study</p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FBF3DB] px-2.5 py-1 font-medium text-[#9F6C00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DFAB01] pulse-dot" />
              In progress
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E7F3EE] px-2.5 py-1 font-medium text-[#0F7B6C]">
              Local service business
            </span>
            <Link href="https://www.linkedin.com/in/maheshwarr-reddy-713927258/" target="_blank" rel="noopener noreferrer" className="flex gap-1 hover:scale-105 ease-in-out duration-300 hover:translate-y-0.5 ">
            <Linkedinicon className="size-7"></Linkedinicon>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1EFEE] px-2.5 py-1 font-medium text-[#787774]">
              Prepared by Maheshwar Reddy
            </span>
            </Link>
          </div>
        </div>

        {/* ---------- CURRENTLY BUILDING STRIP ---------- */}
        <div className="mt-8 fade-in-up" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2 mb-3 text-[#9B9A97]">
            <Hammer className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Currently working on</span>
          </div>
          <div className="chip-scroll flex gap-2.5 overflow-x-auto pb-1">
            {PRODUCTS.map((p) => (
              <a
                key={p.href}
                target="_blank"
                rel="noopener noreferrer"
                href={p.href}
                className="card-lift group flex shrink-0 items-center gap-2 rounded-full border border-[#EAEAE9] bg-white px-3.5 py-2 text-sm"
              >
                <img src={p.logo} alt={p.name} className="h-4 w-4 object-contain" />
                <span className="font-medium">{p.name}</span>
                <ArrowUpRight className="arrow-nudge h-3.5 w-3.5 text-[#9B9A97]" />
              </a>
            ))}
          </div>
        </div>


        {/* ---------- DEMO SHOWCASE ---------- */}
        <section className="mt-14 fade-in-up" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center gap-2 mb-5">
            <PenTool className="w-4 h-4 text-[#9B9A97]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9B9A97]">
              Your live previews
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {demos.map((d) => (
              <Link
                key={d.href}
                href={`/${name}/${d.href}`}
                className="card-lift group block overflow-hidden rounded-xl border border-[#EAEAE9] bg-white"
              >
                {/* fake browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-[#EAEAE9] bg-[#FBFBFA] px-3 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F3B0A6]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F5DDA0]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B7DFC5]" />
                  <span className="ml-2 truncate rounded-md bg-white border border-[#EAEAE9] px-2 py-0.5 text-[11px] text-[#9B9A97]">
                    {d.url}
                  </span>
                </div>

                {/* preview surface */}
                <div className={`relative h-40 sm:h-48  overflow-hidden`} >
                  <img src={d.image} alt={d.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(25,25,25,0.18)_1px,transparent_0)] [background-size:18px_18px]" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#191919]/85 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between text-white text-sm">
                    <span>Open live preview</span>
                    <ArrowUpRight className="arrow-nudge h-4 w-4" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${d.dot} pulse-dot`} />
                    <span className="text-xs font-medium text-[#9B9A97]">{d.tag}</span>
                  </div>
                  <h4 className="font-semibold text-[15px]">{d.title}</h4>
                  <p className="mt-1 text-sm text-[#787774]">{d.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- CUSTOM DESIGN CALLOUT ---------- */}
        <div className="mt-8 flex items-start gap-3 rounded-lg border border-dashed border-[#D3D3D1] bg-[#FAFAF9] p-5 fade-in-up">
          <span className="icon-tilt-hover inline-flex mt-0.5">
            <Wand2 className="icon-tilt-target w-5 h-5 text-[#9B9A97] shrink-0" />
          </span>
          <p className="text-sm text-[#787774] leading-relaxed">
            <span className="font-semibold text-[#191919]">Not quite your style? </span>
            Every template below is ready to deploy as-is, or send us a link to a site you love
            and we'll custom-build it from scratch.
          </p>
        </div>

        {/* ---------- TEMPLATE GALLERY (all rendered) ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-2 mb-5">
            <LayoutGrid className="w-4 h-4 text-[#9B9A97]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9B9A97]">
              {templates.length} templates ready to deploy
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((t, i) => (
              <a
                key={t.website}
                href={t.website}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group relative block overflow-hidden rounded-lg border border-[#EAEAE9] bg-[#FBFBFA] fade-in-up"
                style={{ animationDelay: `${160 + i * 40}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={t.logoUrl}
                    alt={`Template ${i + 1} — ${t.tag}`}
                    className="gallery-img h-full w-full object-cover"
                  />
                  <div className="gallery-overlay absolute inset-0 bg-[#191919]/55 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-[#191919]">
                      View template <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 rounded-md bg-white/90 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-[#787774]">
                    {t.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- PRICING ---------- */}
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#9B9A97]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9B9A97]">
              Exclusive pricing
            </h3>
          </div>
          <p className="text-sm text-[#787774] mb-6">
            Because the structural framework is already built, this comes in well under standard
            agency rates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card-lift rounded-xl border border-[#EAEAE9] bg-white p-6">
              <p className="text-sm font-medium text-[#9B9A97]">Custom landing page</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold">$799</span>
                <span className="text-sm text-[#B7B6B3] line-through">$1,999</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-[#504e49]">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Custom-designed, mobile responsive</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Direct booking &amp; contact CTAs built in</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Zero ongoing maintenance fees</li>
              </ul>
            </div>

            <div className="card-lift relative rounded-xl border-2 border-[#191919] bg-white p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-[#191919] px-3 py-1 text-xs font-medium text-white">
                Most complete
              </span>
              <p className="text-sm font-medium text-[#9B9A97]">Full booking platform</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold">$1,999</span>
                <span className="text-sm text-[#B7B6B3] line-through">$2,999</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-[#504e49]">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Everything in the landing page tier</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Full admin dashboard &amp; calendar</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#0F7B6C] shrink-0" /> Client management &amp; automated booking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SOFTWARE DEMO VIDEO ---------- */}
        <section className="mt-16 pb-16">
          <h3 className="text-xl font-semibold">Curious about the full platform?</h3>
          <p className="mt-2 text-sm text-[#787774]">
            A 2-minute look inside the NexPetCare admin dashboard that runs the $1,999 tier.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#EAEAE9] card-lift">
            <div className="flex items-center gap-1.5 border-b border-[#EAEAE9] bg-[#FBFBFA] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F3B0A6]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F5DDA0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#B7DFC5]" />
              <span className="ml-2 rounded-md bg-white border border-[#EAEAE9] px-2 py-0.5 text-[11px] text-[#9B9A97]">
                app.nexpetcare.com/dashboard
              </span>
            </div>
            <div className="bg-black">
              <VideoPlayer src={DEMO_VIDEO_URL} />
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#EAEAE9] bg-[#FBFBFA] py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-6 text-sm text-[#9B9A97] sm:flex-row">
          <span>© {new Date().getFullYear()} NexPetCare Agency</span>
          <a href="mailto:nexpetcare@gmail.com" className="notion-link hover:text-[#191919]">
            nexpetcare@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}