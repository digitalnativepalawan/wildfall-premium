import { useState } from "react";
import { Modal } from "./Modal";
import { cn } from "../lib/utils";

export function FieldManualModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Experience");

  const tabs = [
    "Experience", "Roles", "Battlefield", "Factions", "Systems", "NPC", "Scoring", "Final Phase", "Operations"
  ];

  const content: Record<string, React.ReactNode> = {
    Experience: (
      <div className="space-y-8">
        <h4 className="text-3xl font-serif italic text-gold">The Wildfall Experience</h4>
        <p className="text-white/60 font-serif italic leading-relaxed">
          Wildfall is a 48-hour immersive simulation that pushes the boundaries of tactical engagement. 
          Participants are not just players; they are operatives in a living, breathing war zone. 
          From the moment of extraction to the final recall, every decision matters.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 gold-border bg-white/5">
            <h5 className="text-gold font-mono text-xs tracking-widest mb-4 uppercase">Tactical Realism</h5>
            <p className="text-sm text-white/40 font-serif italic">
              Utilizing state-of-the-art simulation weaponry and real-time tracking, Wildfall provides a level of realism 
              unmatched in any other live-action event.
            </p>
          </div>
          <div className="p-6 gold-border bg-white/5">
            <h5 className="text-gold font-mono text-xs tracking-widest mb-4 uppercase">Environmental Mastery</h5>
            <p className="text-sm text-white/40 font-serif italic">
              The jungle is not just a backdrop; it is a participant. Operatives must learn to navigate, 
              survive, and utilize the terrain to their advantage.
            </p>
          </div>
        </div>
      </div>
    ),
    Roles: (
      <div className="space-y-8">
        <h4 className="text-3xl font-serif italic text-gold">Operational Doctrines</h4>
        <p className="text-white/60 font-serif italic leading-relaxed">
          Every operative must specialize. Your role defines your contribution to the faction and your survival in the jungle.
        </p>
        <div className="space-y-6">
          {[
            { name: "Infantry", doc: "The hammer of the faction. Mastery of suppression and maneuver." },
            { name: "Medic", doc: "The guardian of the unit. Advanced trauma care under fire." },
            { name: "Engineer", doc: "The architect of the battlefield. Fortification and demolition." },
            { name: "Special Forces", doc: "The silent blade. Infiltration and high-value target elimination." },
            { name: "Sniper", doc: "The ghost of the canopy. Long-range precision and reconnaissance." },
            { name: "Spy", doc: "The shadow in the village. Intelligence and sabotage." },
            { name: "Command", doc: "The mind of the machine. Strategic coordination and logistics." }
          ].map(role => (
            <div key={role.name} className="flex gap-6 pb-6 border-b border-white/5">
              <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">{role.name}</div>
              <div className="text-sm text-white/40 font-serif italic flex-1">{role.doc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    // Add more tabs as needed, or keep it concise for now
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FIELD MANUAL — COMPLETE WAR DOCTRINE">
      <div className="flex flex-col md:flex-row gap-12 h-full">
        <div className="md:w-48 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-left px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all",
                activeTab === tab ? "bg-gold text-black font-bold" : "text-white/40 hover:text-gold hover:bg-gold/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {content[activeTab] || (
            <div className="flex flex-col items-center justify-center h-64 text-white/20">
              <p className="font-mono text-xs tracking-widest">DATA ENCRYPTED — ACCESS GRANTED IN FULL VERSION</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
