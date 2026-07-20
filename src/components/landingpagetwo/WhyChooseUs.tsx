'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { PawPrint } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";


// High-performance Count-Up Component for numbers
function Counter({ value, trigger }: { value: string; trigger: boolean }) {
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(value.replace(/,/g, '').replace(/\+/g, ''), 10);
    const hasPlus = value.includes('+');

    useEffect(() => {
        if (!trigger) return;

        let frame = 0;
        const duration = 2000; // 2 seconds animation duration
        const totalFrames = 120; // ~60fps target over 2s
        const frameDuration = duration / totalFrames;

        const counterInterval = setInterval(() => {
            frame++;
            // Smooth ease-out progress function
            const progress = frame / totalFrames;
            const easeOutProgress = progress * (2 - progress);

            setCount(Math.round(numericTarget * easeOutProgress));

            if (frame === totalFrames) {
                clearInterval(counterInterval);
                setCount(numericTarget);
            }
        }, frameDuration);

        return () => clearInterval(counterInterval);
    }, [trigger, numericTarget]);

    return (
        <>
            {count.toLocaleString()}
            {hasPlus && "+"}
        </>
    );
}
const defaultStatsData = [
  { value: "2,500+", label: "Pets Treated with Care", delay: "delay-0" },
  { value: "850+", label: "Free Health Checkups", delay: "delay-100" },
  { value: "1,800+", label: "Grooming Appointments", delay: "delay-200" },
  { value: "500+", label: "Happy Pet Families", delay: "delay-300" },
];
const defaultWhyChooseUsData = {

    tagline: "Why choose us",
    heading: <>Putting your pet’s comfort and wellness first</>,
    benefits: [
        { text: "Skilled and compassionate veterinary team", delay: "delay-[200ms]" },
        { text: "Personalized care tailored to each pet's needs", delay: "delay-[400ms]" },
        { text: "Years of trusted experience in pet wellness", delay: "delay-[600ms]" },
    ],
};

export default function WhyChooseUs({ data = defaultWhyChooseUsData }) {
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.15 });
    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <>
            {/* Stats */}
            <section ref={statsRef} className="relative -mt-28 bg-center py-16 md:py-20 lg:py-28 overflow-hidden">
                <Image
                    src='/whychoseus.avif'
                    alt='Background Image'
                    fill
                    priority
                    className="object-cover -z-20"
                />

                <div className="relative mx-auto max-w-7xl py-8 px-6 z-10">
                    <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
                        {defaultStatsData.map((item) => (
                            <div
                                key={item.label}
                                className={cn(
                                    "flex flex-col items-center text-center transition-all duration-1000 ease-out transform",
                                    statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                                    item.delay
                                )}
                            >
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    <Counter value={item.value} trigger={statsInView} />
                                </h3>

                                <p className="mt-2 text-sm md:text-base opacity-90">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section ref={contentRef} className="bg-white py-16 md:py-20 lg:py-28 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Content Box */}
                        <div>
                            {/* Sub-label */}
                            <div className={cn(
                                "mb-4 flex items-center gap-2 transition-all duration-700 ease-out transform",
                                contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                            )}>
                                <PawPrint size={18} className="fill-[#FFC357] text-[#FFC357]" />
                                <span className="text-[17px] text-zinc-800 font-medium">
                                    {data.tagline}
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className={cn(
                                "max-w-[520px] text-4xl md:text-5xl leading-tight text-zinc-800 transition-all duration-700 delay-100 ease-out transform",
                                contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}>
                                {data.heading}
                            </h2>

                            {/* Bullet points with cascading delayed entries */}
                            <div className="mt-8 space-y-5">
                                {data.benefits.map((item) => (
                                    <div
                                        key={item.text}
                                        className={cn(
                                            "flex items-start gap-3 transition-all duration-700 ease-out transform",
                                            contentInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                                            item.delay
                                        )}
                                    >
                                        <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#B4C0F5]" />
                                        <span className="text-base text-zinc-800">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <a
                                href='Schedule a visit'
                                className={cn(
                                    "inline-block mt-8 rounded-full bg-[#FFC357] px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-500 delay-[800ms] ease-out transform hover:scale-105 active:scale-95 hover:opacity-90",
                                    contentInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                )}
                            >
                                Schedule a visit
                            </a>
                        </div>

                        {/* Image Block */}
                        <div className="flex justify-center">
                            <div className={cn(
                                "relative w-full rounded-3xl overflow-hidden max-w-[450px] transition-all duration-1000 delay-300 ease-out transform",
                                contentInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
                            )}>
                                <Image
                                    src='/4Yb5t7I9TwOK30Fgn80wjPtAmQ.avif'
                                    alt='Pet Care'
                                    width={450}
                                    height={495}
                                    className="h-auto w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}