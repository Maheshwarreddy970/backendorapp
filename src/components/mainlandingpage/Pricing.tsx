import React from 'react';

export const PRICING_DATA = {
    header: {
        title: "Simple, Transparent Pricing",
        contactPrefix: "Have questions? Reach out to us at",
        email: "nexpetcare@gmail.com",
        conjunction: "or",
        chatText: "book a setup call",
    },
    plan: {
        title: "The Digital Storefront",
        availability: "Limited Spots Available",
        heading: "Complete Website Handover",
        subheading: "for Groomers & Kennels",
        currency: "$",
        price: "799",
        period: " one-time", // Changed to one-time based on your agency model
        ctaText: "Get Started",
        avatar: {
            alt: "Maheshwar Avatar",
            src: "/_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY",
            srcSet: "/_next/image?url=%2Fme.jpg&w=32&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 1x, /_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 2x",
        },
    },
    features: [
        "Complete Custom Website Build",
        "Zero Monthly Hosting Fees (Life-time)",
        "Booking Software Integration (MoeGo, Square, etc.)",
        "Mobile-First & High-Speed React Tech",
        "SEO Protection & 301 Redirects",
        "Done-For-You Domain Connection",
        "Access to Private Website Editor",
        "1-Year Technical Support Guarantee",
    ],
};

export default function Pricing() {
    const { header, plan, features } = PRICING_DATA;

    return (
        <div
            data-slot="container"
            className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-20 flex flex-col gap-20 py-20 md:py-30"
        >
            {/* Header Section */}
            <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
                <h2 className="text-left text-4xl font-semibold tracking-tight md:text-5xl">
                    {header.title}
                </h2>
                <div className="-tracking-xs text-base leading-6 font-medium md:text-nowrap text-neutral-300">
                    {header.contactPrefix}{" "}
                    <a
                        className="text-emerald-400 underline underline-offset-3 hover:text-emerald-300 transition-colors"
                        href={`mailto:${header.email}`}
                    >
                        {header.email}
                    </a>{" "}
                    {header.conjunction}{" "}
                    <a className="cursor-pointer text-emerald-400 underline underline-offset-3 hover:text-emerald-300 transition-colors">
                        {header.chatText}
                    </a>
                </div>
            </div>

            {/* Pricing Card Section */}
            <div className="flex flex-col gap-6 w-full">
                <div className="grid grid-cols-1 w-full">
                    <div className="relative w-full flex flex-col gap-2.5 overflow-hidden rounded-3xl p-3 bg-neutral-950 text-white border border-white/10 shadow-2xl">
                        {/* Background Gradients/Blurs */}
                        <div className="absolute top-0 left-0 h-48 w-44 -translate-x-1/5 -translate-y-1/5 pointer-events-none">
                            <div className="absolute top-0 left-[61.27px] h-48 w-28 rounded-full bg-neutral-800 blur-2xl" />
                            <div className="absolute top-[45.09px] left-0 size-20 rounded-full bg-white/10 blur-[34.09px]" />
                        </div>

                        {/* Top Inner Box (Pricing & Description) */}
                        <div className="relative z-10 flex flex-col gap-16 rounded-2xl px-6 pt-6 pb-8 bg-white/5 border border-white/5">
                            <div className="flex flex-col gap-6">
                                <div className="flex w-fit flex-col gap-3 md:flex-row md:items-center">
                                    <span className="-tracking-sm text-xl font-medium leading-5 text-white">
                                        {plan.title}
                                    </span>
                                    <div className="flex items-center gap-2 rounded-full px-4 py-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 text-sm font-semibold">
                                        {plan.availability}
                                    </div>
                                </div>
                                <div className="-tracking-xl text-3xl leading-10 font-semibold text-white">
                                    <span>{plan.heading}</span>
                                    <br />
                                    <span className="text-neutral-400 font-medium">
                                        {plan.subheading}
                                    </span>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-0">
                                <div className="flex flex-col gap-6">
                                    <div className="-tracking-xs text-5xl leading-9 font-bold text-white">
                                        <span className="text-3xl text-neutral-300 font-medium mr-1">
                                            {plan.currency}
                                        </span>
                                        {plan.price}
                                        <span className="text-xl text-neutral-400 font-medium ml-1">
                                            {plan.period}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2.5 pr-5 pl-12 tracking-tight text-white font-medium hover:bg-neutral-900 transition-colors">
                                            <div
                                                data-slot="button-box"
                                                className="bg-[var(--color-primary)] absolute inset-y-0 left-1 z-40 my-auto flex size-9 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-400 ease-out group-hover:left-[calc(100%-2.5rem)] group-hover:rotate-180 group-hover:transform"
                                            >
                                                <div className="flex flex-col gap-px group-hover:hidden">
                                                    <div className="flex gap-px">
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                    </div>
                                                    <div className="flex gap-px">
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                    </div>
                                                    <div className="flex gap-px">
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                    </div>
                                                    <div className="flex gap-px">
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                    </div>
                                                    <div className="flex gap-px">
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                        <span className="inline-block size-1 shrink-0 rounded-full bg-white/25" />
                                                    </div>
                                                </div>
                                                <img
                                                    alt={plan.avatar.alt}
                                                    loading="lazy"
                                                    width={32}
                                                    height={32}
                                                    decoding="async"
                                                    data-nimg={1}
                                                    className="hidden rotate-180 rounded-[5px] blur-sm transition-all duration-400 ease-out group-hover:block group-hover:blur-none"
                                                    style={{ color: "transparent" }}
                                                    srcSet={plan.avatar.srcSet}
                                                    src={plan.avatar.src}
                                                />
                                            </div>
                                            <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
                                            <span className="inline-block text-white transition-transform duration-400 group-hover:-translate-x-8">
                                                {plan.ctaText}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 px-6 py-6 border-t border-white/5 mt-2 bg-neutral-950">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm leading-5 font-medium text-neutral-300">
                                    <div className="bg-emerald-500/50 size-2.5 shrink-0 rounded-full" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}