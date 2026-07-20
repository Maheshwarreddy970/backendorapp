import { Mail, Map, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const socials = [
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaFacebookF, href: "#", label: "Facebook" }
];
const defaultFooterData = {
    tagline: "Trusted pet care for a\nhealthier, happier life.",
   
    contact: {
        title: "Contact Us",
        address: "Amsterdam Netherlands",
        phone: "+1 23 45 67 890",
        email: "info@pawsy.com"
    },
    copyright: "©2026 Pawsy. All rights reserved."
};

export default function Footer({ data = defaultFooterData ,logo}:any) {
    return (
        <footer className="bg-gradient-to-b from-white to-[#E7EBFC] px-4 py-10">
            <div
                className="mx-auto w-full rounded-3xl bg-cover bg-center px-8 py-12 lg:px-16"
                style={{
                    backgroundImage: `url('/YaDj5qGDKZG2c6V9SyodRKc4.avif')`,
                }}
            >
                <div className="flex flex-col justify-between gap-12">
                    <div className="flex flex-col justify-between gap-12 lg:flex-row">
                        {/* Left Side */}
                        <div className="space-y-10">
                            <div>
                                <img src={logo.src} alt={logo.alt} className="h-10 w-10 text-black" />
                                <p className="mt-3 max-w-xs whitespace-pre-line text-base text-zinc-900">
                                    {data.tagline}
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                {socials.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="text-zinc-900 hover:opacity-80 transition-opacity"
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="grid gap-12 sm:grid-cols-2">
                            {/* Navigation */}
                            <div>
                                <h3 className="mb-4 text-lg font-medium text-zinc-600">
                                    Navigation
                                </h3>

                                <ul className="space-y-3 text-[17px] text-zinc-900">
                                    {[
                                        { label: "About Us", href: "#" },
                                        { label: "Why Us", href: "#" },
                                        { label: "Services", href: "#" },
                                        { label: "How It Works", href: "#" },
                                        { label: "Reviews", href: "#" },
                                        { label: "Error 404", href: "#" }
                                    ].map((link, index) => (
                                        <li key={index}>
                                            <a href={link.href} className="hover:underline">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="mb-4 text-lg font-medium text-zinc-600">
                                    {data.contact.title}
                                </h3>

                                <div className="space-y-4">
                                    {data.contact.address && (
                                        <div className="flex items-center gap-3">
                                            <Map className="h-5 w-5" />
                                            <span className="text-[17px] text-zinc-900">
                                                {data.contact.address}
                                            </span>
                                        </div>
                                    )}

                                    {data.contact.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5" />
                                            <a href={`tel:${data.contact.phone}`} className="text-[17px] text-zinc-900 hover:underline">
                                                {data.contact.phone}
                                            </a>
                                        </div>
                                    )}

                                    {data.contact.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5" />
                                            <a href={`mailto:${data.contact.email}`} className="text-[17px] text-zinc-900 hover:underline">
                                                {data.contact.email}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-zinc-200 pt-6">
                        <p className="text-sm text-zinc-600">
                            {data.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}