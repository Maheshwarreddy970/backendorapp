import React from 'react';
import Image from 'next/image';
import { Star, Smile } from 'lucide-react';
import Reveal from './Reveal';

const FiveStars = ({ light = false }: { light?: boolean }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-[18px] h-[18px] ${light ? 'text-white fill-white' : 'text-[#8c863a] fill-[#8c863a]'}`}
            />
        ))}
    </div>
);

const fallbackStatImageCard = {
    type: 'stat-image',
    image: '/gos.avif',
    heading: '1200+',
    subtext: 'Happy Pets Delivered Quarterly'
};

const defaultReviewsData = {
    heading: "The reviews say it all",
    description: "Our rating truly speaks for itself — but the words behind it speak even louder and clearer, expressing our commitment.",
    columns: {
        col1: [
            {
                type: 'review',
                name: 'David Chen',
                role: 'Dog Owner',
                avatar: '/p1.avif',
                text: '“I was kinda nervous about taking Luna for grooming, but Petocare totally relaxed her and made the experience enjoyable.”'
            },
            {
                type: 'stat-numeric',
                score: '4.96',
                scale: '/5',
                subtext: '5-Star Reviews: 500+'
            }
        ],
        col2: [
            {
                type: 'review',
                name: 'James Thornton',
                role: 'Cat Owner',
                avatar: '/p2.avif',
                text: '“Petocare truly transformed my golden retriever, Max! He looked amazing, was happy the whole time, and their exceptional care and professionalism far surpass any other groomers I\'ve tried.”'
            }
        ],
        col3: [
            fallbackStatImageCard,
            {
                type: 'review',
                name: 'Marcus Williams',
                role: 'Cat Owner',
                avatar: '/p3.avif',
                text: '“As someone who owns three dogs I need a groomer I can fully trust.”'
            }
        ]
    }
};

// Helper renderer for individual card types
const CardRenderer = ({ card }: { card: any }) => {
    if (card.type === 'stat-numeric') {
        return (
            <div className="bg-[#a35c38] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
                <h3 className="text-[#fdfdfd] font-medium text-[48px] tracking-[-1px] mb-4">
                    {card.score}<span className="text-[36px]">{card.scale}</span>
                </h3>
                <FiveStars light />
                <p className="text-[#fdfdfd] text-[14px] mt-3 opacity-90 font-medium">{card.subtext}</p>
            </div>
        );
    }

    if (card.type === 'stat-image') {
        return (
            <div className="relative rounded-2xl overflow-hidden min-h-[280px] bg-gray-900 group">
                {card.image && (
                    <Image
                        src={card.image}
                        alt={card.subtext || 'Stat Image'}
                        fill
                        className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                    <Smile className="w-12 h-12 text-white mb-4" strokeWidth={1.5} />
                    <h3 className="text-white font-medium text-[40px] tracking-tight mb-1">{card.heading}</h3>
                    <p className="text-white text-[16px] font-medium">{card.subtext}</p>
                </div>
            </div>
        );
    }

    // Default 'review' card
    return (
        <div className="bg-[#faf3ec] border border-[#ece5de] rounded-2xl p-8 flex flex-col justify-between min-h-[280px] h-full">
            <div>
                <FiveStars />
                <p className="text-[#625b5b] text-[16px] leading-[1.6] mt-6">{card.text}</p>
            </div>
            <div className="flex items-center gap-4 mt-8">
                {card.avatar && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={card.avatar} alt={card.name || ''} fill className="object-cover" />
                    </div>
                )}
                <div>
                    <h4 className="text-[#1e0c05] font-medium text-[16px]">{card.name || 'Anonymous Client'}</h4>
                    <p className="text-[#625b5b] text-[14px]">{card.role || 'Pet Parent'}</p>
                </div>
            </div>
        </div>
    );
};

export default function ReviewsSection({ data = defaultReviewsData }: { data?: any }) {
    // 1. Merge top-level data safely
    const heading = data?.heading || defaultReviewsData.heading;
    const description = data?.description || defaultReviewsData.description;

    const rawCols = data?.columns || defaultReviewsData.columns;

    // 2. Extract columns with fallbacks
    let col1 = [...(rawCols?.col1 || [])];
    let col2 = [...(rawCols?.col2 || [])];
    let col3 = [...(rawCols?.col3 || [])];

    // 3. Ensure the `stat-image` card is present in at least one column
    const allCards = [...col1, ...col2, ...col3];
    const hasStatImage = allCards.some((card) => card.type === 'stat-image');

    if (!hasStatImage) {
        // Prepend the stat image card to col3 if missing
        col3 = [fallbackStatImageCard, ...col3];
    }

    const columns = [col1, col2, col3];

    return (
        <section className="bg-[#fffaf8] py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">

                {/* Header Section */}
                <Reveal animation="down" className="flex flex-col items-center text-center max-w-[614px] mb-12 lg:mb-16">
                    <h2 className="text-[#1e0c05] font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4">
                        {heading}
                    </h2>
                    <p className="text-[#625b5b] text-base md:text-[18px] leading-[1.6]">
                        {description}
                    </p>
                </Reveal>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {columns.map((colCards, colIdx) => (
                        <div key={`col-${colIdx}`} className="flex flex-col gap-6">
                            {colCards.map((card, cardIdx) => (
                                <Reveal
                                    key={`col${colIdx}-${cardIdx}`}
                                    animation="scale"
                                    delay={`delay-${(colIdx * 150 + cardIdx * 200) % 700}`}
                                    className={card.type === 'review' && colCards.length === 1 ? 'h-full' : ''}
                                >
                                    <CardRenderer card={card} />
                                </Reveal>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}