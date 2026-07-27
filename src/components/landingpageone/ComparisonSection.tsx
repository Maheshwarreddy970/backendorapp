import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import Reveal from './Reveal';

const defaultComparisonData = {
    heading: "Why choose petocare",
    description: "We offer more than grooming — an experience of trust, expertise, and love for animals. Petocare is why owners keep returning.",
    otherOffers: [
        "Untrained or uncertified staff",
        "Harsh chemicals and poor products",
        "Stressful, noisy pet environment",
        "No updates during your pet's session",
        "One-size-fits-all service packages",
        "Inconsistent results every visit"
    ],
    petocareOffers: [
        "Certified, professional groomers",
        "100% pet-safe, eco-friendly products",
        "Calm, welcoming, stress-free space",
        "Real-time session updates",
        "Flexible packages for your pet",
        "Premium quality every visit"
    ]
};

export default function ComparisonSection({ data = defaultComparisonData }) {
    return (
        <section className="bg-[#fffaf8] py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">

                {/* Header (Slides Down) */}
                <Reveal animation="down" className="flex flex-col items-center text-center max-w-[628px] mb-12 lg:mb-16">
                    <h2 className="text-[#1e0c05] font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4">
                        {data.heading}
                    </h2>
                    <p className="text-[#625b5b] text-base md:text-[18px] leading-[1.6]">
                        {data.description}
                    </p>
                </Reveal>

                {/* Comparison Board */}
                <div className="relative w-full max-w-[950px] mx-auto flex flex-col md:flex-row">

                    {/* Left Column: Other Offers (Slides from Left) */}
                    <Reveal animation="left" className="flex-1 bg-[#faf3ec] p-8 md:p-10 lg:p-12 rounded-t-[22px] md:rounded-t-none md:rounded-l-[22px]">
                        <h3 className="text-[#1e0c05] font-medium text-[24px] leading-[1.3] tracking-[-0.7px] mb-6">
                            Other offers
                        </h3>
                        <ul className="flex flex-col">
                            {data.otherOffers.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 py-[18px] border-b border-[#ece5de] last:border-b-0"
                                >
                                    <XCircle className="w-5 h-5 text-[#625b5b] flex-shrink-0 stroke-[1.5]" />
                                    <span className="text-[#625b5b] text-[15px] md:text-[16px] leading-[1.6] opacity-90">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* VS Badge (Scales Up in the Center with a Delay) */}
                    <div className="absolute md:mt-0 -mt-8 left-1/2 -rotate-10 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                        <Reveal animation="scale" delay="delay-300">
                            <div className="bg-[#a35c38] text-white rounded-full w-[60px] h-[60px] md:w-[64px] md:h-[64px] border-[4px] border-[#fffaf8] flex items-center justify-center shadow-sm">
                                <span className="font-medium text-[20px] md:text-[22px] tracking-[-1px] uppercase">
                                    vs
                                </span>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Petocare Offers (Slides from Right) */}
                    <Reveal animation="right" className="flex-1 bg-[#8c863a] p-8 md:p-10 lg:p-12 rounded-b-[22px] md:rounded-r-[22px]">
                        <h3 className="text-[#fdfdfd] font-medium text-[24px] leading-[1.3] tracking-[-0.7px] mb-6">
                            Petocare offers
                        </h3>
                        <ul className="flex flex-col">
                            {data.petocareOffers.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 py-[18px] border-b border-white/20 last:border-b-0"
                                >
                                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 stroke-[1.5]" />
                                    <span className="text-white text-[15px] md:text-[16px] leading-[1.6]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}