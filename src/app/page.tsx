// import Image from "next/image";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-start">
      
      <Image
        src="/bg.png"
        alt="Background Image of marbles and granites"
        fill
        className="object-cover"
      />
      <div className="absolute mx-5 md:w-2/5 h-fit flex flex-col justify-center px-5 md:px-16 py-16 space-y-5 bg-white/50 rounded-md">
        <h3 className="text-[#1B795D] font-extrabold text-2xl md:text-4xl">Cutlist Optimizer for Granite & Marble</h3>
        <ul className="text-black/50 text-sm">
          <li>Plan your slab cuts with precision.</li>
          <li>Reduce material waste, save cost, and generate accurate cutting layouts in minutes.</li>
          <li>No subscriptions. No limits. Built for stone professionals.</li>
        </ul>
        <Link href='/home' className="w-fit text-white bg-[#1B795D] rounded-md px-5 py-3 mt-5">
          Start New Optimization
        </Link>
      </div>
        
    </div>
  );
}
