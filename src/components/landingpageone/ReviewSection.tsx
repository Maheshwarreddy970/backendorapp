import React from 'react';
import { CalendarDays, Star } from 'lucide-react';
import Reveal from './Reveal';

const defaultStatsData = {
    heading: <>Trusted by pet owners across the city <br className="hidden md:block" /> for grooming & personal care.</>,
    rating: { score: "4.96", max: "/5", stars: 5, label: "5-Star Reviews: 500+" },
    experience: { title: "8+ Years of Experience", subtitle: "Started In 2018" }
};

export default function StatsBanner({ data = defaultStatsData }) {
    const statsData = {
        ...defaultStatsData,
        ...data,
        rating: { ...defaultStatsData.rating, ...data?.rating },
        experience: { ...defaultStatsData.experience, ...data?.experience },
    };

    const starCount = 
        Number.isFinite(statsData.rating.stars) && statsData.rating.stars >= 0 
            ? statsData.rating.stars 
            : 5;

    return (
        <section className="bg-[#1e0c05] py-16 md:py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

                <Reveal animation="down" className="max-w-[408px] w-full">
                    <h2 className="text-[#fdfdfd] text-center lg:text-left text-[22px] md:text-[24px] font-medium leading-[1.35] tracking-[-0.7px]">
                        {statsData.heading}
                    </h2>
                </Reveal>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-20 md:gap-[120px]">

                    <Reveal animation="scale" delay="delay-150" className="flex flex-col items-center text-center">
                        <div className="text-[#fdfdfd] text-[32px] font-medium tracking-[-1px] flex items-center">
                            {statsData.rating.score}<span className="ml-1 text-[28px] text-white/90">{statsData.rating.max}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 mb-2">
                            {[...Array(starCount)].map((_, index) => (
                                <Star key={index} className="w-[17px] h-[17px] text-[#8c863a] fill-[#8c863a]" />
                            ))}
                        </div>
                        <p className="text-[#fffaf8] text-[14px]">{statsData.rating.label}</p>
                    </Reveal>

                    <Reveal animation="scale" delay="delay-300" className="flex flex-col items-center text-center">
                        <CalendarDays className="w-10 h-10 text-[#8c863a] stroke-[1.5]" />
                        <div className="flex flex-col mt-4">
                            <h3 className="text-[#fdfdfd] text-[18px] font-semibold leading-snug">
                                {statsData.experience.title}
                            </h3>
                            <p className="text-[#fffaf8] text-[14px] mt-1 opacity-90">
                                {statsData.experience.subtitle}
                            </p>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}