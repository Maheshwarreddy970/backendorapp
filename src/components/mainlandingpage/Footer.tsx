import { cn } from '@/lib/utils'
import { Instrument_Serif } from 'next/font/google'

export const navigation = {
  connect: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/maheshwarr-reddy-713927258/',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@Nexpetcare',
    },
  ],
  company: [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
  ],
};



const TwoColumnFooter = () => {
    return (
        <footer
            aria-labelledby="footer-heading"
            className=" w-full px-4 md:px-0 relative bg-black pb-10 pt-32 border-t border-white/10    text-white "
        >            <div className="mx-auto max-w-7xl px-2">
                <div className="flex flex-col justify-between lg:flex-row">
                    <div className="space-y-4">
                        <img src="/logo.png" alt="Logo" className="h-12 w-12" />
                        <h1 className={cn("text-2xl  text-white font-black  max-w-lg")}>
                            Pretty good agency helping your dealership sell more cars with smart,<span className=" opacity-50"> modern websites. </span>
                        </h1>
                    </div>
                    {/* Navigations */}
                    <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
                        <div className="md:mt-0">
                            <h3 className=" font-semibold leading-6 ">
                                Connect
                            </h3>
                            <div className="mt-6 space-y-4">
                                {navigation.connect.map((item) => (
                                    <div key={item.name}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="  leading-6 text-white/60 transition-all duration-300 ease-in-out hover:text-white hover:underline "
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3 className=" font-semibold leading-6 ">
                                    Navigation
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <div key={item.name}>
                                            <a
                                                href={item.href}
                                                className="  leading-6 text-white/60 transition-all duration-300 ease-in-out hover:text-white hover:underline "
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center  mt-10 text-6xl md:text-6xl lg:text-[14rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-black/10 inset-x-0">NEXPETCARE</p>
            <div className=' border-t border-neutral-900 flex justify-center items-center  mt-5'>
                <img src={"/IHpfgTI9lpH77QoYVkDYROWso.png"} alt='bottom icon ' className=' mt-5 w-10 h-10'></img>
            </div>
        </footer>
    )
}

export default TwoColumnFooter