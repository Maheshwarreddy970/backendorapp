"use client";

import PawIcon from "@/icons/icon1"; // Your custom logo
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Home, Briefcase, Calendar, Dog, User } from "lucide-react";

// Nav config mapped to your actual app routes, adding Lucide icons for mobile
const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/bookings", label: "Bookings", icon: Calendar },
  { href: "/pets", label: "Pets", icon: Dog },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  
  // Replace window.addEventListener scroll with Intersection Observer
  // Placing an invisible element at the top detects when we've scrolled down
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  const isScrolled = !inView;

  return (
    <>
      {/* Invisible anchor at the very top of the page to track scroll state */}
      <div ref={ref} className=" hidden sm:absolute top-0 left-0 w-full h-5 pointer-events-none" />

      {/* =========================================
          DESKTOP TOP NAVIGATION (Hidden on Mobile)
          ========================================= */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50">
        <div
          className={`px-6 md:px-12 lg:px-24 xl:px-40 py-3 flex items-center justify-between relative transition-all duration-300 ${
            isScrolled
              ? "bg-black/10 backdrop-blur-3xl"
              : "bg-transparent backdrop-blur-none"
          }`}
        >
          {/* Logo */}
          <a href="/">
            <PawIcon className="h-11 w-11 text-[#FFC357]" />
          </a>

          {/* Desktop Navigation Menu */}
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-white border border-zinc-200 font-medium text-zinc-800 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="/services"
            className="flex items-center gap-2.5 bg-[#FFC357] text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer transition-transform hover:scale-105"
          >
            Schedule a visit
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* =========================================
          MOBILE TOP HEADER (Visible only on Mobile)
          ========================================= */}
      <div className={`hidden fixed top-0 left-0 w-full z-40 p-4 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}>
        <a href="/">
          <PawIcon className="h-10 w-10 text-[#FFC357]" />
        </a>
      </div>

      {/* =========================================
          MOBILE BOTTOM NAVIGATION (Visible only on Mobile)
          ========================================= */}
      <nav 
        className="md:hidden fixed inset-x-0 bottom-4 mx-auto z-50 w-fit bg-white border border-zinc-200 rounded-full flex items-center p-2 shadow-xl space-x-1"
        aria-label="Bottom Navigation"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 gap-2"
                  : "bg-transparent text-zinc-500 hover:bg-zinc-50"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={2}
                aria-hidden
                className="transition-colors duration-200 flex-shrink-0"
              />

              {/* CSS Animated Label (Replaces Framer Motion) */}
              <div
                className="overflow-hidden flex items-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  width: isActive ? "68px" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "4px" : "0px",
                }}
              >
                <span className="font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
                  {link.label}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </>
  );
}