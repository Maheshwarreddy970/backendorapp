import React from 'react';
import Reveal from './Reveal';
import { cn } from '@/lib/utils';

const defaultFooterData = {
    logo: {
        src: "/logomain.avif",
        alt: "Petocare Logo"
    },
    info: {
        address: "2458 Oceanview Drive, Sunnyvale, CA 94085.",
        phone: { label: "+1-587-302-7481", href: "tel:+15873027481" },
        email: { label: "hello@Petocare.com", href: "mailto:hello@Petocare.com" }
    },
    copyright: "Copyright © 2026 Petocare. All right reserved."
};

export default function Footer({ data }:any) {
    // 1. Ensure we have an object to work with (fallback to default)
    const sourceData = data || defaultFooterData;

    // 2. Safely parse and normalize nested properties
    const logoSrc = sourceData?.logo?.src || "/default-logo.png";
    const logoAlt = sourceData?.logo?.alt || "Company Logo";

    // Normalize contact info (handles both 'contact' and 'info' keys)
    const contactInfo = sourceData?.contact || sourceData?.info || {};
    const address = contactInfo?.address || "Address not provided";

    // Normalize phone (handles both string and object formats)
    const rawPhone = contactInfo?.phone;
    const phoneLabel = typeof rawPhone === 'string' ? rawPhone : rawPhone?.label || "Phone not provided";
    const phoneHref = typeof rawPhone === 'string' 
        ? `tel:${rawPhone.replace(/[^\d+]/g, '')}` 
        : rawPhone?.href || "#";

    // Normalize email (handles both string and object formats)
    const rawEmail = contactInfo?.email;
    const emailLabel = typeof rawEmail === 'string' ? rawEmail : rawEmail?.label || "Email not provided";
    const emailHref = typeof rawEmail === 'string' ? `mailto:${rawEmail}` : rawEmail?.href || "#";

    const copyrightText = sourceData?.copyright || "Copyright © 2026. All rights reserved.";
  const isBlackLogo = sourceData?.logo?.status === "approved has black";
    // Safely extract socials
    const socials = sourceData?.socials || {};

    return (
        <footer className="bg-[#FDFDFD] px-6 pt-28 pb-16 font-sans border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Grid Links Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">

                    {/* Column 1: Logo */}
                    <Reveal animation="up" delay="delay-0">
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label={`${logoAlt} Home`} className="group">
                             <img 
                                            src={logoSrc} 
                                            alt={logoAlt || "Business Logo"}
                                            className={cn(
                                              "h-14 w-auto max-w-full object-contain object-left transition-all", // Smart scaling fix
                                              isBlackLogo && "brightness-0"
                                            )} 
                                          />
                            </a>
                        </div>
                    </Reveal>

                    {/* Column 2: Quick Links */}
                    <Reveal animation="up" delay="delay-150">
                        <nav aria-label="Quick links">
                            <h4 className="text-sm font-normal text-[#625B5B] mb-5 tracking-wide">Quick Links</h4>
                            <ul className="space-y-4">
                                {[
                                    { label: "About", href: "#" },
                                    { label: "Services", href: "#" },
                                    { label: "Contact", href: "#" },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-base font-medium text-[#1E0C05] hover:text-[#847E53] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Reveal>

                    {/* Column 3: Legal */}
                    <Reveal animation="up" delay="delay-300">
                        <nav aria-label="Legal documents">
                            <h4 className="text-sm font-normal text-[#625B5B] mb-5 tracking-wide">
                                Legal
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { label: "Terms & Conditions", href: "#" },
                                    { label: "Privacy Policy", href: "#" },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-base font-medium text-[#1E0C05] hover:text-[#847E53] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Reveal>

                    {/* Column 4: Contact Info */}
                    <Reveal animation="up" delay="delay-500">
                        <div>
                            <h4 className="text-sm font-normal text-[#625B5B] mb-5 tracking-wide">Our Info</h4>
                            <address className="not-italic space-y-4 text-base font-normal text-[#1E0C05] leading-relaxed">
                                <p>{address}</p>
                                {rawPhone && (
                                    <p>
                                        <a href={phoneHref} className="hover:text-[#847E53] transition-colors">
                                            {phoneLabel}
                                        </a>
                                    </p>
                                )}
                                {rawEmail && (
                                    <p>
                                        <a href={emailHref} className="hover:text-[#847E53] transition-colors">
                                            {emailLabel}
                                        </a>
                                    </p>
                                )}
                            </address>
                        </div>
                    </Reveal>

                </div>

                {/* Bottom Bar */}
                <Reveal animation="up" delay="delay-700" className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#625B5B] text-center sm:text-left">
                        {copyrightText}
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-2.5">
                        {/* Facebook (rendered if present in either JSON) */}
                        <a href={socials.facebook || "#"} aria-label="Facebook" className="w-[26px] h-[26px] bg-[#847E53] text-white rounded-full flex items-center justify-center transition-transform hover:scale-105">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" /></svg>
                        </a>
                        
                        {/* Instagram (rendered only if present in the new JSON) */}
                        {socials.instagram && (
                            <a href={socials.instagram} aria-label="Instagram" className="w-[26px] h-[26px] bg-[#847E53] text-white rounded-full flex items-center justify-center transition-transform hover:scale-105">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                        )}

                        {/* LinkedIn (fallback) */}
                        <a href="#" aria-label="LinkedIn" className="w-[26px] h-[26px] bg-[#847E53] text-white rounded-full flex items-center justify-center transition-transform hover:scale-105">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </Reveal>

            </div>
        </footer>
    );
}