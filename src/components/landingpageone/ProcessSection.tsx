import React from 'react';
import Reveal from './Reveal';

const defaultProcessData = {
    heading: "We make it simple",
    description: (
        <>At Petocare, we truly value your time and your pet's comfort. <br className="hidden sm:block" /> Our process ensures a smooth experience.</>
    ),
    steps: [
        {
            id: "01",
            title: "Book your appointment",
            description: "Pick the service you want and book a convenient time that suits you—online anytime, day or night.",
            image: "/1.avif",
        },
        {
            id: "02",
            title: "Drop off your pet",
            description: "Drop by our friendly studio with your pet at your appointment time & say hi to your groomer.",
            image: "/2.jpg",
        },
        {
            id: "03",
            title: "Pick up a happy pet",
            description: "Grab your freshly groomed, happy pup and enjoy the awesome, lasting results of our expert care!",
            image: "/3.jpg",
        }
    ]
};

export default function ProcessSection({ data = defaultProcessData }) {
    return (
        <section className="bg-[#fffaf8] py-20 w-full overflow-hidden">
            <div className="mx-auto px-6 md:px-12 flex flex-col items-center relative">

                {/* Header (Slides Down) */}
                <Reveal animation="down">
                    <div className="flex flex-col items-center text-center max-w-[537px] mx-auto mb-16 lg:mb-[96px]">
                        <h2 className="text-[#1e0c05] font-medium text-4xl md:text-[56px] leading-[1.3] tracking-[-2px] mb-4">
                            {data.heading}
                        </h2>
                        <p className="text-[#625b5b] text-base md:text-[18px] leading-[1.6]">
                            {data.description}
                        </p>
                    </div>
                </Reveal>

                {/* Timeline Container */}
                <div className="relative w-full max-w-[1064px] mx-auto">

                    {/* Central Vertical Line (Desktop Only) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#a35c38] via-[#a35c38] to-[#ece5de] -translate-x-1/2 rounded-full" />

                    {/* Steps */}
                    <div className="flex flex-col gap-16 lg:gap-[116px] relative">
                        {data.steps.map((step, index) => {
                            const isEven = index % 2 !== 0;

                            return (
                                <div
                                    key={step.id}
                                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-[116px] w-full ${
                                        isEven ? 'lg:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Half Container: Image */}
                                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                                        {/* Even rows slide right, odd rows slide left */}
                                        <Reveal animation={isEven ? "right" : "left"} className="w-full max-w-[474px]">
                                            <div className="relative w-full aspect-[474/284] rounded-2xl overflow-hidden shadow-sm">
                                                {index === 0 && <img
                                                    src="/1.avif"
                                                    alt={step.title}
                                                    className="object-cover w-full h-full"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                }
                                                {
                                                    index === 1 && <img
                                                    src="/2.jpg"
                                                    alt={step.title}
                                                    className="object-cover w-full h-full"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                }
                                                {
                                                    index === 2 && <img
                                                    src="/3.jpg"
                                                    alt={step.title}
                                                    className="object-cover w-full h-full"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                }
                                             
                                            </div>
                                        </Reveal>
                                    </div>

                                    {/* Center Dot (Desktop Only) */}
                                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#a35c38] rounded-full z-10 border-4 border-[#fffaf8] shadow-sm" />

                                    {/* Half Container: Text Content */}
                                    <div className={`w-full lg:w-1/2 flex flex-col justify-center ${
                                        isEven ? 'lg:items-end lg:text-right' : 'lg:items-start text-left'
                                    }`}>
                                        {/* Text entries slide in opposite to their image counterpart */}
                                        <Reveal animation={isEven ? "left" : "right"} delay="delay-150" className="w-full max-w-[474px]">
                                            <div className="flex flex-col">
                                                {/* Step Badge */}
                                                <div className={`mb-4 inline-flex px-3 py-1.5 bg-[#faf3ec] border border-[#ece5de] rounded-[10px] w-fit ${isEven ? 'lg:ml-auto' : ''}`}>
                                                    <span className="text-[#1e0c05] font-medium text-[14px]">
                                                        Step {step.id}
                                                    </span>
                                                </div>

                                                {/* Step Title & Description */}
                                                <h3 className="text-[#1e0c05] font-medium text-[24px] md:text-[30px] leading-[1.28] tracking-[-1px] mb-3">
                                                    {step.title}
                                                </h3>
                                                <p className="text-[#625b5b] text-[16px] md:text-[18px] leading-[1.6]">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </Reveal>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}