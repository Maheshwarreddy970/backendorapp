// components/ComparisonTable.tsx

import type { ReactNode } from "react";

/* ---------------------------------- Icons --------------------------------- */

function CheckIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={20} height={20} rx={10} fill="#12A113" />
      <path d="M14 7L8.5 12.5L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM11.2499 7.75C11.2499 7.34 11.5899 7 11.9999 7C12.4099 7 12.7499 7.34 12.7499 7.75V13C12.7499 13.41 12.4099 13.75 11.9999 13.75C11.5899 13.75 11.2499 13.41 11.2499 13V7.75ZM12.9199 16.63C12.8699 16.75 12.7999 16.86 12.7099 16.96C12.5199 17.15 12.2699 17.25 11.9999 17.25C11.8699 17.25 11.7399 17.22 11.6199 17.17C11.4899 17.12 11.3899 17.05 11.2899 16.96C11.1999 16.86 11.1299 16.75 11.0699 16.63C11.0199 16.51 10.9999 16.38 10.9999 16.25C10.9999 15.99 11.0999 15.73 11.2899 15.54C11.3899 15.45 11.4899 15.38 11.6199 15.33C11.9899 15.17 12.4299 15.26 12.7099 15.54C12.7999 15.64 12.8699 15.74 12.9199 15.87C12.9699 15.99 12.9999 16.12 12.9999 16.25C12.9999 16.38 12.9699 16.51 12.9199 16.63Z" fill="#FFBC00" />
    </svg>
  );
}

const icons = {
  approach: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.7513 2.5L6.66797 7.5L10.0013 18.3333L13.3346 7.5L11.2513 2.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.1682 2.5C14.427 2.5 14.6822 2.56024 14.9136 2.67595C15.145 2.79167 15.3463 2.95967 15.5016 3.16667L18.0016 6.5C18.216 6.78597 18.3328 7.13329 18.3347 7.49071C18.3367 7.84813 18.2237 8.19671 18.0124 8.485L11.3541 17.64C11.1997 17.8546 10.9965 18.0293 10.7613 18.1499C10.526 18.2705 10.2655 18.3333 10.0012 18.3333C9.73683 18.3333 9.47629 18.2705 9.24105 18.1499C9.00581 18.0293 8.80262 17.8546 8.64825 17.64L1.98991 8.485C1.77875 8.19662 1.6659 7.84799 1.668 7.49057C1.6701 7.13316 1.78705 6.78588 2.00158 6.5L4.49991 3.16917C4.65506 2.96149 4.85652 2.79286 5.08827 2.6767C5.32002 2.56053 5.57568 2.50003 5.83491 2.5H14.1682Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.66797 7.5H18.3346" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  process: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16.6641V18.3307" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 1.66406V3.33073" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.168 16.6641V18.3307" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.168 1.66406V3.33073" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.66797 10H3.33464" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.66797 14.1641H3.33464" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.66797 5.83594H3.33464" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.668 10H18.3346" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.668 14.1641H18.3346" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.668 5.83594H18.3346" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.83203 16.6641V18.3307" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.83203 1.66406V3.33073" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.9987 3.33594H4.9987C4.07822 3.33594 3.33203 4.08213 3.33203 5.0026V15.0026C3.33203 15.9231 4.07822 16.6693 4.9987 16.6693H14.9987C15.9192 16.6693 16.6654 15.9231 16.6654 15.0026V5.0026C16.6654 4.08213 15.9192 3.33594 14.9987 3.33594Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5013 6.66406H7.5013C7.04106 6.66406 6.66797 7.03716 6.66797 7.4974V12.4974C6.66797 12.9576 7.04106 13.3307 7.5013 13.3307H12.5013C12.9615 13.3307 13.3346 12.9576 13.3346 12.4974V7.4974C13.3346 7.03716 12.9615 6.66406 12.5013 6.66406Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  designPhilosophy: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0013 5.83073C11.1519 5.83073 12.0846 4.89799 12.0846 3.7474C12.0846 2.5968 11.1519 1.66406 10.0013 1.66406C8.85071 1.66406 7.91797 2.5968 7.91797 3.7474C7.91797 4.89799 8.85071 5.83073 10.0013 5.83073Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 5.25L5.25 8.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.7513 12.0807C4.9019 12.0807 5.83464 11.148 5.83464 9.9974C5.83464 8.8468 4.9019 7.91406 3.7513 7.91406C2.60071 7.91406 1.66797 8.8468 1.66797 9.9974C1.66797 11.148 2.60071 12.0807 3.7513 12.0807Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.83203 10H14.1654" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.2513 12.0807C17.4019 12.0807 18.3346 11.148 18.3346 9.9974C18.3346 8.8468 17.4019 7.91406 16.2513 7.91406C15.1007 7.91406 14.168 8.8468 14.168 9.9974C14.168 11.148 15.1007 12.0807 16.2513 12.0807Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 14.75L14.75 11.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.0013 18.3307C11.1519 18.3307 12.0846 17.398 12.0846 16.2474C12.0846 15.0968 11.1519 14.1641 10.0013 14.1641C8.85071 14.1641 7.91797 15.0968 7.91797 16.2474C7.91797 17.398 8.85071 18.3307 10.0013 18.3307Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  devStack: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 6.67017C17.4997 6.37789 17.4225 6.09084 17.2763 5.8378C17.13 5.58476 16.9198 5.37463 16.6667 5.2285L10.8333 1.89517C10.58 1.74889 10.2926 1.67188 10 1.67188C9.70744 1.67188 9.42003 1.74889 9.16667 1.89517L3.33333 5.2285C3.08022 5.37463 2.86998 5.58476 2.72372 5.8378C2.57745 6.09084 2.5003 6.37789 2.5 6.67017V13.3368C2.5003 13.6291 2.57745 13.9162 2.72372 14.1692C2.86998 14.4222 3.08022 14.6324 3.33333 14.7785L9.16667 18.1118C9.42003 18.2581 9.70744 18.3351 10 18.3351C10.2926 18.3351 10.58 18.2581 10.8333 18.1118L16.6667 14.7785C16.9198 14.6324 17.13 14.4222 17.2763 14.1692C17.4225 13.9162 17.4997 13.6291 17.5 13.3368V6.67017Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.75 5.83594L10 10.0026L17.25 5.83594" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.3333V10" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  communication: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.49438 13.6155C2.61691 13.9246 2.64419 14.2633 2.57271 14.588L1.68521 17.3296C1.65661 17.4687 1.66401 17.6127 1.70669 17.7481C1.74937 17.8835 1.82593 18.0057 1.9291 18.1032C2.03227 18.2007 2.15864 18.2702 2.29621 18.3052C2.43379 18.3401 2.57801 18.3394 2.71521 18.303L5.55938 17.4713C5.86581 17.4105 6.18315 17.4371 6.47521 17.548C8.2547 18.379 10.2705 18.5548 12.167 18.0444C14.0635 17.534 15.7188 16.3702 16.8408 14.7583C17.9628 13.1464 18.4795 11.19 18.2996 9.23426C18.1198 7.27855 17.255 5.4492 15.8578 4.06897C14.4606 2.68874 12.6208 1.84634 10.663 1.69039C8.70526 1.53444 6.75532 2.07496 5.15725 3.21659C3.55917 4.35822 2.41565 6.02759 1.92846 7.93017C1.44126 9.83275 1.64169 11.8463 2.49438 13.6155Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66797 10H6.6763" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10H10.0083" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.332 10H13.3404" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  support: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.16797 14.1693L10.8346 15.8359C10.9988 16.0001 11.1937 16.1303 11.4081 16.2191C11.6226 16.308 11.8525 16.3537 12.0846 16.3537C12.3168 16.3537 12.5467 16.308 12.7611 16.2191C12.9756 16.1303 13.1705 16.0001 13.3346 15.8359C13.4988 15.6718 13.629 15.4769 13.7178 15.2624C13.8067 15.048 13.8524 14.8181 13.8524 14.5859C13.8524 14.3538 13.8067 14.1239 13.7178 13.9094C13.629 13.695 13.4988 13.5001 13.3346 13.3359" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.6688 11.6671L13.7521 13.7504C14.0837 14.0819 14.5333 14.2682 15.0021 14.2682C15.471 14.2682 15.9206 14.0819 16.2521 13.7504C16.5837 13.4189 16.7699 12.9693 16.7699 12.5004C16.7699 12.0316 16.5837 11.5819 16.2521 11.2504L13.0188 8.01709C12.5501 7.54892 11.9146 7.28595 11.2521 7.28595C10.5896 7.28595 9.95423 7.54892 9.48548 8.01709L8.75214 8.75042C8.42062 9.08194 7.97098 9.26819 7.50214 9.26819C7.0333 9.26819 6.58366 9.08194 6.25214 8.75042C5.92062 8.4189 5.73438 7.96926 5.73438 7.50042C5.73438 7.03158 5.92062 6.58194 6.25214 6.25042L8.59381 3.90875C9.35401 3.15054 10.3454 2.66755 11.411 2.53623C12.4766 2.40491 13.5556 2.63278 14.4771 3.18375L14.8688 3.41709C15.2236 3.63124 15.6455 3.70552 16.0521 3.62542L17.5021 3.33375" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5013 2.5L18.3346 11.6667H16.668" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5013 2.5L1.66797 11.6667L7.08464 17.0833C7.41616 17.4149 7.86579 17.6011 8.33464 17.6011C8.80348 17.6011 9.25311 17.4149 9.58464 17.0833C9.91616 16.7518 10.1024 16.3022 10.1024 15.8333C10.1024 15.3645 9.91616 14.9149 9.58464 14.5833" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 3.33594H9.16667" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  deliverables: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.1145 18.0711C12.1461 18.15 12.2012 18.2174 12.2722 18.2641C12.3432 18.3108 12.4269 18.3347 12.5118 18.3325C12.5968 18.3303 12.6791 18.3022 12.7477 18.2519C12.8162 18.2016 12.8677 18.1316 12.8953 18.0511L18.312 2.21781C18.3386 2.14397 18.3437 2.06406 18.3266 1.98744C18.3096 1.91081 18.271 1.84064 18.2155 1.78513C18.16 1.72961 18.0898 1.69106 18.0132 1.67397C17.9366 1.65688 17.8566 1.66197 17.7828 1.68864L1.94947 7.10531C1.86905 7.13289 1.79899 7.18441 1.7487 7.25295C1.69841 7.3215 1.67028 7.40379 1.66811 7.48878C1.66593 7.57377 1.6898 7.65739 1.73652 7.72842C1.78324 7.79945 1.85057 7.85448 1.92947 7.88614L8.53781 10.5361C8.74671 10.6198 8.93652 10.7449 9.09578 10.9038C9.25504 11.0628 9.38046 11.2524 9.46447 11.4611L12.1145 18.0711Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.2104 1.78906L9.09375 10.9049" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  alwaysFree: (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.528 13.8041C11.7001 13.8831 11.894 13.9012 12.0777 13.8553C12.2615 13.8094 12.4241 13.7022 12.5388 13.5516L12.8346 13.1641C12.9899 12.9571 13.1912 12.7891 13.4226 12.6734C13.654 12.5576 13.9092 12.4974 14.168 12.4974H16.668C17.11 12.4974 17.5339 12.673 17.8465 12.9856C18.159 13.2981 18.3346 13.722 18.3346 14.1641V16.6641C18.3346 17.1061 18.159 17.53 17.8465 17.8426C17.5339 18.1551 17.11 18.3307 16.668 18.3307C12.6897 18.3307 8.87441 16.7504 6.06137 13.9373C3.24832 11.1243 1.66797 7.30898 1.66797 3.33073C1.66797 2.8887 1.84356 2.46478 2.15612 2.15222C2.46868 1.83966 2.89261 1.66406 3.33464 1.66406H5.83464C6.27666 1.66406 6.70059 1.83966 7.01315 2.15222C7.32571 2.46478 7.5013 2.8887 7.5013 3.33073V5.83073C7.5013 6.08947 7.44106 6.34466 7.32535 6.57609C7.20963 6.80751 7.04163 7.00882 6.83464 7.16406L6.44464 7.45656C6.29165 7.57338 6.18382 7.73955 6.13946 7.92685C6.0951 8.11416 6.11695 8.31104 6.2013 8.48406C7.3402 10.7973 9.21332 12.6681 11.528 13.8041Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ---------------------------------- Data ----------------------------------- */

interface ComparisonRow {
  key: string;
  icon: ReactNode;
  label: string;
  good: string;
  bad: string;
}

export const rows = [
  { key: "approach", icon: icons.approach, label: "Approach", good: "Built specifically for pet care businesses", bad: "Generic agency templates" },
  { key: "process", icon: icons.process, label: "Process", good: "Done-for-you technical setup & domain transfer", bad: "You have to figure out the tech yourself" },
  { key: "design-philosophy", icon: icons.designPhilosophy, label: "Design Philosophy", good: "Mobile-first, conversion-focused layouts", bad: "Cluttered designs that confuse clients" },
  { key: "dev-stack", icon: icons.devStack, label: "Development Stack", good: "Custom-coded React for maximum speed", bad: "Slow drag-and-drop builders (Wix/Squarespace)" },
  { key: "pricing", icon: icons.communication, label: "Pricing Model", good: "One-time flat fee. Zero ongoing costs.", bad: "Expensive monthly retainers forever" },
  { key: "support", icon: icons.support, label: "Support", good: "1-year free technical support included", bad: "Charged by the hour for basic fixes" },
  { key: "deliverables", icon: icons.deliverables, label: "Deliverables", good: "Full ownership of your website files", bad: "Trapped in an agency ecosystem" },
];
/* ------------------------------- CTA Button -------------------------------- */

function DotGrid() {
  // 5x5 dot animation, active dots vary per column to create a "loading" feel
  const activeCols = [2, 3, 0, 1, 2, 3, 4, 3];
  return (
    <div className="flex flex-col gap-px group-hover:hidden">
      {[0, 1, 2, 3, 4].map((row) => (
        <div className="flex gap-px" key={row}>
          {[0, 1, 2, 3, 4].map((col) => {
            const isActive = row === 2 || col === activeCols[row];
            return (
              <span
                key={col}
                className={`inline-block size-0.75 shrink-0 rounded-full duration-200 ease-linear ${
                  isActive ? "bg-white" : "bg-white/25"
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CTAButton({
  label,
  avatarSrc,
  muted = false,
}: {
  label: string;
  avatarSrc: string;
  muted?: boolean;
}) {
  return (
    <button
      className={`group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2 pr-4 pl-11 tracking-tight ${
        muted ? "**:data-[slot=button-box]:bg-gray-500 **:[span]:text-muted-foreground" : ""
      }`}
    >
      <div
        data-slot="button-box"
        className="bg-primary absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-400 ease-out group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180 group-hover:transform"
      >
        <DotGrid />
        <img
          alt="Avatar"
          width={32}
          height={32}
          className="hidden rotate-180 rounded-[5px] blur-sm transition-all duration-400 ease-out group-hover:block group-hover:blur-none"
          src={avatarSrc}
        />
      </div>
      <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
      <span className="inline-block text-white transition-transform duration-400 group-hover:-translate-x-8">
        {label}
      </span>
    </button>
  );
}

/* ------------------------------ Desktop table ------------------------------- */

function DesktopRow({ row, isFirst, isLast }: { row: ComparisonRow; isFirst?: boolean; isLast?: boolean }) {
  return (
    <>
      <div className="relative grid grid-cols-3 px-12 *:data-[slot=tabel-cell]:flex *:data-[slot=tabel-cell]:items-center *:data-[slot=tabel-cell]:gap-3 *:data-[slot=tabel-cell]:py-8">
        <div data-slot="tabel-cell" className="relative">
          <div
            className={`absolute -left-8 inset-0 w-8/10 bg-secondary ${
              isFirst ? "top-4 rounded-t-3xl" : isLast ? "bottom-4 rounded-b-3xl" : ""
            }`}
          />
          <span className="z-10">{row.icon}</span>
          <span className="-tracking-sm z-10 text-lg leading-4.5 font-medium">{row.label}</span>
        </div>
        <div data-slot="tabel-cell">
          <CheckIcon />
          <span className="-tracking-sm text-lg leading-4.5 font-medium">{row.good}</span>
        </div>
        <div data-slot="tabel-cell">
          <WarningIcon />
          <span className="-tracking-sm text-lg leading-4.5 font-medium">{row.bad}</span>
        </div>
      </div>
      <div className="bg-natural-black/7 h-px w-full" />
    </>
  );
}

function DesktopTable() {
  return (
    <div className="bg-white hidden w-full rounded-3xl lg:block">
      <div className="w-full text-black">
        {/* Header */}
        <div className="relative grid grid-cols-3 px-12 *:data-[slot=tabel-cell]:flex *:data-[slot=tabel-cell]:items-center *:data-[slot=tabel-cell]:gap-3 *:data-[slot=tabel-cell]:py-8">
          <div data-slot="tabel-cell" className="relative">
            <div className="absolute inset-0 top-4 -left-8 w-8/10 rounded-t-3xl bg-secondary" />
          </div>
          <div data-slot="tabel-cell">
            <a className="size-5 scale-125 mr-2" href="/">
              <img alt="Logo" width={50} height={50} className="block dark:hidden size-5 scale-125" src="/logo.png" />
              <img alt="Logo" width={50} height={50} className="hidden dark:block size-5 scale-125" src="/logo-dark.webp" />
            </a>
            <span className="-tracking-sm text-lg leading-4.5 font-medium">Nexpetcare Labs</span>
          </div>
          <div data-slot="tabel-cell">
            <span className="-tracking-sm text-muted-foreground text-lg leading-4.5 font-medium">
              Traditional Service Providers
            </span>
          </div>
        </div>
        <div className="bg-natural-black/7 h-px w-full" />

        {rows.map((row, i) => (
          <DesktopRow key={row.key} row={row} isFirst={i === 0} />
        ))}

        {/* Always Free / CTA row */}
        <div className="relative grid grid-cols-3 px-12 *:data-[slot=tabel-cell]:flex *:data-[slot=tabel-cell]:items-center *:data-[slot=tabel-cell]:gap-3 *:data-[slot=tabel-cell]:py-8">
          <div data-slot="tabel-cell" className="relative">
            <div className="absolute inset-0 bottom-4 -left-8 w-8/10 rounded-b-3xl bg-secondary" />
            <span className="z-10">{icons.alwaysFree}</span>
            <span className="-tracking-sm z-10 text-lg leading-4.5 font-medium">Always Free</span>
          </div>
          <div data-slot="tabel-cell">
            <CTAButton label="Book a Free Call" avatarSrc="https://github.com/shadcn.png" />
          </div>
          <div data-slot="tabel-cell">
            <CTAButton label="Book a Paid Call" avatarSrc="/avatar-1.webp" muted />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Mobile view -------------------------------- */

function MobileRow({ row }: { row: ComparisonRow }) {
  return (
    <div className="flex flex-col gap-3 border-b border-natural-black/7 px-5 py-6 last:border-b-0">
      <div className="flex items-center gap-2">
        {row.icon}
        <span className="-tracking-sm text-base leading-4.5 font-medium">{row.label}</span>
      </div>
      <div className="flex items-start gap-2 rounded-xl bg-secondary p-3">
        <CheckIcon />
        <span className="text-sm leading-5 font-medium">{row.good}</span>
      </div>
      <div className="flex items-start gap-2 p-3">
        <WarningIcon />
        <span className="text-muted-foreground text-sm leading-5 font-medium">{row.bad}</span>
      </div>
    </div>
  );
}

function MobileTable() {
  return (
    <div className="block lg:hidden w-full rounded-3xl bg-white text-black overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-secondary px-5 py-5">
        <div className="flex items-center gap-2">
          <a className="size-5 scale-125" href="/">
            <img alt="Logo" width={50} height={50} className="block dark:hidden size-5 scale-125" src="/logo.png" />
            <img alt="Logo" width={50} height={50} className="hidden dark:block size-5 scale-125" src="/logo-dark.webp" />
          </a>
          <span className="-tracking-sm text-base leading-4.5 font-medium">Nexpetcare Labs</span>
        </div>
        <span className="-tracking-sm text-muted-foreground text-sm leading-4.5 font-medium">
          Traditional
        </span>
      </div>

      {rows.map((row) => (
        <MobileRow key={row.key} row={row} />
      ))}

      {/* Always Free / CTA */}
      <div className="flex flex-col gap-4 bg-secondary px-5 py-6">
        <div className="flex items-center gap-2">
          {icons.alwaysFree}
          <span className="-tracking-sm text-base leading-4.5 font-medium">Always Free</span>
        </div>
        <div className="flex flex-col items-start gap-3">
          <CTAButton label="Book a Free Call" avatarSrc="https://github.com/shadcn.png" />
          <CTAButton label="Book a Paid Call" avatarSrc="/avatar-1.webp" muted />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Component --------------------------------- */

export default function ComparisonTable() {
  return (
    <div
      data-slot="container"
      className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-20 flex flex-col gap-15 py-20 md:py-30"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-heading text-left text-4xl font-semibold tracking-tight md:text-5xl">
          Nexpetcare VS Traditional Service Providers
        </h2>
      </div>

      <div className="flex flex-col gap-6 border border-gray-300 shadow rounded-3xl overflow-hidden">
        <DesktopTable />
        <MobileTable />
      </div>
    </div>
  );
}