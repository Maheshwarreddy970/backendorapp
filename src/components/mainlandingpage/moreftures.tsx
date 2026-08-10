import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Palette,
    FlaskConical,
    Megaphone,
    Users,
    Building,
    User,
    LayoutDashboard,
    CalendarCheck,
    Smartphone,
    ShieldCheck,
    PawPrint,
    Server,
} from 'lucide-react';


// Demo data for the categories
const featureCategories = [
  {
    icon: <LayoutDashboard size={24} />,
    title: 'Private Dashboard',
    items: [
      { text: 'Point-and-click text editing' },
      { text: 'Swap photos instantly yourself' },
      { text: 'No developer fees for basic updates' },
    ],
  },
  {
    icon: <Server size={24} />,
    title: 'Hosting & Ownership',
    items: [
      { text: 'Lifetime free cloud hosting' },
      { text: 'Zero monthly retainer fees' },
      { text: 'Full ownership & downloadable files' },
    ],
  },
  {
    icon: <CalendarCheck size={24} />,
    title: 'Seamless Bookings',
    items: [
      { text: 'Integrates with MoeGo, Square, Gingr' },
      { text: 'Funnel clients to your intake forms' },
      { text: 'Drive automated online deposits' },
    ],
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile & Speed',
    items: [
      { text: 'Lightning-fast React technology' },
      { text: '100% mobile-first layouts' },
      { text: 'Optimized for Google Core Web Vitals' },
    ],
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Tech & SEO Setup',
    items: [
      { text: 'Done-for-you domain connection' },
      { text: '301 redirects to protect your SEO' },
      { text: 'Free SSL security certificate' },
    ],
  },
  {
    icon: <PawPrint size={24} />,
    title: 'Built for Pet Care',
    items: [
      { text: 'Showcase Before & After galleries' },
      { text: 'Auto-sync live Google Reviews' },
      { text: 'Turn website visitors into clients' },
    ],
  },
];

const FeatureGridDemo = () => {
    return (
        <div className="bg-background w-full">
            <FeatureGrid
                title={
                    <>
                        Designed{' '}
                        <span className="relative inline-block">
                            for you
                            <svg
                                viewBox="0 0 120 6"
                                className="absolute left-0 bottom-0 -mb-1 w-full"
                                aria-hidden="true"
                            >
                                <path
                                    d="M1 4.5C25.46 1.63 78.43 1.39 119 4.5"
                                    stroke="#f472b6" // pink-400
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </svg>
                        </span>
                    </>
                }
                subtitle="Start from scratch or explore templates created by our community."
                illustrationSrc="https://tally.so/images/demo/v2/designed-for-you.png" // Replace with your image link
                categories={featureCategories}
                buttonText="Browse templates"
                buttonHref="#"
            />
        </div>
    );
};

export default FeatureGridDemo;

// Type definitions for the component props
interface FeatureItem {
    text: string;
    href?: string;
}

interface FeatureCategory {
    icon: React.ReactNode;
    title: string;
    items: FeatureItem[];
}

export interface FeatureGridProps {
    title: React.ReactNode;
    subtitle: string;
    illustrationSrc: string;
    illustrationAlt?: string;
    categories: FeatureCategory[];
    buttonText: string;
    buttonHref: string;
    className?: string;
}


export const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
    (
        {
            title,
            subtitle,
            illustrationSrc,
            illustrationAlt = 'Feature illustration',
            categories,
            buttonText,
            buttonHref,
            className,
        },
        ref,
    ) => {
        return (
            <section
                ref={ref}
                className={cn('max-w-container  mx-auto w-full px-4 sm:px-6 lg:px-20 ', className)}
            >


                {/* Grid Container */}
                <div
                    className="rounded-xl shadow border bg-card text-card-foreground p-6 md:p-8"

                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {categories.map((category, index) => (
                            <div
                                key={index}

                                className="flex flex-col  items-start"
                            >
                                <div className="mb-3 text-primary">{category.icon}</div>
                                <h3 className="font-semibold text-foreground mb-2">
                                    {category.title}
                                </h3>
                                <ul className="space-y-1.5 text-muted-foreground">
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="hover:text-primary hover:underline underline-offset-2 transition-colors"
                                                >
                                                    {item.text}
                                                </a>
                                            ) : (
                                                <span>{item.text}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>


                </div>
            </section>
        );
    },
);

FeatureGrid.displayName = 'FeatureGrid';