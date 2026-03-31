import { motion } from "motion/react";

export function NPCs() {
  const characters = [
    { name: "Mr. Hopper", role: "The Broker", desc: "A mysterious figure who controls the flow of information and tokens in Las Sombras." },
    { name: "Don Santiago", role: "The Landlord", desc: "The de-facto ruler of the village, ensuring neutrality through a network of spies." },
    { name: "Mateo Cruz", role: "The Guide", desc: "A local who knows every hidden path and trap in the 60-hectare jungle." },
    { name: "Doña Esperanza", role: "The Healer", desc: "Runs the village hospital. Her neutrality is absolute, her skills legendary." },
    { name: "Christopher Landa", role: "The Mercenary", desc: "A former special forces operative who sells his services to the highest bidder." },
    { name: "Farrier", role: "The Armorer", desc: "Master of weaponry. If it fires, he can fix it or make it more lethal." },
    { name: "Ka Gavarra", role: "The Ideologue", desc: "The spiritual leader of the Popular Front, inspiring resistance through the canopy." },
    { name: "Montenegro", role: "The Enforcer", desc: "A brutal commander who ensures that the rules of engagement are followed... or else." }
  ];

  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">NPC <span className="gold-text italic">World</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">THE DENIZENS OF LAS SOMBRAS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
          {characters.map((char, idx) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-black p-8 group hover:bg-gold/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-gold/20 mb-6 flex items-center justify-center text-gold font-mono text-xs group-hover:border-gold transition-colors">
                {char.name[0]}
              </div>
              <h3 className="text-xl font-serif tracking-widest mb-2 group-hover:text-gold transition-colors">{char.name}</h3>
              <div className="text-[10px] font-mono text-gold/60 mb-4 tracking-widest uppercase">{char.role}</div>
              <p className="text-sm text-white/40 font-serif italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {char.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
