'use client';

import Image from "next/image";
import { PawPrint } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const defaultAboutData = {
  label: "About us",
  heading: <>Trusted care that treats your <br /> pet like one of our own</>,
  description: "From checkups to treatments, we provide attentive, compassionate care that supports your pet's well-being every step of the way.",
};

const cards = [
  {
    src: "/OsueP7KJmSKkVV7OAeeUDKT3Feo.avif",
    alt: "Pet owner smiling"
  },
  {
    src: "/OHqEcD2usoRAhLXbVxuDv9nN4.avif",
    alt: "Dog and owner"
  },
  {
    src: "/YAZnBkBG3wKGjlW980PFrfWoaZ0.avif",
    alt: "Dog hiking"
  }
]
export default function AboutSection({ data = defaultAboutData }) {
  // Observer for the text header area
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Observer for the image section
  const { ref: cardsRef, inView: cardsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="pt-24 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="mx-auto max-w-3xl px-4 text-center">
        {/* Label */}
        <div className={cn(
          "mb-4 flex items-center justify-center gap-2 transition-all duration-700 ease-out transform",
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <PawPrint className="h-6 w-6 fill-[#FFC357] text-[#FFC357]" />
          <span className="text-lg text-zinc-800">{data.label}</span>
        </div>

        {/* Heading */}
        <h2 className={cn(
          "text-4xl md:text-5xl font-medium leading-tight text-zinc-900 transition-all duration-700 delay-100 ease-out transform",
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          {data.heading}
        </h2>

        {/* Description */}
        <p className={cn(
          "mx-auto mt-6 max-w-2xl text-zinc-500 transition-all duration-700 delay-200 ease-out transform",
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          {data.description}
        </p>
      </div>

      {/* Image Section */}
      <div ref={cardsRef} className="mt-52 relative">
        <div className="mx-auto max-w-7xl px-6 z-20 relative">
          <div className="-translate-y-20 flex flex-col items-center justify-center gap-8 md:flex-row">
            
            {/* Left Card */}
            {cards?.[0] && (
              <div className={cn(
                "relative h-[320px] w-[240px] overflow-hidden rounded-3xl transition-all duration-1000 ease-out transform",
                cardsInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}>
                <Image
                  src={cards[0].src}
                  alt={cards[0].alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            )}

            {/* Center Card */}
            {cards?.[1] && (
              <div className={cn(
                "relative h-[460px] w-[340px] overflow-hidden rounded-3xl shadow-xl transition-all duration-1000 delay-150 ease-out transform",
                cardsInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
              )}>
                <Image
                  src={cards[1].src}
                  alt={cards[1].alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            )}

            {/* Right Card */}
            {cards?.[2] && (
              <div className={cn(
                "relative h-[320px] w-[240px] overflow-hidden rounded-3xl transition-all duration-1000 delay-300 ease-out transform",
                cardsInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}>
                <Image
                  src={cards[2].src}
                  alt={cards[2].alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            )}

          </div>
        </div>
        
        {/* Yellow bottom area */}
        <div className="h-40 md:h-52 -z-10 rounded-t-[40px] bg-[#FFC357] absolute bottom-0 left-0 right-0 z-10" />
      </div>
    </section>
  );
}