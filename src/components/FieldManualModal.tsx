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
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Infantry</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">The visible force of the battlefield. Transforms movement into control. Required for outpost control and flag transport. Philosophy: "If infantry isn't there, nothing holds."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Medic</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">Each medic has 2 bandages, 20 seconds to revive. Cannot heal themselves. Must return to base or hospital to resupply. Philosophy: "A good Medic doesn't fight the enemy. He fights time."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Engineer</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">The only role that can activate or deactivate outposts. Requires 60 seconds of uninterrupted activation. Cannot operate alone. Philosophy: "Infantry captures. Engineer makes it matter."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Special Forces</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">3-4 players led by XO. Only unit authorized for night operations (4 AM - 7 AM). High-risk missions and prisoner rescue. Philosophy: "They don't hold ground. They change the situation."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Sniper</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">Operates on the edge of the battlefield. Eliminates key targets, provides reconnaissance. Limited ammo. Philosophy: "He doesn't win fights. He decides where they happen."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Spy</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">Disguised as infantry or special forces. Only Captain knows identity. Can interact with NPCs, retrieve codes, hack systems. Philosophy: "The Spy doesn't fight the war. He bends it."</div>
          </div>
          <div className="flex gap-6 pb-6 border-b border-white/5">
            <div className="text-gold font-mono text-sm tracking-widest uppercase w-32">Command</div>
            <div className="text-sm text-white/40 font-serif italic flex-1">Captain has full war app access. XO leads Special Forces and assumes command if Captain falls. Philosophy: "If the team fails, it starts from command."</div>
          </div>
        </div>
      </div>
    ),
    Battlefield: (
      <div className="space-y-8">
        <h4 className="text-3xl font-serif italic text-gold">Strategic Zones</h4>
        <p className="text-white/60 font-serif italic leading-relaxed">60 hectares of dense tropical terrain. Three base camps, three strategic outposts, and one central village.</p>
        
        <div className="p-6 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest mb-4 uppercase">Las Sombras Village</h5>
          <p className="text-sm text-white/40 font-serif italic">Neutral zone where the war pauses, but never disappears. No team can control it. 2 entry tokens per day. Hosts the hospital, armory, and saloon.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 gold-border bg-white/5">
            <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">La Fábrica</h5>
            <p className="text-xs text-white/40">Firepower Control. Grants enhanced weapons and combat upgrades.</p>
          </div>
          <div className="p-4 gold-border bg-white/5">
            <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">El Mirador</h5>
            <p className="text-xs text-white/40">Control of Information. Drone surveillance and enemy tracking.</p>
          </div>
          <div className="p-4 gold-border bg-white/5">
            <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">Sitio Ernesto</h5>
            <p className="text-xs text-white/40">Endurance and Advantage. Faster recovery and forward resupply.</p>
          </div>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">Base Camps</h5>
          <p className="text-xs text-white/40">Camp Bastión, Camp Isabela, Camp Kalayaan. Fully controlled territories with bamboo perimeters, watch towers, barracks, flag towers, prison areas, and War Tents.</p>
        </div>
      </div>
    ),
    Factions: (
      <div className="space-y-8">
        <h4 className="text-3xl font-serif italic text-gold">Three Forces, One Battlefield</h4>
        
        <div className="p-6 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">Légionnaires du Nord — Camp Bastión</h5>
          <p className="text-sm text-white/40 font-serif italic">They come from outside the region, deployed into unfamiliar territory. They operate with discipline and structure, treating the jungle as an operational zone to dominate. They move forward, create pressure, and force confrontation.</p>
        </div>
        
        <div className="p-6 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">National Guard — Camp Isabela</h5>
          <p className="text-sm text-white/40 font-serif italic">They represent order within the region. Tasked with holding ground, protecting key positions, and maintaining stability. They rely on coordination, structure, and discipline, becoming the anchor of the battlefield.</p>
        </div>
        
        <div className="p-6 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest mb-2 uppercase">Popular Front (TPF) — Camp Kalayaan</h5>
          <p className="text-sm text-white/40 font-serif italic">They emerge from within the land itself. An organized rebel movement deeply connected to the terrain and its hidden paths. They rely on timing, positioning, and disruption.</p>
        </div>
      </div>
    ),
    Systems: (
      <div className="space-y-6">
        <h4 className="text-3xl font-serif italic text-gold">Game Systems</h4>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Outpost Capture</h5>
          <p className="text-sm text-white/40 mt-2">Infantry secures perimeter, engineer activates with 60-second hold. If interrupted, fails. Control is never permanent.</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Recovery System</h5>
          <p className="text-sm text-white/40 mt-2">Field death after 3 minutes or headshot. Base camp: 6 min recovery. Hospital: 3 min recovery (2 tickets/day).</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Prisoner System</h5>
          <p className="text-sm text-white/40 mt-2">Captured players generate +3 pending points. Held for 10 minutes: +3 confirmed. Rescue: captor -3, rescuer +5. Only Spy or Special Forces can free prisoners.</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Radio & Communication</h5>
          <p className="text-sm text-white/40 mt-2">No personal phones. Captain communicates with Sniper, XO, and Special Forces. Infantry rely on proximity. Spy operates without radio.</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">War App & Intel</h5>
          <p className="text-sm text-white/40 mt-2">Physical tablet at Starlink locations. Only Captain and Engineer authorized. Manages codes, outposts, weapons, map sectors. Spy and Sniper never visible on GPS.</p>
        </div>
      </div>
    ),
    NPC: (
      <div className="space-y-6">
        <h4 className="text-3xl font-serif italic text-gold">The Living World</h4>
        <p className="text-white/60 font-serif italic">Las Sombras is shaped by strong personalities. NPCs are active forces that guide, manipulate, support, and disrupt the war.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Mr. Hopper</span><p className="text-xs text-white/40 mt-1">The Drone Master. Unstable, obsessive, controls drone surveillance.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Don Santiago</span><p className="text-xs text-white/40 mt-1">Master of Bodega Sandata. Calm, elegant, treats war as business.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Mateo Cruz</span><p className="text-xs text-white/40 mt-1">Keeper of La Tregua. Silent, observant, the only constant.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Doña Esperanza</span><p className="text-xs text-white/40 mt-1">Guardian of La Buena Muerte. Calm, ritualistic, slightly unsettling.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Christopher Landa</span><p className="text-xs text-white/40 mt-1">Camp Bastión Leader. Controlled, intelligent, French-German accent.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Farrier</span><p className="text-xs text-white/40 mt-1">Camp Isabela Leader. Minimal, grumpy, demands discipline.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Ka Gavarra</span><p className="text-xs text-white/40 mt-1">Camp Kalayaan Leader. Charismatic, ideological, connected to land.</p></div>
          <div className="p-3 gold-border bg-white/5"><span className="text-gold font-mono text-xs">Montenegro</span><p className="text-xs text-white/40 mt-1">The Hidden Force. Unpredictable, leads rebel forces on Day 2.</p></div>
        </div>
      </div>
    ),
    Scoring: (
      <div className="space-y-6">
        <h4 className="text-3xl font-serif italic text-gold">Scoring System</h4>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Outpost Control</h5>
          <p className="text-sm text-white/40 mt-2">Activating: +5 | Maintaining 1 outpost (20 min): +3 | 2 outposts: +7 | 3 outposts: +15</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">High-Value Targets</h5>
          <p className="text-sm text-white/40 mt-2">Engineer: +2 | Sniper: +3 | Captain: +5</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Flag Capture</h5>
          <p className="text-sm text-white/40 mt-2">Capturing enemy flag: +10. Defeated team loses all outposts, 5-minute reset.</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Prisoner System</h5>
          <p className="text-sm text-white/40 mt-2">Capture: +3 pending | Hold 10 min: +3 confirmed | Rescue: captor -3, rescuer +5</p>
        </div>
      </div>
    ),
    "Final Phase": (
      <div className="space-y-6">
        <h4 className="text-3xl font-serif italic text-gold">The Recall</h4>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Last Hour</h5>
          <p className="text-sm text-white/40 mt-2">Siren triggers full retreat. All players return to base camps. Outposts deactivated, prisoner system disabled, bonus weapons removed.</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Final Combat</h5>
          <p className="text-sm text-white/40 mt-2">Every kill: +5 | Flag capture: +20 | Last Stand Bonus: +15</p>
          <p className="text-xs text-white/30 mt-2">Medics have limited bandages. Once depleted, eliminations are final.</p>
        </div>
      </div>
    ),
    Operations: (
      <div className="space-y-6">
        <h4 className="text-3xl font-serif italic text-gold">Operations & Investment</h4>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Development CAPEX</h5>
          <p className="text-sm text-white/40 mt-2">Total: ₱3.9M (Terrain, Village, Base Camps, Outposts, Weapons, Tech, Setup)</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Operational Cost (Per Game)</h5>
          <p className="text-sm text-white/40 mt-2">Total: ₱180K (NPC & Staff, Food & Supplies, Logistics)</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Per Event (54 Players)</h5>
          <p className="text-sm text-white/40 mt-2">Revenue: ₱405K | Net Profit: ₱230K | Bar Revenue: +₱25K-40K</p>
        </div>
        
        <div className="p-4 gold-border bg-white/5">
          <h5 className="text-gold font-mono text-xs tracking-widest uppercase">Total Profit</h5>
          <p className="text-sm text-white/40 mt-2">₱250K-270K per event | ₱1M+ monthly potential (4 events/month)</p>
        </div>
      </div>
    ),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FIELD MANUAL — COMPLETE WAR DOCTRINE">
      <div className="flex flex-col md:flex-row gap-12 h-full max-h-[70vh] overflow-hidden">
        <div className="md:w-48 flex flex-col gap-2 overflow-y-auto">
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
        <div className="flex-1 overflow-y-auto pr-2">
          {content[activeTab]}
        </div>
      </div>
    </Modal>
  );
}
