import { motion } from "motion/react";
import { Map, Home, Shield, Target, Activity } from "lucide-react";

export function Battlefield() {
  const zones = [
    {
      title: "Las Sombras Village",
      type: "NEUTRAL ZONE",
      desc: "The heart of the jungle. A non-combat zone where information is the currency.",
      features: ["2 Tokens/Day", "Hospital", "Armory", "Saloon"],
      icon: Home
    },
    {
      title: "La Fábrica",
      type: "OUTPOST",
      desc: "Firepower Control. Controlling this sector grants access to heavy munitions.",
      features: ["Strategic High Ground", "Ammo Cache", "Radio Relay"],
      icon: Target
    },
    {
      title: "El Mirador",
      type: "OUTPOST",
      desc: "Intel Hub. The highest point in the 60-hectare simulation.",
      features: ["Visual Dominance", "Signal Intercept", "Sniper Perch"],
      icon: Activity
    },
    {
      title: "Sitio Ernesto",
      type: "OUTPOST",
      desc: "Endurance Point. A grueling terrain that tests the limits of any squad.",
      features: ["Dense Canopy", "Natural Fortification", "Supply Drop Zone"],
      icon: Shield
    }
  ];

  const baseCamps = ["Camp Bastión", "Camp Isabela", "Camp Kalayaan"];

  return (
    <section id="battlefield" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-gold mb-4">
              <Map className="w-6 h-6" />
              <span className="text-xs font-mono tracking-widest uppercase">The Theater of War</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Battlefield <br /><span className="gold-text italic">Zones</span>
            </h2>
          </div>
          <div className="flex gap-4">
            {baseCamps.map((camp) => (
              <div key={camp} className="px-4 py-2 border border-gold/20 text-[10px] font-mono text-gold/60 tracking-widest uppercase">
                {camp}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
          {zones.map((zone, idx) => (
            <motion.div
              key={zone.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-black p-8 group hover:bg-gold/5 transition-colors duration-500"
            >
              <zone.icon className="w-8 h-8 text-gold mb-8 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-mono text-gold mb-2 tracking-widest">{zone.type}</div>
              <h3 className="text-2xl font-serif mb-4 tracking-widest">{zone.title}</h3>
              <p className="text-sm text-white/40 font-serif italic mb-8 leading-relaxed">{zone.desc}</p>
              
              <ul className="space-y-3">
                {zone.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[10px] font-mono text-white/60">
                    <div className="w-1 h-1 bg-gold rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    </section>
  );
}
