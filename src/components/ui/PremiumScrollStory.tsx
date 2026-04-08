import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface Item {
    title: string;
    desc: string;
    image: string;
}

interface Props {
    items: Item[];
    className?: string;
}

export default function PremiumScrollStory({ items, className = "" }: Props) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 🛑 Step snapping (one card at a time)
    const steppedProgress = useTransform(scrollYProgress, (v) => {
        const steps = items.length - 1;
        return Math.round(v * steps) / steps;
    });

    // 🎯 Smooth motion
    const smoothProgress = useSpring(steppedProgress, {
        stiffness: 140,
        damping: 30,
    });



    return (
        <section
            ref={containerRef}
            className={`relative bg-[#030617] text-white ${className}`}
            style={{ height: `${(items.length - 1) * 130}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="w-full h-full relative">

                    {items.map((item, i) => {
                        const start = i / items.length;
                        const end = (i + 1) / items.length;

                        const opacity = useTransform(
                            smoothProgress,
                            [start - 0.05, start, end - 0.05, end],
                            i === items.length - 1
                                ? [0, 1, 1, 1]   // 👈 last card never fades out
                                : [0, 1, 1, 0]
                        );

                        const scale = useTransform(
                            smoothProgress,
                            [start, start + 0.1],
                            [0.98, 1]
                        );

                        const y = useTransform(
                            smoothProgress,
                            [start, start + 0.1],
                            [40, 0]
                        );

                        const overlayOpacity = useTransform(
                            smoothProgress,
                            [start - 0.05, start, end],
                            [0.6, 0, 0.6]
                        );

                        return (
                            <motion.div
                                key={i}
                                style={{ opacity, scale, y }}
                                className="absolute inset-0"
                            >
                                
                                <div className="relative w-full h-screen overflow-hidden">

                                    {/* IMAGE */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* DYNAMIC OVERLAY */}
                                    <motion.div
                                        style={{ opacity: overlayOpacity }}
                                        className="absolute inset-0 bg-black"
                                    />

                                    {/* CONTENT */}
                                    <motion.div
                                        style={{ opacity, y }}
                                        className="relative z-10 h-full flex flex-col justify-end px-8 md:px-20 pb-24"
                                    >
                                        <h2 className="text-4xl md:text-6xl font-bold max-w-3xl">
                                            <span className="gradient-text">
                                                {item.title.split(" ")[0]}
                                            </span>{" "}
                                            {item.title.split(" ").slice(1).join(" ")}
                                        </h2>

                                        <p className="mt-6 text-lg md:text-xl text-white max-w-2xl">
                                            {item.desc}
                                        </p>
                                    </motion.div>

                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>

            {/* subtle background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,138,199,0.15),transparent_70%)]" />
        </section>
    );
}