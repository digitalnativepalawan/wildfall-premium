import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Check, X } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

interface NPC {
  id: string;
  letter: string;
  name: string;
  role: string;
  desc: string;
  intel: string;
}

const NPCS: NPC[] = [
  {
    id: "hopper",
    letter: "M",
    name: "Mr. Hopper",
    role: "The Broker",
    desc: "A mysterious figure who controls the flow of information and tokens in Las Sombras.",
    intel: "Mr. Hopper sees all transactions in Las Sombras. His network of informants extends beyond the village into the jungle itself. He never takes sides, but his prices favor those with power."
  },
  {
    id: "santiago",
    letter: "D",
    name: "Don Santiago",
    role: "The Landlord",
    desc: "The de-facto ruler of the village, ensuring neutrality through a network of spies.",
    intel: "Don Santiago owns the land beneath Las Sombras. His 'neutrality' is maintained by knowing everyone's secrets. Cross him, and you have no shelter in the jungle."
  },
  {
    id: "mateo",
    letter: "M",
    name: "Mateo Cruz",
    role: "The Guide",
    desc: "A local who knows every hidden path and trap in the 60-hectare jungle.",
    intel: "Mateo was born in these jungles. He knows the 12 hidden paths by heart, including which ones are trapped. Without him, operatives get lost... or worse."
  },
  {
    id: "esperanza",
    letter: "D",
    name: "Doña Esperanza",
    role: "The Healer",
    desc: "Runs the village hospital. Her neutrality is absolute, her skills legendary.",
    intel: "In Las Sombras, Doña Esperanza treats Legion, Guard, and Front alike. Her hospital is sacred ground. Wounded operatives from all factions have sworn loyalty to her."
  },
  {
    id: "landa",
    letter: "C",
    name: "Christopher Landa",
    role: "The Mercenary",
    desc: "A former special forces operative who sells his services to the highest bidder.",
    intel: "Landa doesn't believe in factions. He believes in pesos. Former military, he's trained operatives for all three sides. Today your ally, tomorrow your enemy."
  },
  {
    id: "farrier",
    letter: "F",
    name: "Farrier",
    role: "The Armorer",
    desc: "Master of weaponry. If it fires, he can fix it or make it more lethal.",
    intel: "Farrier maintains the Armory in Las Sombras. His custom modifications are sought after by all factions. A weapon from Farrier is a weapon that won't jam when you need it most."
  },
  {
    id: "gavarra",
    letter: "K",
    name: "Ka Gavarra",
    role: "The Ideologue",
    desc: "The spiritual leader of the Popular Front, inspiring resistance through the canopy.",
    intel: "Ka Gavarra was once a teacher. Now he inspires the Popular Front to see the jungle not as enemy, but as ally. His followers know every tree, every shadow."
  },
  {
    id: "montenegro",
    letter: "M",
    name: "Montenegro",
    role: "The Enforcer",
    desc: "A brutal commander who ensures that the rules of engagement are followed... or else.",
    intel: "Montenegro enforces the Rules of Engagement. Break them, and you answer to him. He's been known to end careers... permanently. Even faction leaders fear his judgment."
  }
];

export function NPCs() {
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [metNPCs, setMetNPCs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('wildfall_user_id');

  const handleMeetNPC = async (npc: NPC) => {
    if (!userId) {
      setMessage('Create a profile to meet NPCs and earn intel points!');
      return;
    }

    // Check if already met
    const { data: existing } = await supabase
      .from('npc_encounters')
      .select('*')
      .eq('operative_id', userId)
      .eq('npc_id', npc.id)
      .single();

    if (existing) {
      setMetNPCs(prev => [...prev, npc.id]);
      setSelectedNPC(npc);
      return;
    }

    // Record encounter and award points
    await supabase.from('npc_encounters').insert([{
      operative_id: userId,
      npc_id: npc.id,
      npc_name: npc.name
    }]);

    // Award +5 points
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

    setMetNPCs(prev => [...prev, npc.id]);
    setSelectedNPC(npc);
    setMessage(`Met ${npc.name}! +5 intel points earned.`);
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <section id="npcs" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono tracking-widest text-gold/70 mb-4 uppercase">
            NPC World
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            THE DENIZENS OF <span className="gold-gradient-text">LAS SOMBRAS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Click any character to meet them and learn their secrets. Each meeting earns +5 intel points.
          </p>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gold/20 border border-gold/50 rounded inline-block"
            >
              <p className="text-gold text-sm font-mono">{message}</p>
            </motion.div>
          )}
        </motion.div>

        {/* NPC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NPCS.map((npc, idx) => (
            <motion.div
              key={npc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleMeetNPC(npc)}
              className={cn(
                "card-premium p-6 cursor-pointer transition-all hover:border-gold group",
                metNPCs.includes(npc.id) && "border-gold/50 bg-gold/5"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Letter Badge */}
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 transition-colors",
                  metNPCs.includes(npc.id) 
                    ? "bg-gold text-black" 
                    : "bg-white/10 text-white group-hover:bg-gold/20"
                )}>
                  {metNPCs.includes(npc.id) ? <Check className="w-6 h-6" /> : npc.letter}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className={cn(
                    "font-serif text-lg font-bold mb-1 transition-colors",
                    metNPCs.includes(npc.id) ? "text-gold" : "group-hover:text-gold"
                  )}>
                    {npc.name}
                  </h3>
                  <p className="text-xs font-mono text-gold/70 uppercase tracking-wider mb-2">
                    {npc.role}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {npc.desc}
                  </p>
                </div>
              </div>
              
              {/* Met indicator */}
              {metNPCs.includes(npc.id) && (
                <div className="mt-4 pt-4 border-t border-gold/20">
                  <span className="text-xs text-gold font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Intel gathered (+5 pts)
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 font-mono">
            💡 Tip: Meeting all 8 NPCs unlocks special recognition in your operative dossier.
          </p>
        </motion.div>
      </div>

      {/* NPC Detail Modal */}
      <Modal
        isOpen={selectedNPC !== null}
        onClose={() => setSelectedNPC(null)}
        title={selectedNPC?.name || ''}
      >
        {selectedNPC && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-bold text-black text-xl">
                {selectedNPC.letter}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">{selectedNPC.name}</h3>
                <p className="text-xs font-mono text-gold uppercase">{selectedNPC.role}</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {selectedNPC.desc}
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs font-mono text-gold/70 uppercase mb-2">Classified Intel</p>
                <p className="text-sm text-gray-400 italic leading-relaxed">
                  "{selectedNPC.intel}"
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedNPC(null)}
                className="flex-1 py-3 border border-white/20 rounded-sm hover:bg-white/5"
              >
                <X className="w-4 h-4 inline mr-2" />
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
