import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Heart, Settings, Target, Crosshair, Eye, Crown } from "lucide-react";
import { cn } from "../lib/utils";

export function Roles() {
  const [activeRole, setActiveRole] = useState<number | null>(null);

  const roles = [
    {
      id: 1,
      name: "INFANTRY",
      icon: Shield,
      desc: "The backbone of the faction. Frontline combatants.",
      philosophy: "To move, to fire, to communicate. The infantryman is the ultimate weapon of the jungle. They hold the ground that others only walk upon."
    },
    {
      id: 2,
      name: "MEDIC",
      icon: Heart,
      desc: "Life-savers under fire. Critical for sustained ops.",
      philosophy: "In the chaos of war, the medic is the only beacon of hope. Their mission is simple: keep the unit alive at all costs."
    },
    {
      id: 3,
      name: "ENGINEER",
      icon: Settings,
      desc: "Fortification and demolition experts.",
      philosophy: "The jungle is a barrier; the engineer makes it a fortress. They build the paths and destroy the obstacles."
    },
    {
      id: 4,
      name: "SPECIAL FORCES",
      icon: Target,
      desc: "High-risk, high-reward tactical specialists.",
      philosophy: "Quiet professionals. They strike where the enemy is weakest and vanish before the alarm is raised."
    },
    {
      id: 5,
      name: "SNIPER",
      icon: Crosshair,
      desc: "Long-range precision and reconnaissance.",
      philosophy: "One shot, one kill. The sniper is the ghost of the canopy, a silent observer and a lethal executioner."
    },
    {
      id: 6,
      name: "SPY",
      icon: Eye,
      desc: "Infiltration and intelligence gathering.",
      philosophy: "Knowledge is the ultimate firepower. The spy lives in the shadows, gathering the secrets that win wars."
    },
    {
      id: 7,
      name: "COMMAND",
      icon: Crown,
      desc: "Strategic leadership and coordination.",
      philosophy: "The mind behind the muscle. Command sees the whole board and makes the hard choices that lead to victory."
    }
  ];

  return (
    <section id="roles" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Operational <span className="gold-text italic">Roles</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">CHOOSE YOUR DOCTRINE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveRole(role.id)}
              onMouseLeave={() => setActiveRole(null)}
              className={cn(
                "card-premium group relative overflow-hidden h-[300px] flex flex-col justify-between",
                activeRole === role.id && "border-gold"
              )}
            >
              <div>
                <role.icon className="w-8 h-8 text-gold mb-6 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-serif tracking-widest mb-4">{role.name}</h3>
                <p className="text-sm text-white/40 font-serif italic">{role.desc}</p>
              </div>

              <AnimatePresence>
                {activeRole === role.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 bg-black p-6 flex flex-col justify-center border border-gold"
                  >
                    <div className="text-[10px] font-mono text-gold mb-4 tracking-widest">PHILOSOPHY</div>
                    <p className="text-sm text-white/80 font-serif italic leading-relaxed">
                      {role.philosophy}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
