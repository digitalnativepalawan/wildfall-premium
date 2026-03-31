import { motion } from "motion/react";
import { BookOpen, ArrowRight } from "lucide-react";

export function CTA({ onFieldManual, onInvestParticipate }: { onFieldManual: () => void, onInvestParticipate: () => void }) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-gold/10 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <button
            onClick={onFieldManual}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-black border-2 border-gold text-gold font-mono tracking-[0.3em] overflow-hidden animate-pulse-gold"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <BookOpen className="w-6 h-6 relative z-10 group-hover:text-black transition-colors" />
            <span className="relative z-10 group-hover:text-black transition-colors">FIELD MANUAL — COMPLETE WAR DOCTRINE</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight">Ready to <span className="gold-text italic">Deploy?</span></h2>
          <button
            onClick={onInvestParticipate}
            className="group inline-flex items-center gap-4 px-16 py-8 bg-gold text-black font-mono font-bold tracking-[0.3em] hover:bg-white transition-all duration-500"
          >
            INVEST OR PARTICIPATE
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
