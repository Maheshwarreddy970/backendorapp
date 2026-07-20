'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { PawPrintIcon } from "lucide-react";

// Define interface for full type safety with optional nested properties
interface ContactData {
  heading?: string;
  subText?: string;
  sideImage?: { src?: string; alt?: string; badgeText?: string };
  formHeading?: string;
  services?: string[];
  ctaLabel?: string;
}

const defaultContactData = {
  heading: "Get in touch with our pet care experts",
  subText: "Exceptional care and wellness services designed to keep pets thriving.",
  sideImage: {
   
    badgeText: "Your pet's comfort, health, and happiness.",
  },
  formHeading: "Send us a message",
  services: ["Pet Grooming", "Veterinary Care", "Pet Boarding", "Training"],
  ctaLabel: "Submit"
};

export default function ContactSection({ data }: { data?: ContactData }) {
  // Safely merge incoming data with fallback defaults
  const mergedData = {
    heading: data?.heading ?? defaultContactData.heading,
    subText: data?.subText ?? defaultContactData.subText,
    sideImage: {
   
      badgeText: data?.sideImage?.badgeText ?? defaultContactData.sideImage.badgeText,
    },
    formHeading: data?.formHeading ?? defaultContactData.formHeading,
    services: data?.services ?? defaultContactData.services,
    ctaLabel: data?.ctaLabel ?? defaultContactData.ctaLabel,
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    breed: "",
    dob: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
  };

  return (
    <section ref={ref} className="bg-white py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="space-y-8">
            <h2 className={cn(
              "max-w-lg text-4xl md:text-5xl font-semibold text-zinc-800 leading-tight transition-all duration-700 ease-out transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}>
              {mergedData.heading}
            </h2>

            <div className={cn(
              "overflow-hidden rounded-[40px] transition-all duration-1000 delay-150 ease-out transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div
                className="relative h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(/DhxpPNyvDS30ZM9WEMahhQ1PY.avif)`,
                }}
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between rounded-full bg-white p-3 shadow-lg">
                    <p className="max-w-xs text-sm text-zinc-500">
                      {mergedData.sideImage.badgeText}
                    </p>

                    <PawPrintIcon className="h-10 w-10 fill-black bg-[#FFC357] p-1.5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <p className={cn(
              "text-zinc-600 transition-all duration-700 delay-300 ease-out transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              {mergedData.subText}
            </p>
          </div>

          {/* Right Side - Interactive Form */}
          <div className={cn(
            "rounded-[32px] bg-[#FFEEF5] p-8 md:p-10 transition-all duration-1000 delay-200 ease-out transform",
            inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
          )}>
            <h3 className="mb-8 text-3xl font-semibold text-zinc-800">
              {mergedData.formHeading}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-800">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-800">
                    Services
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500 bg-white"
                  >
                    <option value="">Select a service</option>
                    {mergedData.services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-800">
                    Type & Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="Enter your pet's breed"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your pet..."
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#FFC357] py-4 font-medium text-zinc-900 transition hover:opacity-90 transform active:scale-[0.99] duration-200"
              >
                {mergedData.ctaLabel}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}