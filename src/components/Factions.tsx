import { motion } from "motion/react";

export function Factions() {
  const factions = [
    {
      name: "Légionnaires du Nord",
      motto: "Order through dominance.",
      quote: "The jungle is chaos. We are the structure that tames it.",
      desc: "A highly disciplined paramilitary force focused on tactical superiority and territorial control."
    },
    {
      name: "National Guard",
      motto: "Peace through control.",
      quote: "Security is not a privilege. It is a mandate we enforce.",
      desc: "The established authority, utilizing superior logistics and defensive fortifications."
    },
    {
      name: "Popular Front (TPF)",
      motto: "Freedom through resistance.",
      quote: "They call us rebels. We call ourselves the rightful owners of the canopy.",
      desc: "A decentralized guerrilla force that uses the environment as their greatest weapon."
    }
  ];

  return (
    <section id="factions" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">The <span className="gold-text italic">Factions</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">CHOOSE YOUR ALLEGIANCE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {factions.map((faction, idx) => (
            <motion.div
              key={faction.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative p-12 gold-border bg-black group"
            >
              <div className="absolute top-0 left-12 -translate-y-1/2 bg-black px-4 text-[10px] font-mono text-gold tracking-[0.3em]">
                FACTION 0{idx + 1}
              </div>
              
              <h3 className="text-3xl font-serif mb-6 tracking-widest group-hover:text-gold transition-colors">
                {faction.name}
              </h3>
              
              <div className="h-px w-12 bg-gold mb-8" />
              
              <p className="text-lg font-serif italic text-white/80 mb-6 leading-relaxed">
                "{faction.quote}"
              </p>
              
              <p className="text-xs font-mono text-gold italic mb-8 tracking-widest uppercase">
                {faction.motto}
              </p>
              
              <p className="text-sm text-white/40 font-serif italic leading-relaxed">
                {faction.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
