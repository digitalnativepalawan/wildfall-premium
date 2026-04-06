import { motion } from "motion/react";
import { Shield, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Elements - DARK BLACK BASE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" /> {/* SOLID BLACK BASE */}
        <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-black to-black opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-mono tracking-[0.2em] mb-8"
        >
          <Shield className="w-3 h-3" />
          FULL-SCALE LIVE WAR SIMULATION
        </motion.div>

        {/* YOUR CUSTOM IMAGE - FIXED FOR MOBILE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <img 
            src="https://pxbdwprvruhcvzcrsxgu.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-01%20at%207.06.34%20AM.jpeg"
            alt="Wildfall: No Man's Jungle"
            className="w-full max-w-3xl mx-auto"
            style={{ 
              display: "block",
              backgroundColor: "transparent",
              mixBlendMode: "normal"
            }}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 lg:gap-24 items-center justify-center mt-12 mb-20 px-2"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono text-gold mb-2">2</span>
            <span className="text-[10px] font-mono tracking-widest text-white/40">DAYS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono text-gold mb-2">1</span>
            <span className="text-[10px] font-mono tracking-widest text-white/40">NIGHT</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono text-gold mb-2">60</span>
            <span className="text-[10px] font-mono tracking-widest text-white/40">HECTARES</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-mono tracking-widest">SCROLL TO DEPLOY</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-0" 
           style={{ 
             background: "linear-gradient(to top, #000000 0%, transparent 100%)",
             opacity: 0.8
           }} 
      />
    </section>
  );
}
