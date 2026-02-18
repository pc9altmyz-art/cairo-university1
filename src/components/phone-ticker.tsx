"use client";

const phones = [
    "01080886555",
    "01091010454",
    "01069140030",
    "01010342400",
    "01093998000",
    "01062629397",
    "01069969600",
    "01099609071",
];

export default function PhoneTicker() {
    return (
        <div className="bg-[#0F172A] text-white py-3 overflow-hidden relative z-50 border-b border-white/5 shadow-2xl">
            <div className="flex animate-marquee whitespace-nowrap hover:pause-animation">
                {/* Render multiple times for seamless loop */}
                {[...phones, ...phones, ...phones, ...phones].map((phone, i) => (
                    <div key={i} className="mx-8 flex items-center gap-3 text-xs font-black tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] shadow-[0_0_10px_#D4A853]"></span>
                        <span dir="ltr" className="font-mono text-white/80 hover:text-[#D4A853] transition-colors duration-300 cursor-default">{phone}</span>
                        <span className="text-white/10 mx-4 font-thin">/</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
