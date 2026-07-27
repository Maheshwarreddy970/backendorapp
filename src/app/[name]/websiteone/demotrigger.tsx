"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Layers, DollarSign, LayoutDashboard, ChevronRight, Sparkles } from "lucide-react";

const AUTO_OPEN_DELAY = 30_000; // 30 seconds
const SESSION_KEY = "demo-sheet-shown";

export default function DemoSideTrigger({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const basePath = `/${slug}`;

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    console.log("[DemoSideTrigger] mount. alreadyShown =", alreadyShown);

    if (alreadyShown) {
      console.log("[DemoSideTrigger] skipping auto-open, already shown this session");
      return;
    }

    console.log("[DemoSideTrigger] scheduling auto-open in 30s");
    timerRef.current = setTimeout(() => {
      console.log("[DemoSideTrigger] 30s elapsed, opening sheet");
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, AUTO_OPEN_DELAY);

    return () => {
      console.log("[DemoSideTrigger] cleanup — clearing timer");
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleManualOpen = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    sessionStorage.setItem(SESSION_KEY, "true");
    setOpen(true);
  };

  const options = [
    {
      icon: <Layers className="h-5 w-5" />,
      title: "See more templates",
      description: "12 ready-to-deploy designs across different styles.",
      href: `${basePath}#templates`,
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Check pricing",
      description: "Landing page or full booking platform — see what's included.",
      href: `${basePath}#pricing`,
    },
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "Peek at the admin dashboard",
      description: "How the booking + client management side works.",
      href: `${basePath}#dashboard`,
    },
  ];

  return (
    <>
      <button
        onClick={handleManualOpen}
        aria-label="More options"
        className="fixed left-0 animate-bounce top-1/2 z-50 -translate-y-1/2 flex items-center gap-1.5 rounded-r-xl bg-primary text-primary-foreground py-4 pl-2.5 pr-3.5 shadow-lg transition-all duration-200 hover:pl-5 hover:shadow-xl"
      >
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-medium [writing-mode:vertical-rl] rotate-180 ">
          More info
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/40" />

          <div className="px-6 pt-6">
            <SheetHeader className="text-left">
              <SheetTitle className="text-xl">Wondering what's next?</SheetTitle>
              <SheetDescription>
                This is just a design preview — here's what you can look at.
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="mt-4 px-6 space-y-3">
            {options.map((opt, i) => (
              <OptionRow key={opt.title} index={i + 1} {...opt} />
            ))}
          </div>

          <p className="mt-6 px-6 text-xs text-muted-foreground">
            Not sure which one fits? Reply on the page footer and we'll walk you through it.
          </p>
        </SheetContent>
      </Sheet>
    </>
  );
}

function OptionRow({
  index,
  icon,
  title,
  description,
  href,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    
     <a href={href}
      className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-primary/40 hover:bg-muted/60 hover:shadow-sm"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {index}
      </span>
      <div className="flex-1">
        <p className="font-medium leading-none">{title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary">
        <ChevronRight className="h-4 w-4" />
      </span>
    </a>
  );
}