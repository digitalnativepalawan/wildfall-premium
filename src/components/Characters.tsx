import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

const IMG = "https://pxbdwprvruhcvzcrsxgu.supabase.co/storage/v1/object/public/images/";

const ALL_CHARACTERS = [
  // NPCs
  { id: "hopper", name: "Mr. Hopper", role: "The Broker", type: "npc", image_file: "npc-hopper.jpg", description: "A mysterious figure who controls the flow of information and tokens in Las Sombras. Never takes sides, but his prices favor those with power. His network of informants extends beyond the village into the jungle itself.", intel: "Mr. Hopper sees all transactions in Las Sombras. His network extends beyond the village into the jungle itself. He never takes sides, but his prices favor those with power." },
  { id: "santiago", name: "Don Santiago", role: "The Landlord", type: "npc", image_file: "npc-santiago.jpg", description: "The de-facto ruler of Las Sombras Village. His 'neutrality' is maintained by knowing everyone's secrets. Owns the land beneath the village. Cross him, and you have no shelter in the jungle.", intel: "Don Santiago owns the land beneath Las Sombras. His 'neutrality' is maintained by knowing everyone's secrets. Cross him, and you have no shelter in the jungle." },
  { id: "mateo", name: "Mateo Cruz", role: "The Guide", type: "npc", image_file: "npc-mateo.jpg", description: "A local who knows every hidden path and trap in the 60-hectare jungle. Born in these jungles, he knows the 12 hidden paths by heart, including which ones are trapped. Without him, operatives get lost... or worse.", intel: "Mateo was born in these jungles. He knows the 12 hidden paths by heart, including which ones are trapped. Without him, operatives get lost... or worse." },
  { id: "esperanza", name: "Doña Esperanza", role: "The Healer", type: "npc", image_file: "npc-esperanza.jpg", description: "Runs the village hospital. Her neutrality is absolute, her skills legendary. Treats Legion, Guard, and Front alike. Wounded operatives from all factions have sworn loyalty to her. Her hospital is sacred ground.", intel: "In Las Sombras, Doña Esperanza treats all factions alike. Her hospital is sacred ground. Wounded operatives from all sides have sworn loyalty to her." },
  { id: "landa", name: "Christopher Landa", role: "The Mercenary", type: "npc", image_file: "npc-landa.jpg", description: "A former special forces operative who sells his services to the highest bidder. Doesn't believe in factions — only pesos. Trained operatives for all three sides. Today your ally, tomorrow your enemy.", intel: "Landa doesn't believe in factions. He believes in pesos. Former military, trained operatives for all three sides. Today your ally, tomorrow your enemy." },
  { id: "farrier", name: "Farrier", role: "The Armorer", type: "npc", image_file: "npc-farrier.jpg", description: "Master of weaponry. If it fires, he can fix it or make it more lethal. Maintains the Armory in Las Sombras. Custom modifications sought after by all factions. A weapon from Farrier won't jam when you need it most.", intel: "Farrier maintains the Armory in Las Sombras. His custom modifications are sought after by all factions. A weapon from Farrier won't jam when you need it most." },
  { id: "gavarra", name: "Ka Gavarra", role: "The Ideologue", type: "npc", image_file: "npc-gavarra.jpg", description: "The spiritual leader of the Popular Front, inspiring resistance through the canopy. Once a teacher, now inspires the Front to see the jungle not as enemy, but as ally. His followers know every tree, every shadow.", intel: "Ka Gavarra was once a teacher. Now he inspires the Popular Front to see the jungle not as enemy, but as ally. His followers know every tree, every shadow." },
  { id: "montenegro", name: "Montenegro", role: "The Enforcer", type: "npc", image_file: "npc-montenegro.jpg", description: "A brutal commander who ensures the rules of engagement are followed — or else. Even faction leaders fear his judgment. He's been known to end careers permanently. Break the rules, answer to him.", intel: "Montenegro enforces the Rules of Engagement. Break them, and you answer to him. He's been known to end careers permanently. Even faction leaders fear his judgment." },
  // Faction Leaders
  { id: "vex", name: "Commander Vex", role: "Légionnaires du Nord", type: "faction", image_file: "faction-legion.jpg", description: "Disciplined military officer in red and black tactical gear. Believes in 'Order through dominance.' Leads the paramilitary force focused on tactical superiority and territorial control.", intel: "Commander Vex came from outside. He sees the jungle as a problem to be solved through force and structure. His discipline is absolute. His patience is not." },
  { id: "reyes", name: "Captain Reyes", role: "National Guard", type: "faction", image_file: "faction-guard.jpg", description: "Professional soldier in blue tactical uniform. Believes in 'Peace through control.' Utilizes superior logistics and defensive fortifications. Authoritative but fair.", intel: "Captain Reyes has seen real war. He knows that controlling the ground means controlling the outcome. Fair to those who follow the rules. Merciless to those who don't." },
  { id: "mara", name: "Comrade Mara", role: "Popular Front (TPF)", type: "faction", image_file: "faction-front.jpg", description: "Guerrilla fighter in green and brown camouflage. Believes in 'Freedom through resistance.' Inspires decentralized forces to use the environment as their greatest weapon. Charismatic revolutionary.", intel: "Mara was born in this jungle. She knows every shadow, every sound. She doesn't fight the terrain — she becomes it. Her people would die for her." },
];

type FilterType = 'all' | 'npc' | 'faction';

export function Characters() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<any | null>(null);
  const [extraChars, setExtraChars] = useState<any[]>([]);

  useEffect(() => {
    const fetchExtra = async () => {
      const { data } = await supabase
        .from('characters')
        .select('*')
        .eq('active', true)
        .order('sort_order');
      if (data) setExtraChars(data);
    };
    fetchExtra();
  }, []);

  const allChars = [...ALL_CHARACTERS, ...extraChars];
  const filtered = filter === 'all' ? allChars : allChars.filter(c => c.type === filter);

  const typeLabel: Record<string, string> = {
    npc: 'Las Sombras Denizen',
    faction: 'Faction Leader',
  };

  return (
    <section id="characters" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 text-gold mb-4">
            <Users className="w-6 h-6" />
            <span className="text-xs font-mono tracking-widest uppercase">Cast of Characters</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif mb-4">
            The <span className="gold-text italic">World</span> of Wildfall
          </h2>
          <p className="text-white/40 font-serif italic max-w-xl mx-auto">
            Every operative, every denizen, every faction leader — the living world of Las Sombras.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {(['all', 'npc', 'faction'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 font-mono text-xs tracking-widest uppercase border transition-all",
                filter === f
                  ? "bg-gold text-black border-gold"
                  : "border-white/20 text-white/40 hover:border-gold/40 hover:text-gold/60"
              )}
            >
              {f === 'all' ? 'All Characters' : f === 'npc' ? 'NPCs' : 'Faction Leaders'}
            </button>
          ))}
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((char, idx) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelected(char)}
                className="group cursor-pointer border border-white/10 hover:border-gold/40 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src={`${IMG}${char.image_file}`}
                    alt={char.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(char.name)}&background=1a1a1a&color=C5A028&size=400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                      "text-[9px] font-mono tracking-widest uppercase px-2 py-1 border",
                      char.type === 'faction'
                        ? "border-gold/50 text-gold bg-black/80"
                        : "border-white/20 text-white/50 bg-black/60"
                    )}>
                      {char.type === 'faction' ? 'Leader' : 'NPC'}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-mono text-gold/80 uppercase tracking-widest mb-0.5">{char.role}</p>
                    <h3 className="font-serif font-bold text-white text-lg leading-tight">{char.name}</h3>
                  </div>
                </div>

                <div className="p-4 bg-black">
                  <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{char.description}</p>
                  <p className="text-[10px] font-mono text-white/20 mt-3 group-hover:text-gold transition-colors">View Dossier →</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title=""
        className="max-w-2xl"
      >
        {selected && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden border border-gold/20">
                <img
                  src={`${IMG}${selected.image_file}`}
                  alt={selected.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}&background=1a1a1a&color=C5A028&size=400`;
                  }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-mono text-gold/70 uppercase tracking-widest mb-1">
                  {typeLabel[selected.type] || selected.type}
                </p>
                <h2 className="text-3xl font-serif font-bold">{selected.name}</h2>
                <p className="text-gold font-mono text-sm mt-1">{selected.role}</p>
              </div>

              <div className="h-px w-12 bg-gold" />

              <p className="text-white/70 leading-relaxed text-sm">{selected.description}</p>

              {selected.intel && (
                <div className="p-4 bg-gray-900 border border-gold/20">
                  <p className="text-xs font-mono text-gold/70 uppercase tracking-widest mb-2">Classified Intel</p>
                  <p className="text-sm text-gray-300 italic leading-relaxed">"{selected.intel}"</p>
                </div>
              )}

              <button
                onClick={() => setSelected(null)}
                className="w-full py-3 border border-white/20 text-white/60 hover:text-white transition font-mono text-sm"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
