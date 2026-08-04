'use client'
import React from 'react'

import Link from 'next/link'
import { X } from 'lucide-react'
import Image from 'next/image'

export const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faqs' },
];

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)

    React.useEffect(() => {
        if (!menuState) return

        const mediaQuery = window.matchMedia('(max-width: 1023px)')
        const updateOverflow = () => {
            document.documentElement.classList.toggle('overflow-hidden', mediaQuery.matches)
        }

        updateOverflow()
        mediaQuery.addEventListener('change', updateOverflow)

        return () => {
            mediaQuery.removeEventListener('change', updateOverflow)
            document.documentElement.classList.remove('overflow-hidden')
        }
    }, [menuState])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="bg-transparent  z-20 w-full "
            >
                <div className="mx-auto px-4">
                    <div className="relative flex flex-wrap items-center justify-between pt-2 max-lg:gap-6">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <img src="/logo.png" alt="logo" width={40} height={40} className=" size-12" />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 block cursor-pointer after:absolute after:-inset-4 lg:hidden"
                            >
                                <div
                                    aria-hidden
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 size-4.5 m-auto flex flex-col items-center justify-center gap-[7px] duration-200"
                                >
                                    <span className="bg-foreground h-0.5 w-full rounded-full" />
                                    <span className="bg-foreground h-0.5 w-full rounded-full" />
                                </div>

                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 translate-x-[-3px] -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto size-fit max-lg:hidden">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end max-lg:space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6">
                            <div className="lg:hidden">
                                <ul>
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-foreground block py-3 text-2xl font-medium"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <button className="group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20  bg-black py-2 pr-4 pl-11 tracking-tight ">
                                    <div
                                        data-slot="button-box"
                                        className="bg-primary absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-400 ease-out group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180 group-hover:transform"
                                    >
                                        <div className="flex flex-col gap-px group-hover:hidden">
                                            <div className="flex gap-px">
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                            </div>
                                            <div className="flex gap-px">
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                            </div>
                                            <div className="flex gap-px">
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                            </div>
                                            <div className="flex gap-px">
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                            </div>
                                            <div className="flex gap-px">
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                                <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                                            </div>
                                        </div>
                                        <img
                                            alt="Avatar"
                                            loading="lazy"
                                            width={32}
                                            height={32}
                                            decoding="async"
                                            data-nimg={1}
                                            className="hidden rotate-180 rounded-[5px] blur-sm transition-all duration-400 ease-out group-hover:block group-hover:blur-none"
                                            style={{ color: "transparent" }}
                                            srcSet="/_next/image?url=%2Fme.jpg&w=32&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 1x, /_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 2x"
                                            src="/_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY"
                                        />
                                    </div>
                                    <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
                                    <span className="inline-block text-white transition-transform duration-400 group-hover:-translate-x-8">
                                        Chat with Maheshwar
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
