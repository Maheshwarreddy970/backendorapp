import React from 'react';
import Image from 'next/image';
import Reveal from './Reveal';

const defaultInsightsData = {
    heading: "Pet care insights",
    description: "Awesome results come from a passionate team of dedicated animal lovers at Petocare.",
};

const insights = [
    {
        id: 1,
        date: 'Mar 12, 2026',
        title: '5 Signs your cat needs grooming help',
        image: '/b1.avif',
        alt: 'Man petting a brown and white dog',
    },
    {
        id: 2,
        date: 'Apr 5, 2026',
        title: 'How often do usually groom your dog?',
        image: '/b2.avif',
        alt: 'Groomer brushing a golden retriever',
    },
    {
        id: 3,
        date: 'May 3, 2026',
        title: 'Keeping your pet calm during grooming',
        image: '/b3.avif',
        alt: 'Groomer comforting a small white dog',
    },
]
export default function InsightsSection({ data = defaultInsightsData }) {
    // Delays specifically mapped to smoothly stagger each article card layout
    const gridDelays = ["delay-0", "delay-150", "delay-300"];

    return (
        <section className="bg-[#fffaf8] py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">

                {/* Header Block (Slides Down into view) */}
                <Reveal animation="down" className="flex flex-col items-center text-center mb-12 lg:mb-16">
                    <h2 className="text-[#1e0c05] font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4">
                        {data.heading}
                    </h2>
                    <p className="text-[#625b5b] text-base md:text-[18px] leading-[1.6]">
                        {data.description}
                    </p>
                </Reveal>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 w-full">
                    {insights.map((insight, index) => (
                        /* Each article panel drops upwards and staggers sequentially */
                        <Reveal 
                            key={insight.id} 
                            animation="up" 
                            delay={gridDelays[index] || "delay-500"}
                            className="w-full"
                        >
                            <article className="flex flex-col group cursor-pointer">
                                {/* Image Container */}
                                <div className="relative w-full aspect-[408/252] rounded-2xl overflow-hidden mb-6 shadow-sm">
                                    <Image
                                        src={insight.image}
                                        alt={insight.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col items-start px-1">
                                    {/* Date Badge */}
                                    <div className="inline-flex items-center justify-center bg-[#faf3ec] border border-[#ece5de] rounded-lg px-3 py-1 mb-4">
                                        <span className="text-[#625b5b] font-medium text-[14px] leading-[1.6]">
                                            {insight.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[#1e0c05] font-medium text-[22px] md:text-[24px] leading-[1.3] tracking-[-0.7px] group-hover:text-[#a35c38] transition-colors duration-300">
                                        {insight.title}
                                    </h3>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}