import { Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black px-6 selection:bg-black selection:text-white font-[family-name:var(--font-inter)]">
      <div className="text-center max-w-md">
        {/* Stealth Heading */}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          NexPetCare
        </h1>
        
        {/* Ultra-simple subtext */}
        <p className="mt-4 text-base font-medium">
          Need a website?
        </p>
        
        {/* Mailto Button (Inverts on hover) */}
        <a
          href="mailto:nexpetcare@gmail.com?subject=I'm interested in a custom grooming website"
          className="mt-8 group inline-flex items-center justify-center gap-2.5 border-2 border-black bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
        >
          <Mail className="h-4 w-4" />
          Contact us
        </a>
      </div>
    </main>
  );
}