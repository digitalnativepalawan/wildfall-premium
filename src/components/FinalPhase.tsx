import { motion } from "motion/react";
import { AlertTriangle, Timer, Sword, Flag } from "lucide-react";

export function FinalPhase() {
  const phases = [
    { label: "LAST HOUR", icon: Timer, desc: "All players must return to their respective base camps. The perimeter is closing." },
    { label: "FINAL COMBAT", icon: Sword, desc: "Every kill +5 points. The jungle is a meat grinder." },
    { label: "FLAG CAPTURE", icon: Flag, desc: "Flag capture points doubled to +20. The ultimate prize." },
    { label: "LAST STAND", icon: AlertTriangle, desc: "The last surviving squad member earns +15 points for their faction." },
  ];

  return (
    <section className="py-32 bg-gold/5 border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">The <span className="gold-text italic">Recall</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">THE FINAL PHASE OF ENGAGEMENT</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.label}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-start gap-8 p-8 gold-border bg-black"
            >
              <div className="p-4 bg-gold/10 text-gold rounded-sm">
                <phase.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-serif tracking-widest mb-4 uppercase">{phase.label}</h3>
                <p className="text-sm text-white/60 font-serif italic leading-relaxed">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
