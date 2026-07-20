"use client";

import React from 'react';
import { cn } from "@/lib/utils"; // Ensure you have this utility imported
import { useInView } from "react-intersection-observer";

const defaultNavbarData = {
    logo: {
        src: "/logomain.avif",
        alt: "Petocare Logo",
        href: "/",
        status: ""
    },
    contact: {
        phone: "084-304-3950",
        href: "tel:0843043950"
    }
};

export default function Navbar({ data = defaultNavbarData }) {
    // Scroll detection
    const { ref, inView } = useInView({ threshold: 0, initialInView: true });
    const isScrolled = !inView;

    // Safely grab the logo and check status
    const logo = data.logo || defaultNavbarData.logo;
    const isBlackLogo = logo.status === "approved has black";

    return (
        <>
            {/* Invisible element at the very top to detect scrolling */}
            <div ref={ref} className="absolute top-0 left-0 w-full h-5 pointer-events-none" />

            <header 
                className={cn(
                    "w-full px-6 font-sans fixed top-0 left-0 z-50 transition-all duration-300 animate-slide-down-fade",
                    isScrolled 
                        ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm border-b border-zinc-200/50" 
                        : "pt-6 pb-4 bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Scalable & Overflow Hidden Logo Wrapper */}
                    <a href={logo.href || "/"} aria-label={logo.alt} className="group relative flex items-center justify-start overflow-hidden w-48 h-14">
                        {logo.src && (
                            <img
                                src={logo.src}
                                alt={logo.alt || "Logo"}
                                className={cn(
                                    "h-full w-auto max-w-full object-contain object-left transition-all", // Smart scaling based on size
                                    isBlackLogo && "brightness-0" // Turns image black if status matches
                                )}
                            />
                        )}
                    </a>

                    {/* Main Navigation */}
                    <nav className="hidden md:flex items-center gap-7 bg-[#FDFDFD]/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-sm" aria-label="Main Navigation">
                        <a href="#" className="flex items-center gap-1.5 text-base font-medium text-[#1E0C05] hover:opacity-70 transition-opacity">
                            All Pages
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="M12 5v14" />
                            </svg>
                        </a>

                        {[
                            { id: 'about', label: "About", href: "#" },
                            { id: 'service', label: "Service", href: "#" },
                            { id: 'blog', label: "Blog", href: "#" }
                        ].map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                className="text-base font-medium text-[#1E0C05] hover:opacity-70 transition-opacity"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Contact Button */}
                    <div className="hidden sm:flex">
                        <a href={data.contact?.href || "#"} className="flex items-center gap-2.5 bg-[#1E0C05] text-[#FDFDFD] px-6 py-3.5 rounded-2xl hover:bg-[#3b2015] transition-colors shadow-md">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className="text-base font-medium tracking-wide">Call us: {data.contact?.phone}</span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-[#1E0C05] hover:bg-[#FDFDFD]/40 rounded-lg transition-colors" aria-label="Toggle Menu">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                </div>
            </header>
        </>
    );
}