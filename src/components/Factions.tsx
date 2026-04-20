import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

const IMG = "https://pxbdwprvruhcvzcrsxgu.supabase.co/storage/v1/object/public/images/";

const DEFAULT_FACTIONS = [
  {
    id: "legion",
    name: "Légionnaires du Nord",
    motto: "Order through dominance.",
    quote: "The jungle is chaos. We are the structure that tames it.",
    desc: "A highly disciplined paramilitary force focused on tactical superiority and territorial control. They come from outside the region, deployed into unfamiliar territory. They move forward, create pressure, and force confrontation.",
    image_file: "faction-legion.jpg",
    leader: "Commander Vex",
    leader_desc: "Disciplined military officer in red and black tactical gear. Leads the paramilitary force with an iron will. Believes that order is the only path to victory in the jungle.",
    color: "red",
    camp: "Camp Bastión",
    index: 1
  },
  {
    id: "guard",
    name: "National Guard",
    motto: "Peace through control.",
    quote: "Security is not a privilege. It is a mandate we enforce.",
    desc: "The established authority, utilizing superior logistics and defensive fortifications. They represent order within the region. Tasked with holding ground, protecting key positions, and maintaining stability.",
    image_file: "faction-guard.jpg",
    leader: "Captain Reyes",
    leader_desc: "Professional soldier in blue tactical uniform. Authoritative but fair. Utilizes superior logistics and defensive fortifications to anchor the battlefield.",
    color: "blue",
    camp: "Camp Isabela",
    index: 2
  },
  {
    id: "front",
    name: "Popular Front (TPF)",
    motto: "Freedom through resistance.",
    quote: "They call us rebels. We call ourselves the rightful owners of the canopy.",
    desc: "A decentralized guerrilla force that uses the environment as their greatest weapon. They emerge from within the land itself, deeply connected to the terrain and its hidden paths. They rely on timing, positioning, and disruption.",
    image_file: "faction-front.jpg",
    leader: "Comrade Mara",
    leader_desc: "Guerrilla fighter in green and brown camouflage. Charismatic revolutionary who inspires decentralized forces to use the environment as their greatest weapon.",
    color: "green",
    camp: "Camp Kalayaan",
    index: 3
  }
];

export function Factions() {
  const [selectedFaction, setSelectedFaction] = useState<any | null>(null);
  const [factions, setFactions] = useState(DEFAULT_FACTIONS);

  useEffect(() => {
    const fetchCustomFactions = async () => {
      const { data } = await supabase
        .from('characters')
        .select('*')
        .eq('type', 'faction')
        .eq('active', true)
        .order('sort_order');
      if (data && data.length > 0) {
        setFactions([...DEFAULT_FACTIONS, ...data]);
      }
    };
    fetchCustomFactions();
  }, []);

  const colorMap: Record<string, string> = {
    red: "border-red-500/40 text-red-400",
    blue: "border-blue-500/40 text-blue-400",
    green: "border-green-500/40 text-green-400",
  };

  const bgMap: Record<string, string> = {
    red: "bg-red-950/20",
    blue: "bg-blue-950/20",
    green: "bg-green-950/20",
  };

  return (
    <>
      <section id="factions" className="py-32 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-4">The <span className="gold-text italic">Factions</span></h2>
            <p className="text-xs font-mono tracking-widest text-white/40">CHOOSE YOUR ALLEGIANCE</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {factions.map((faction, idx) => (
              <motion.div
                key={faction.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group cursor-pointer"
                onClick={() => setSelectedFaction(faction)}
              >
                {/* Leader Image */}
                <div className="relative aspect-[4/5] overflow-hidden mb-0 border border-white/10 group-hover:border-gold/40 transition-colors duration-300">
                  <img
                    src={`${IMG}${faction.image_file}`}
                    alt={faction.leader}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faction.leader)}&background=1a1a1a&color=C5A028&size=600`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Faction number */}
                  <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 border border-gold/30">
                    <span className="text-[10px] font-mono text-gold tracking-[0.3em]">FACTION 0{faction.index || idx + 1}</span>
                  </div>

                  {/* Leader name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className={cn("text-xs font-mono tracking-widest uppercase mb-1", colorMap[faction.color] || "text-gold/70")}>
                      {faction.leader}
                    </p>
                    <h3 className="text-2xl font-serif font-bold text-white">{faction.name}</h3>
                  </div>
                </div>

                {/* Info Card */}
                <div className={cn(
                  "p-6 border border-t-0 group-hover:border-gold/30 transition-colors duration-300",
                  bgMap[faction.color] || "bg-black",
                  "border-white/10"
                )}>
                  <p className={cn("text-xs font-mono italic mb-3 tracking-widest uppercase", colorMap[faction.color] || "text-gold/70")}>
                    "{faction.motto}"
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{faction.desc}</p>
                  <p className="text-xs font-mono text-white/20 mt-4 group-hover:text-gold transition-colors">
                    {faction.camp} • Click to learn more →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faction Detail Modal */}
      <Modal
        isOpen={selectedFaction !== null}
        onClose={() => setSelectedFaction(null)}
        title=""
        className="max-w-3xl"
      >
        {selectedFaction && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden border border-gold/20">
                <img
                  src={`${IMG}${selectedFaction.image_file}`}
                  alt={selectedFaction.leader}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFaction.leader)}&background=1a1a1a&color=C5A028&size=600`;
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-5">
              <div>
                <p className={cn("text-xs font-mono uppercase tracking-widest mb-1", colorMap[selectedFaction.color] || "text-gold/70")}>
                  Faction 0{selectedFaction.index || 1} • {selectedFaction.camp}
                </p>
                <h2 className="text-3xl font-serif font-bold mb-1">{selectedFaction.name}</h2>
                <p className={cn("text-sm font-mono italic", colorMap[selectedFaction.color] || "text-gold/70")}>
                  "{selectedFaction.motto}"
                </p>
              </div>

              <div className="h-px w-12 bg-gold" />

              <div className="p-4 bg-gray-900 border border-gold/20">
                <p className={cn("text-xs font-mono uppercase tracking-widest mb-2", colorMap[selectedFaction.color] || "text-gold/70")}>
                  {selectedFaction.leader}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedFaction.leader_desc}</p>
              </div>

              <div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Faction Doctrine</p>
                <p className="text-white/70 leading-relaxed">{selectedFaction.desc}</p>
              </div>

              <div className="p-4 bg-black border border-gold/20">
                <p className="text-lg font-serif italic text-white/80">"{selectedFaction.quote}"</p>
              </div>

              <button
                onClick={() => setSelectedFaction(null)}
                className="w-full py-3 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition font-mono text-sm"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
