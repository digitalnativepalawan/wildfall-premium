import { motion } from "motion/react";
import { Shield, ChevronDown } from "lucide-react";

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

        {/* Your Image from Google Drive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img 
            src="https://drive.google.com/uc?export=view&id=1Gj3G4B9zRxN5vz_45FQaRG5nX9QkCERC"
            alt="Wildfall: No Man's Jungle"
            className="w-full max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 lg:gap-24 items-center justify-center mt-12 mb-20 px-2"
        >
          {[
            { label: "DAYS", value: "2" },
            { label: "NIGHT", value: "1" },
            { label: "HECTARES", value: "60" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono text-gold mb-2">{stat.value}</span>
              <span className="text-[10px] font-mono tracking-widest text-white/40 whitespace-nowrap">{stat.label}</span>
            </div>
          ))}
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

      {/* Jungle Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 jungle-silhouette z-0 pointer-events-none" />
    </section>
  );
}
