import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Shield } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

const IMG = "https://pxbdwprvruhcvzcrsxgu.supabase.co/storage/v1/object/public/images/";

const DEFAULT_NPCS = [
  {
    id: "hopper",
    name: "Mr. Hopper",
    role: "The Broker",
    image_file: "npc-hopper.jpg.png",
    description: "A mysterious figure who controls the flow of information and tokens in Las Sombras. Never takes sides, but his prices favor those with power.",
    intel: "Mr. Hopper sees all transactions in Las Sombras. His network of informants extends beyond the village into the jungle itself. He never takes sides, but his prices favor those with power."
  },
  {
    id: "santiago",
    name: "Don Santiago",
    role: "The Landlord",
    image_file: "npc-santiago.jpg.png",
    description: "The de-facto ruler of Las Sombras Village. His 'neutrality' is maintained by knowing everyone's secrets. Owns the land beneath the village.",
    intel: "Don Santiago owns the land beneath Las Sombras. His 'neutrality' is maintained by knowing everyone's secrets. Cross him, and you have no shelter in the jungle."
  },
  {
    id: "mateo",
    name: "Mateo Cruz",
    role: "The Guide",
    image_file: "npc-mateo.jpg.png",
    description: "A local who knows every hidden path and trap in the 60-hectare jungle. Born in these jungles, he knows the 12 hidden paths by heart.",
    intel: "Mateo was born in these jungles. He knows the 12 hidden paths by heart, including which ones are trapped. Without him, operatives get lost... or worse."
  },
  {
    id: "esperanza",
    name: "Doña Esperanza",
    role: "The Healer",
    image_file: "npc-esperanza.jpg.png",
    description: "Runs the village hospital. Her neutrality is absolute, her skills legendary. Treats Legion, Guard, and Front alike.",
    intel: "In Las Sombras, Doña Esperanza treats all factions alike. Her hospital is sacred ground. Wounded operatives from all sides have sworn loyalty to her."
  },
  {
    id: "landa",
    name: "Christopher Landa",
    role: "The Mercenary",
    image_file: "npc-landa.jpg.png",
    description: "A former special forces operative who sells his services to the highest bidder. Doesn't believe in factions — only pesos.",
    intel: "Landa doesn't believe in factions. He believes in pesos. Former military, trained operatives for all three sides. Today your ally, tomorrow your enemy."
  },
  {
    id: "farrier",
    name: "Farrier",
    role: "The Armorer",
    image_file: "npc-ferrier.jpg.png",
    description: "Master of weaponry. If it fires, he can fix it or make it more lethal. Maintains the Armory in Las Sombras.",
    intel: "Farrier maintains the Armory in Las Sombras. His custom modifications are sought after by all factions. A weapon from Farrier won't jam when you need it most."
  },
  {
    id: "gavarra",
    name: "Ka Gavarra",
    role: "The Ideologue",
    image_file: "npc-gavarra.jpg.png",
    description: "The spiritual leader of the Popular Front, inspiring resistance through the canopy. Once a teacher, now a revolutionary.",
    intel: "Ka Gavarra was once a teacher. Now he inspires the Popular Front to see the jungle not as enemy, but as ally. His followers know every tree, every shadow."
  },
  {
    id: "montenegro",
    name: "Montenegro",
    role: "The Enforcer",
    image_file: "npc-montenegro.jpg.png",
    description: "A brutal commander who ensures the rules of engagement are followed — or else. Even faction leaders fear his judgment.",
    intel: "Montenegro enforces the Rules of Engagement. Break them, and you answer to him. He's been known to end careers permanently. Even faction leaders fear his judgment."
  }
];

export function NPCs() {
  const [selectedNPC, setSelectedNPC] = useState<any | null>(null);
  const [metNPCs, setMetNPCs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [npcs, setNpcs] = useState(DEFAULT_NPCS);
  const userId = localStorage.getItem('wildfall_user_id');

  useEffect(() => {
    const fetchCustomNPCs = async () => {
      const { data } = await supabase
        .from('characters')
        .select('*')
        .eq('type', 'npc')
        .eq('active', true)
        .order('sort_order');
      if (data && data.length > 0) {
        setNpcs([...DEFAULT_NPCS, ...data]);
      }
    };
    fetchCustomNPCs();
  }, []);

  const handleMeetNPC = async (npc: any) => {
    if (!userId) {
      setMessage('Create a profile to meet NPCs and earn intel points!');
      setTimeout(() => setMessage(''), 3000);
      setSelectedNPC(npc);
      return;
    }

    const npcId = npc.id || npc.name;

    const { data: existing } = await supabase
      .from('npc_encounters')
      .select('*')
      .eq('operative_id', userId)
      .eq('npc_id', npcId)
      .single();

    if (!existing) {
      await supabase.from('npc_encounters').insert([{
        operative_id: userId,
        npc_id: npcId,
        npc_name: npc.name
      }]);

      const { data: user } = await supabase
        .from('operatives')
        .select('points')
        .eq('id', userId)
        .single();

      if (user) {
        await supabase
          .from('operatives')
          .update({ points: user.points + 5 })
          .eq('id', userId);
      }

      setMessage(`Met ${npc.name}! +5 intel points earned.`);
      setTimeout(() => setMessage(''), 3000);
    }

    setMetNPCs(prev => [...new Set([...prev, npcId])]);
    setSelectedNPC(npc);
  };

  return (
    <section id="npcs" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono tracking-widest text-gold/70 mb-4 uppercase">NPC World</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            THE DENIZENS OF <span className="gold-gradient-text">LAS SOMBRAS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Click any character to meet them and learn their secrets. Each first meeting earns +5 intel points.
          </p>
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-gold/20 border border-gold/50 rounded inline-block"
              >
                <p className="text-gold text-sm font-mono">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* NPC Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {npcs.map((npc, idx) => {
            const npcId = npc.id || npc.name;
            const isMet = metNPCs.includes(npcId);
            return (
              <motion.div
                key={npcId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                onClick={() => handleMeetNPC(npc)}
                className={cn(
                  "group cursor-pointer border transition-all duration-300 overflow-hidden",
                  isMet ? "border-gold/50" : "border-white/10 hover:border-gold/40"
                )}
              >
                {/* Character Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src={`${IMG}${npc.image_file}`}
                    alt={npc.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(npc.name)}&background=1a1a1a&color=C5A028&size=400`;
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Met badge */}
                  {isMet && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-gold rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  )}

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs font-mono text-gold/80 uppercase tracking-widest mb-0.5">{npc.role}</p>
                    <h3 className="font-serif font-bold text-white text-lg leading-tight">{npc.name}</h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-black">
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{npc.description}</p>
                  <p className={cn(
                    "text-xs font-mono mt-3 tracking-wider",
                    isMet ? "text-gold" : "text-white/20"
                  )}>
                    {isMet ? "✓ Intel Gathered" : "Click to Meet →"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 font-mono">
            💡 Meeting all {npcs.length} NPCs unlocks special recognition in your operative dossier.
          </p>
        </motion.div>
      </div>

      {/* NPC Detail Modal */}
      <Modal
        isOpen={selectedNPC !== null}
        onClose={() => setSelectedNPC(null)}
        title=""
        className="max-w-2xl"
      >
        {selectedNPC && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden border border-gold/20">
                <img
                  src={`${IMG}${selectedNPC.image_file}`}
                  alt={selectedNPC.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedNPC.name)}&background=1a1a1a&color=C5A028&size=400`;
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">{selectedNPC.role}</p>
                <h2 className="text-3xl font-serif font-bold">{selectedNPC.name}</h2>
              </div>

              <div className="h-px w-12 bg-gold" />

              <p className="text-white/70 leading-relaxed">{selectedNPC.description}</p>

              <div className="p-4 bg-gray-900 border border-gold/20">
                <p className="text-xs font-mono text-gold/70 uppercase tracking-widest mb-2">Classified Intel</p>
                <p className="text-sm text-gray-300 italic leading-relaxed">"{selectedNPC.intel}"</p>
              </div>

              {!userId && (
                <div className="p-3 bg-gold/10 border border-gold/30 text-xs font-mono text-gold">
                  Create a profile to earn +5 intel points per NPC meeting.
                </div>
              )}

              <button
                onClick={() => setSelectedNPC(null)}
                className="w-full py-3 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition font-mono text-sm"
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
