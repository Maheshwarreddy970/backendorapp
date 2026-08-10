"use client";

import React, { useState } from "react";
export const faqs = [
  {
    question: "Do I have to pay monthly hosting fees?",
    answer: "No. Unlike Wix, Squarespace, or traditional web agencies, you do not pay us a monthly fee just to keep your website online. We host your site on our secure, lightning-fast cloud network for free. You only pay our flat $799 setup fee once."
  },
  {
    question: "Can I keep my current domain name?",
    answer: "Yes, absolutely. You retain 100% ownership of your domain (like www.yourgrooming.com). When the new site is ready, we will personally guide you through pointing your domain to the new layout so you don't have to deal with the tech."
  },
  {
    question: "Will I lose my current Google SEO ranking?",
    answer: "No, your rankings will actually be protected and likely improve. Because our sites are custom-coded in React, they are incredibly fast, which Google loves. We also set up proper '301 Redirects' so Google knows your old pages have securely moved to the new design without losing your search history."
  },
  {
    question: "Does this connect to my booking software?",
    answer: "Yes! Your website acts as your 'digital storefront.' We embed links directly to your existing booking software (like Square, MoeGo, Acuity, or Gingr) so clients can easily book, pay deposits, and fill out intake forms seamlessly."
  },
  {
    question: "What if I need to update text or photos later?",
    answer: "We provide you with a private, easy-to-use client dashboard. If you ever need to change a price, update your hours, or swap a photo of a dog, you just log in, click, and type. No coding or web developer required."
  },
  {
    question: "Most of my clients book on their phones. Is this mobile-friendly?",
    answer: "100%. Over 80% of pet parents search for groomers on their cell phones. We design our websites 'mobile-first,' meaning the buttons, photos, and layouts are specifically optimized to look beautiful and convert visitors into clients on any mobile device."
  },
  {
    question: "Do I have to set up the technical stuff myself?",
    answer: "Not at all. We do all the heavy lifting. Once you approve the final design, we jump on a quick Google Meet with you, share our screen, and handle the complex technical connections for you so nothing breaks."
  },
  {
    question: "Do I own the website, or am I locked into a contract?",
    answer: "You own the website outright. There are zero ongoing agency retainers or lock-in contracts. If you ever decide you want to leave our platform in the future, you can download your website files and take them with you."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 ">
      <div
        data-slot="container"
        className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-15 py-20 md:py-30 lg:grid-cols-2"
      >
        {/* Left Column: Heading and Contact Card */}
        <div className="flex flex-col gap-15 pt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-heading text-left text-4xl font-semibold tracking-tight md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="-tracking-xs text-base leading-6 font-medium md:text-nowrap">
              Have more doubts? Reach out to us at{" "}
              <a
                className="text-dusty-green underline underline-offset-3"
                href="mailto:contact@Nexpetcare.com"
              >
                contact@Nexpetcare.com
              </a>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-8 rounded-3xl px-6 py-8 shadow-card-md w-full lg:max-w-lg shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-2xl leading-8 -tracking-sm ">
                Need a fast moving team of engineers for your startup?
              </span>
              <span className="font-medium text-neutral-500 text-base -tracking-xs leading-6">
                Nexpetcare is your best bet, we have designers, engineers and
                managers to take your project from 0-1.
              </span>
            </div>
            <div>
              <button className="group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2 pr-4 pl-11 tracking-tight">
                <div
                  data-slot="button-box"
                  className="bg-[var(--color-primary)] absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-400 ease-out group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180 group-hover:transform"
                >
                  <div className="flex flex-col gap-px group-hover:hidden">
                    <div className="flex gap-px">
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                    </div>
                    <div className="flex gap-px">
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                    </div>
                    <div className="flex gap-px">
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                    </div>
                    <div className="flex gap-px">
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                    </div>
                    <div className="flex gap-px">
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                    </div>
                  </div>
                  <img
                    alt="Avatar"
                    loading="lazy"
                    width={32}
                    height={32}
                    className="hidden rotate-180 rounded-[5px] blur-sm transition-all duration-400 ease-out group-hover:block group-hover:blur-none"
                    src="https://github.com/shadcn.png"
                  />
                </div>
                <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
                <span className="inline-block text-white  transition-transform duration-400 group-hover:-translate-x-8">
                  Chat with Maheshwar
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="h-full w-full">
          <div className="flex w-full flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <React.Fragment key={index}>
                  <div className="py-6">
                    <h3 className="flex">
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        className="group/accordion-trigger text-xl relative flex flex-1 cursor-pointer items-start justify-between rounded-lg border border-transparent py-2 text-left transition-all outline-none -tracking-xs leading-6 font-medium "
                      >
                        {faq.question}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down ml-auto size-6 text-neutral-500 transition-transform duration-300 group-aria-expanded/accordion-trigger:-rotate-180"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </h3>

                    {/* CSS Grid Animation for smooth slide-down */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-neutral-400 leading-6 pr-8 pb-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider (don't show after the last item) */}
                  {index !== faqs.length - 1 && (
                    <div className="bg-natural-black/15 h-px w-full bg-neutral-800" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}