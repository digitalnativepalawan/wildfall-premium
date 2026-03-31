import { motion } from "motion/react";
import { Target, Crosshair, Flag, Shield } from "lucide-react";

export function Scoring() {
  const points = [
    { label: "OUTPOST CONTROL", value: "+5 → +15", icon: Shield, desc: "Points per hour held." },
    { label: "CAPTAIN KILL", value: "+5", icon: Target, desc: "Eliminating enemy leadership." },
    { label: "SNIPER KILL", value: "+3", icon: Crosshair, desc: "Neutralizing long-range threats." },
    { label: "FLAG CAPTURE", value: "+10", icon: Flag, desc: "Securing enemy faction colors." },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Scoring <span className="gold-text italic">System</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">THE METRICS OF VICTORY</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {points.map((point, idx) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-8 gold-border bg-black group hover:bg-gold/5 transition-all duration-500"
            >
              <point.icon className="w-8 h-8 text-gold mx-auto mb-8 transition-transform group-hover:scale-110" />
              <div className="text-4xl md:text-5xl font-mono text-gold mb-4">{point.value}</div>
              <h3 className="text-sm font-mono tracking-widest mb-4 uppercase">{point.label}</h3>
              <p className="text-xs text-white/40 font-serif italic">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
