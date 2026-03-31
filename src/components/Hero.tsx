import { motion } from "motion/react";
import { Shield, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-mono tracking-[0.2em] mb-8"
        >
          <Shield className="w-3 h-3" />
          FULL-SCALE LIVE WAR SIMULATION
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-8xl md:text-[12rem] font-serif leading-none tracking-tighter gold-gradient-text mb-4"
        >
          WILDFALL
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-3xl font-serif italic text-gold/80 mb-12"
        >
          No Man's Jungle
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-serif italic mb-16"
        >
          "This is not a match. This is not a game you 'play and forget.'"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-3 gap-8 md:gap-24 items-center justify-center mb-20"
        >
          {[
            { label: "DAYS", value: "2" },
            { label: "NIGHT", value: "1" },
            { label: "HECTARES", value: "60" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-mono text-gold mb-2">{stat.value}</span>
              <span className="text-[10px] font-mono tracking-widest text-white/40">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-mono tracking-widest">SCROLL TO DEPLOY</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>

      {/* Jungle Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 jungle-silhouette z-0 pointer-events-none" />
    </section>
  );
}
