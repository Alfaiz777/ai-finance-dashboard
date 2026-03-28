import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ IMPORT YOUR REAL IMAGES
import dashboard from "@/assets/dashboard.png";
import transaction from "@/assets/Transaction.png";
import analysis from "@/assets/Analysis.png";
import assetsImg from "@/assets/Assets.png";
import split from "@/assets/Split&owe.png";
import ai from "@/assets/AIChat.png";
import settings from "@/assets/settings.png";

const slides = [
  { title: "Dashboard", img: dashboard },
  { title: "Transactions", img: transaction },
  { title: "Analytics", img: analysis },
  { title: "Assets", img: assetsImg },
  { title: "Split & Owe", img: split },
  { title: "AI Advisor", img: ai },
  { title: "Settings", img: settings },
];

export const ProductCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // 🔥 AUTO PLAY
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2500); // speed

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="relative group bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 🔥 SLIDE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={slides[index].img}
              alt={slides[index].title}
              className="w-full h-[260px] object-cover rounded-xl"
            />

            {/* 🔥 OVERLAY TITLE */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-3 text-sm">
              {slides[index].title}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔥 DOT INDICATORS */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-blue-500" : "w-2 bg-gray-500/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
