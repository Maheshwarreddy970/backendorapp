'use client';

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils"; // Adjust path to your lib folder if needed

interface HeroData {
    heading: React.ReactNode;
    description: React.ReactNode;
    socialProof?: { stars: number; text: string };
}

const defaultHeroData: HeroData = {
    heading: <>Your Pet’s Safe and Joyful Haven</>,
    description: <>We provide professional care that keeps <br className="hidden sm:block" /> every pet safe, relaxed, and joyful.</>,
};

export default function Hero({ data = defaultHeroData }: { data?: HeroData }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    // Playful overshoot spring curve for the puppy reveal
    const puppyTransition = {
        transitionTimingFunction: 'cubic-bezier(0.34, 1.7, 0.64, 1)',
    };

    return (
        <section
            ref={ref}
            className="relative min-h-[90vh] md:min-h-screen flex flex-col overflow-hidden"
        >
            {/* Background Sky */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/4hSYsmxSfhf9uFuCUXkCroZutsY.avif"
                    alt="Cloud Background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* [PHASE 1] Bottom Cloud - Anchors instantly */}
            <div className={cn(
                "w-full absolute bottom-0 left-0 flex justify-end z-20 transition-all duration-1000 ease-out transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
                <div className="relative w-full h-[120px] sm:h-[180px] md:h-[220px] lg:h-[278px]">
                    <Image
                        src="/t49nGcvSU3RT2ngSvvjRRajdes4.avif"
                        alt="Cloud"
                        fill
                        className="object-cover object-bottom inset-0"
                    />
                </div>
            </div>

            {/* [PHASE 4] Puppy Image (Mobile) - Pops up from behind cloud */}
            <div
                style={puppyTransition}
                className={cn(
                    "absolute bottom-0 right-0 md:hidden z-10 transition-all duration-1000 delay-[800ms] transform",
                    inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-48 scale-90"
                )}
            >
                <div className="relative w-full max-w-[700px]">
                    <Image
                        src="/download(3).png"
                        alt="Cute brown and white puppy"
                        width={700}
                        height={829}
                        priority
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Hero Content Wrapper */}
            <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-[120px]">
                <div className="relative w-full max-w-[1300px] -mt-60 md:mt-0">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">

                        {/* Left Side Content */}
                        <div className="w-full z-30 max-w-xl text-center lg:text-left order-2 lg:order-1">
                            <div className="flex flex-col gap-2">
                                {/* [PHASE 2A] Heading Reveal */}
                                <h1 className={cn(
                                    "text-[38px] leading-[1.1] md:text-[46px] md:leading-[50.6px] font-normal text-zinc-800 transition-all duration-700 delay-200 ease-out transform",
                                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}>
                                    {data.heading}
                                </h1>

                                {/* [PHASE 2B] Paragraph Reveal */}
                                <p className={cn(
                                    "text-[17px] leading-[25.2px] text-zinc-800 transition-all duration-700 delay-400 ease-out transform",
                                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                )}>
                                    {data.description}
                                </p>
                            </div>

                            {/* [PHASE 3] Action Button Container - Soft Scale Pop */}
                            <div className={cn(
                                "flex flex-col items-center lg:items-start mt-3 transition-all duration-500 delay-600 ease-out transform",
                                inView ? "opacity-100 scale-100" : "opacity-0 scale-75"
                            )}>
                                <a 
                                    href={"/services"} 
                                    className="flex mx-auto md:mx-0 items-center gap-2.5 bg-[#FFC357] text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0 hover:scale-105 active:scale-95 transition-transform duration-200"
                                >
                                   Schedule a visit
                                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                                        <svg
                                            width="12"
                                            height="10"
                                            viewBox="0 0 12 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M.6 4.602h10m-4-4 4 4-4 4"
                                                stroke="#3f3f47"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </a>

                                {/* Optional Dynamic Social Proof Badge */}
                                {data.socialProof && (
                                    <div className="flex items-center gap-2 mt-4 text-xs font-medium text-zinc-700">
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: data.socialProof.stars }).map((_, idx) => (
                                                <svg
                                                    key={idx}
                                                    className="w-4 h-4 text-amber-400 fill-current"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span>{data.socialProof.text}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* [PHASE 4] Puppy Image (Desktop) - Spring-loaded rise from inside cloud */}
                        <div
                            style={puppyTransition}
                            className={cn(
                                "order-2 hidden md:flex justify-center w-full z-10 transition-all duration-[1100ms] delay-[800ms] transform",
                                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-72"
                            )}
                        >
                            <div className="relative w-full max-w-[700px]">
                                <Image
                                    src="/download(3).png"
                                    alt="Cute brown and white puppy"
                                    width={700}
                                    height={829}
                                    priority
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}