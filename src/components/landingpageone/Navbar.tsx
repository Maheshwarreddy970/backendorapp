"use client";

import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Home, Briefcase, Calendar, Dog, User } from "lucide-react";
import PawIcon from "@/icons/icon1"; // Fallback icon
import { cn } from "@/lib/utils";

const defaultNavbarData = {
  logo: { src: "", alt: "Logo", status: "" },
  navLinks: [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/bookings", label: "Bookings", icon: Calendar },
    { href: "/pets", label: "Pets", icon: Dog },
    { href: "/profile", label: "Profile", icon: User },
  ],
  cta: {
    label: "Schedule a visit",
    href: "/services"
  }
};

export default function Navbar({ data = defaultNavbarData }) {
  const pathname = usePathname();
  const { ref, inView } = useInView({ threshold: 0, initialInView: true });
  const isScrolled = !inView;

  const logo = data.logo || defaultNavbarData.logo;
  const isBlackLogo = logo.status === "approved_as_black";

  return (
    <>
      <div ref={ref} className="hidden sm:absolute top-0 left-0 w-full h-5 pointer-events-none" />

      {/* DESKTOP TOP NAVIGATION */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50">
        <div className={`px-6 md:px-12 lg:px-24 xl:px-40 py-3 flex items-center justify-between relative transition-all duration-300 ${
            isScrolled ? "bg-black/10 backdrop-blur-3xl" : "bg-transparent backdrop-blur-none"
          }`}
        >
          {/* Scalable Logo Wrapper */}
          <a href="/" className="relative flex items-center justify-start w-40 h-12">
            {logo.src ? (
              <img 
                src={logo.src} 
                alt={logo.alt || "Business Logo"} 
                className={cn(
                  "h-full w-auto max-w-full object-contain object-left transition-all", // Smart scaling fix
                  isBlackLogo && "brightness-0"
                )} 
              />
            ) : (
              <PawIcon className="h-11 w-11 text-[#FFC357]" />
            )}
          </a>

          {/* Desktop Navigation Menu */}
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
            {(data.navLinks || defaultNavbarData.navLinks).map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    isActive ? "bg-white border border-zinc-200 font-medium text-zinc-800 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <a href={data.cta?.href || "/"} className="flex items-center gap-2.5 bg-[#FFC357] text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer transition-transform hover:scale-105">
            {data.cta?.label || "Schedule a visit"}
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* MOBILE TOP HEADER */}
      <div className={`fixed top-0 left-0 w-full z-40 p-4 transition-all duration-300 md:hidden ${
          isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}>
        <a href="/" className="relative flex items-center w-32 h-10">
          {logo.src ? (
            <img 
              src={logo.src} 
              alt={logo.alt || "Business Logo"} 
              className={cn(
                "h-full w-auto max-w-full object-contain object-left transition-all", // Smart scaling fix
                isBlackLogo && "brightness-0"
              )} 
            />
          ) : (
            <PawIcon className="h-10 w-10 text-[#FFC357]" />
          )}
        </a>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed inset-x-0 bottom-4 mx-auto z-50 w-fit bg-white border border-zinc-200 rounded-full flex items-center p-2 shadow-xl space-x-1">
        {(data.navLinks || defaultNavbarData.navLinks).map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <a key={link.href} href={link.href} className={`flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] ${
                isActive ? "bg-zinc-100 text-zinc-900 gap-2" : "bg-transparent text-zinc-500 hover:bg-zinc-50"
              }`}
            >
              <Icon size={22} strokeWidth={2} className="flex-shrink-0" />
              <div className="overflow-hidden flex items-center transition-all duration-300"
                style={{ width: isActive ? "68px" : "0px", opacity: isActive ? 1 : 0, marginLeft: isActive ? "4px" : "0px" }}>
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