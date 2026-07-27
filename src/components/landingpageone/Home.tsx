import React from 'react';
import { Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import Reveal from './Reveal'; // Import your new wrapper

const defaultHeroData = {
    // ... (Keep your existing data object here)
    heading: <>We care for your <br className="hidden md:block" /> pet like our baby</>,
    description: <>Assure clients they're completely safe with <br className="hidden sm:block" /> a trusted, results-driven experience.</>,
    cta: { label: "Book A Schedule" },
    socialProof: { stars: 5, text: "Over 400 Happy Pets Are Enjoyed" }
};

export default function HeroSection({ data = defaultHeroData }) {
    return (
        <section className="relative w-full lg:min-h-[115vh] h-screen flex md:items-center items-end overflow-hidden">
            <Image
                src="/homeimage.avif"
                alt="Dog being groomed"
                fill
                priority
                className="object-cover object-[70%_center] md:object-center -z-10"
            />

            <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-0 lg:ml-[10%]">
                <div className="flex flex-col max-w-[620px] py-20">

                    {/* Animate Heading from the Left */}
                    <Reveal animation="left">
                        <div className="flex flex-col gap-6 md:gap-8">
                            <h1 className="text-[#1e0c05] font-normal text-4xl font-bold md:text-6xl lg:text-[80px] leading-[1.1] tracking-[-2px] lg:tracking-[-5px]">
                                {data.heading}
                            </h1>
                            <p className="text-[#1e0c05] text-sm md:text-[18px] leading-[1.6] max-w-[380px]">
                                {data.description}
                            </p>
                        </div>
                    </Reveal>

                    {/* Animate CTA from the Bottom with a delay */}
                    <Reveal animation="up" delay="delay-200" className="mt-10 md:mt-12">
                        <a href="./websitetwo/services" className="group relative bg-[#a35c38] text-white rounded-2xl py-3.5 px-6 flex items-center justify-center gap-[14px] w-fit overflow-hidden hover:bg-[#8a4e2f] transition-all duration-300">
                            <Calendar className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-[16px] whitespace-nowrap">
                                {data.cta.label}
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                        </a>
                    </Reveal>

                    {/* Animate Stats from the Right with a longer delay */}
                    <Reveal animation="right" delay="delay-300" className="flex flex-col gap-2 mt-6 md:mt-10">
                        <div className="flex items-center gap-1">
                            {[...Array(data.socialProof.stars)].map((_, index) => (
                                <Star key={index} className="w-[17px] h-[17px] text-[#8c863a] fill-[#8c863a]" />
                            ))}
                        </div>
                        <p className="text-[#1e0c05] font-medium text-[16px] opacity-90">
                            {data.socialProof.text}
                        </p>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}