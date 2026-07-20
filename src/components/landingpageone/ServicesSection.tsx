import React from 'react';
import PetIcon from '@/icons/PetIcon';
import Bath from '@/icons/Bath';
import Scissors from '@/icons/Scissors';
import ScissorsLineDashed from '@/icons/ScissorsLineDashed';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

// Helper for class merging if @/lib/utils isn't available
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}

const defaultServicesData = {
    heading: "Services we provide",
    description: "Our awesome team treats your pets like family, whether it's a quick bath or a full-on grooming and style session.",
    services: [
        {
            title: 'Full body grooming',
            description: 'Complete pampering from head to tail—bath, dry, trim, and style all taken care of.',
            icon: PetIcon,
        },
        {
            title: 'Bath & blow dry',
            description: 'Deep cleansing bath premium a professional blow dry finish included.',
            icon: Bath,
        },
        {
            title: 'Haircut & styling',
            description: "Custom cuts and fun styles that totally match your pet's unique vibe perfectly.",
            icon: Scissors,
        },
        {
            title: 'Nail trimming',
            description: 'Safe and precise nail clipping to keep your pet comfortable and healthy always.',
            icon: ScissorsLineDashed,
        },
    ],
    cta: {
        label: "View More Services"
    }
};

const iconMappings = [
    { keywords: ['bath', 'wash', 'clean', 'soap', 'shampoo'], component: Bath },
    { keywords: ['grooming', 'groom', 'pet', 'full-service'], component: PetIcon },
    { keywords: ['cut', 'trim', 'style', 'haircut', 'scissor'], component: Scissors },
    { keywords: ['nail', 'claw', 'paw'], component: ScissorsLineDashed }
];

const fallbackIcons = [PetIcon, Bath, Scissors, ScissorsLineDashed];

const getIconForService = (service: any) => {
    if (typeof service.icon === 'function' || typeof service.icon === 'object') {
        return service.icon;
    }

    const searchString = `${service.title || ''} ${service.description || ''} ${service.iconKey || ''}`.toLowerCase();

    for (const mapping of iconMappings) {
        if (mapping.keywords.some(keyword => searchString.includes(keyword))) {
            return mapping.component;
        }
    }

    const randomIndex = (service.title?.length || 0) % fallbackIcons.length;
    return fallbackIcons[randomIndex];
};

export default function ServicesSection({ data }: any) {
    const sourceData = data || defaultServicesData;
    
    const heading = sourceData?.heading || sourceData?.tagline || defaultServicesData.heading;
    const description = sourceData?.description || defaultServicesData.description;
    const services = sourceData?.services?.length ? sourceData.services : defaultServicesData.services;
    const ctaLabel = sourceData?.cta?.label || defaultServicesData.cta.label;

    const cardDelays = ["delay-0", "delay-150", "delay-300", "delay-500"];
    const totalServices = services.length;

    // Determine grid columns and layout containers dynamically based on item count
    const getGridClasses = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1 max-w-md mx-auto";
            case 2:
                return "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto";
            case 3:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto";
            case 4:
            default:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    return (
        <section className="bg-[#fffaf8] py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Section Header */}
                <Reveal animation="down" className="flex flex-col items-center text-center max-w-[560px] mb-12 lg:mb-[72px]">
                    <h2 className="text-[#1e0c05] font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4">
                        {heading}
                    </h2>
                    <p className="text-[#625b5b] text-base md:text-[18px] leading-[1.6]">
                        {description}
                    </p>
                </Reveal>

                {/* Dynamic Services Grid */}
                <div className={cn("grid gap-6 w-full mb-12", getGridClasses(totalServices))}>
                    {services.map((service: any, index: number) => {
                        const Icon = getIconForService(service);
                        
                        return (
                            <Reveal key={index} animation="scale" delay={cardDelays[index % cardDelays.length] || "delay-700"} className="h-full">
                                <div className="group flex flex-col h-full bg-[#faf3ec] border border-[#ece5de] rounded-2xl p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                    
                                    {/* Icon */}
                                    <div className="mb-[37px]">
                                        <Icon className="w-11 h-11 text-[#1e0c05] stroke-[1.5]" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow justify-between gap-[30px]">
                                        <div>
                                            <h3 className="text-[#1e0c05] font-medium text-[20px] leading-[1.2] tracking-[-0.5px] mb-[10px]">
                                                {service.title || "Pet Service"}
                                            </h3>
                                            <p className="text-[#625b5b] text-[14px] leading-[1.48]">
                                                {service.description || "Description not available."}
                                            </p>
                                        </div>

                                        {/* Optional Price Label */}
                                        {service.priceLabel && (
                                            <div className="text-[#8a4e2f] font-semibold text-sm mb-2">
                                                {service.priceLabel}
                                            </div>
                                        )}

                                        {/* Learn More Link */}
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-2 text-[#1e0c05] font-medium text-[16px] group-hover:text-[#a35c38] transition-colors mt-auto"
                                        >
                                            Learn More
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* View More Button */}
                <Reveal animation="up" delay="delay-200">
                    <button className="group relative bg-[#a35c38] text-white rounded-2xl py-3.5 px-6 flex items-center justify-center gap-2.5 w-fit overflow-hidden hover:bg-[#8a4e2f] transition-all duration-300">
                        <span className="font-medium text-[16px] whitespace-nowrap">
                            {ctaLabel}
                        </span>
                        <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                    </button>
                </Reveal>

            </div>
        </section>
    );
}