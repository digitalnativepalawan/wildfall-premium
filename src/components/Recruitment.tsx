import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { Modal } from "./Modal";
import { cn } from "../lib/utils";

interface Operative {
  codename: string;
  realName: string;
  phone: string;
  bio: string;
  squad: string;
  faction: string;
  role: string;
  photo: string;
  points: number;
  missionsComplete: number;
  deploymentCode: string;
  clearanceLevel: number;
}

interface MissionData {
  id: number;
  title: string;
  desc: string;
  question: string;
  answer: string;
  points: number;
  unlocked: boolean;
  completed: boolean;
  isText?: boolean;
}

const INITIAL_MISSIONS: MissionData[] = [
  { id: 1, title: "SECURITY CLEARANCE", desc: "Prove your knowledge of Wildfall terrain.", question: "What is the elevation of Wildfall terrain?", answer: "450m", points: 10, unlocked: true, completed: false },
  { id: 2, title: "TERRAIN RECON", desc: "Know the jungle.", question: "What percentage of the terrain is dense jungle?", answer: "85%", points: 10, unlocked: false, completed: false },
  { id: 3, title: "HIDDEN PATHS", desc: "Find the secret routes.", question: "How many hidden paths exist?", answer: "12", points: 10, unlocked: false, completed: false },
  { id: 4, title: "CANOPY CONCEALMENT", desc: "Aerial reconnaissance.", question: "What percentage of concealment does the canopy provide?", answer: "90%", points: 10, unlocked: false, completed: false },
  { id: 5, title: "FIREPOWER CONTROL", desc: "Know the outposts.", question: "Which outpost controls firepower and heavy munitions?", answer: "La Fábrica", points: 15, unlocked: false, completed: false },
  { id: 6, title: "INTEL HUB", desc: "The highest point.", question: "Which outpost is the highest point?", answer: "El Mirador", points: 15, unlocked: false, completed: false },
  { id: 7, title: "ENDURANCE POINT", desc: "The toughest terrain.", question: "Which outpost tests the limits of any squad?", answer: "Sitio Ernesto", points: 15, unlocked: false, completed: false },
  { id: 8, title: "NEUTRAL ZONE", desc: "Where information is currency.", question: "What is the name of the neutral zone village?", answer: "Las Sombras Village", points: 15, unlocked: false, completed: false },
  { id: 9, title: "LEGION PHILOSOPHY", desc: "Order through dominance.", question: "What is the motto of the Légionnaires du Nord?", answer: "Order through dominance", points: 10, unlocked: false, completed: false },
  { id: 10, title: "GUARD PHILOSOPHY", desc: "Peace through control.", question: "What is the motto of the National Guard?", answer: "Peace through control", points: 10, unlocked: false, completed: false },
  { id: 11, title: "FRONT PHILOSOPHY", desc: "Freedom through resistance.", question: "What is the motto of the Popular Front?", answer: "Freedom through resistance", points: 10, unlocked: false, completed: false },
  { id: 12, title: "FACTION OATH", desc: "Swear loyalty.", question: "Write your oath: 'I, [codename], fight for [faction] because...'", answer: "oath", points: 20, unlocked: false, completed: false, isText: true },
  { id: 13, title: "ROLE: INFANTRY", desc: "The backbone.", question: "What is the Infantry's primary role?", answer: "Frontline combatants", points: 10, unlocked: false, completed: false },
  { id: 14, title: "ROLE: MEDIC", desc: "Life-savers.", question: "What is the Medic's primary role?", answer: "Life-savers under fire", points: 10, unlocked: false, completed: false },
  { id: 15, title: "ROLE: ENGINEER", desc: "Fortification experts.", question: "What is the Engineer's specialty?", answer: "Fortification and demolition", points: 10, unlocked: false, completed: false },
  { id: 16, title: "ROLE: SPY", desc: "Infiltration experts.", question: "What is the Spy's primary function?", answer: "Infiltration and intelligence gathering", points: 10, unlocked: false, completed: false },
  { id: 17, title: "NPC: THE BROKER", desc: "Information is power.", question: "Who controls information and tokens in Las Sombras?", answer: "Mr. Hopper", points: 10, unlocked: false, completed: false },
  { id: 18, title: "NPC: THE GUIDE", desc: "Knows every path.", question: "Who knows every hidden path and trap?", answer: "Mateo Cruz", points: 10, unlocked: false, completed: false },
  { id: 19, title: "NPC: THE ENFORCER", desc: "Rules are rules.", question: "Who ensures rules of engagement are followed?", answer: "Montenegro", points: 10, unlocked: false, completed: false },
  { id: 20, title: "NPC: THE IDEOLOGUE", desc: "Spiritual leader.", question: "Who is the spiritual leader of the Popular Front?", answer: "Ka Gavarra", points: 10, unlocked: false, completed: false },
  { id: 21, title: "RECRUITMENT DRIVE", desc: "Build the army.", question: "Recruit 2 operatives. Enter their codenames.", answer: "recruit", points: 25, unlocked: false, completed: false, isText: true },
  { id: 22, title: "SQUAD FORMATION", desc: "A pack survives.", question: "Form a squad (3–5 members). Enter squad name.", answer: "squad", points: 25, unlocked: false, completed: false, isText: true },
  { id: 23, title: "DEPLOYMENT REQUEST", desc: "State your case.", question: "Why should you be deployed? (50 words min)", answer: "request", points: 30, unlocked: false, completed: false, isText: true },
  { id: 24, title: "FINAL CLEARANCE", desc: "The last test.", question: "Type 'READY FOR DEPLOYMENT'", answer: "READY FOR DEPLOYMENT", points: 50, unlocked: false, completed: false },
];

const FACTIONS = [
  { id: "legion", icon: "🔴", name: "Légionnaires du Nord", motto: '"Order through dominance"', badgeClass: "bg-red-900" },
  { id: "guard", icon: "🔵", name: "National Guard", motto: '"Peace through control"', badgeClass: "bg-blue-900" },
  { id: "front", icon: "🟢", name: "Popular Front (TPF)", motto: '"Freedom through resistance"', badgeClass: "bg-green-900" },
];

const ROLES = [
  { id: "infantry", icon: "🔫", name: "INFANTRY", desc: "Frontline combatants" },
  { id: "medic", icon: "💉", name: "MEDIC", desc: "Life-savers under fire" },
  { id: "engineer", icon: "🔧", name: "ENGINEER", desc: "Fortification and demolition" },
  { id: "specialforces", icon: "⭐", name: "SPECIAL FORCES", desc: "High-risk, high-reward" },
  { id: "sniper", icon: "🎯", name: "SNIPER", desc: "Long-range precision" },
  { id: "spy", icon: "🕵️", name: "SPY", desc: "Infiltration and intelligence" },
  { id: "command", icon: "🎖️", name: "COMMAND", desc: "Strategic leadership" },
];

const TABS = [
  { id: "profile" as const, label: "CREATE PROFILE" },
  { id: "leaderboard" as const, label: "LEADERBOARD" },
  { id: "missions" as const, label: "MISSIONS" },
  { id: "dashboard" as const, label: "DASHBOARD" },
];

type TabId = "profile" | "leaderboard" | "missions" | "dashboard";

const inputClass =
  "w-full bg-black border border-white/10 text-white px-3 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-colors";

export function Recruitment() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Operative | null>(null);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [missions, setMissions] = useState<MissionData[]>(INITIAL_MISSIONS);
  const [activeMission, setActiveMission] = useState<MissionData | null>(null);
  const [missionAnswer, setMissionAnswer] = useState("");

  const [codename, setCodename] = useState("");
  const [realName, setRealName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [squad, setSquad] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wildfall_operatives");
    if (saved) setOperatives(JSON.parse(saved));
    const savedAgent = localStorage.getItem("wildfall_current_agent");
    if (savedAgent) setCurrentAgent(JSON.parse(savedAgent));
    const savedMissions = localStorage.getItem("wildfall_missions");
    if (savedMissions) setMissions(JSON.parse(savedMissions));
  }, []);

  const persistOperatives = (ops: Operative[]) => {
    setOperatives(ops);
    localStorage.setItem("wildfall_operatives", JSON.stringify(ops));
  };

  const persistAgent = (agent: Operative) => {
    setCurrentAgent(agent);
    localStorage.setItem("wildfall_current_agent", JSON.stringify(agent));
  };

  const persistMissions = (ms: MissionData[]) => {
    setMissions(ms);
    localStorage.setItem("wildfall_missions", JSON.stringify(ms));
  };

  const createProfile = () => {
    if (!codename || !realName || !phone || !selectedFaction || !selectedRole) {
      alert("Fill all required fields!");
      return;
    }
    const upper = codename.toUpperCase();
    if (operatives.some((op) => op.codename === upper)) {
      alert("Codename taken!");
      return;
    }
    const deploymentCode = `WF-2026-${selectedFaction.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
    const newOp: Operative = {
      codename: upper,
      realName,
      phone,
      bio,
      squad: squad.toUpperCase() || "NONE",
      faction: selectedFaction,
      role: selectedRole,
      photo: "🕵️",
      points: 0,
      missionsComplete: 0,
      deploymentCode,
      clearanceLevel: 1,
    };
    persistOperatives([...operatives, newOp]);
    persistAgent(newOp);
    alert(`Profile Created!\nDeployment Code: ${deploymentCode}`);
    setActiveTab("dashboard");
  };

  const openMission = (id: number) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission || mission.completed) return;
    if (!currentAgent) {
      alert("Create a profile first!");
      setActiveTab("profile");
      return;
    }
    setActiveMission(mission);
    setMissionAnswer("");
  };

  const submitMission = () => {
    if (!activeMission || !currentAgent) return;
    const answer = missionAnswer.trim();
    const correct = activeMission.isText
      ? answer.length > 10
      : answer.toLowerCase() === activeMission.answer.toLowerCase();

    if (correct) {
      persistMissions(
        missions.map((m) => {
          if (m.id === activeMission.id) return { ...m, completed: true };
          if (m.id === activeMission.id + 1) return { ...m, unlocked: true };
          return m;
        })
      );
      const updated: Operative = {
        ...currentAgent,
        points: currentAgent.points + activeMission.points,
        missionsComplete: currentAgent.missionsComplete + 1,
        clearanceLevel: Math.min(10, Math.floor((currentAgent.missionsComplete + 1) / 2.4) + 1),
      };
      persistOperatives(operatives.map((o) => (o.codename === updated.codename ? updated : o)));
      persistAgent(updated);
      alert(`Mission Complete! +${activeMission.points} points`);
      setActiveMission(null);
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  const sortedOperatives = [...operatives].sort((a, b) => b.points - a.points);

  const getFactionLabel = (id: string) => {
    const f = FACTIONS.find((f) => f.id === id);
    return f ? `${f.icon} ${f.name}` : id;
  };

  const getFactionBadge = (id: string) => FACTIONS.find((f) => f.id === id)?.badgeClass ?? "bg-white/10";

  return (
    <section id="deploy" className="py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-gold/30 bg-gold/5 text-gold text-[10px] font-mono tracking-[0.2em] mb-8">
            <Shield className="w-3 h-3" />
            OPERATIVE RECRUITMENT
          </div>
          <h2 className="text-5xl md:text-7xl font-serif mb-4 leading-tight">
            Deploy Your <span className="gold-gradient-text italic">Operative</span>
          </h2>
          <p className="text-sm text-white/40 font-serif italic">
            Free registration. Complete all missions to earn deployment.
          </p>
        </motion.div>

        {/* Slot Counter */}
        <div className="card-premium max-w-md mb-12">
          <div className="text-sm font-mono mb-3">
            🎖{" "}
            <span className="text-gold text-lg font-bold">{operatives.length}</span>
            <span className="text-white/40">/100 OPERATIVES REGISTERED</span>
          </div>
          <div className="w-full h-0.5 bg-white/10">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${Math.min(100, operatives.length)}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-white/20 mt-3 tracking-widest">
            NEXT DEPLOYMENT: 58 DAYS
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-4 text-[10px] font-mono tracking-widest whitespace-nowrap transition-all border-b-2",
                activeTab === tab.id
                  ? "text-gold border-gold"
                  : "text-white/40 border-transparent hover:text-white/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CREATE PROFILE ── */}
        {activeTab === "profile" && (
          <div className="card-premium">
            <h3 className="text-2xl font-serif text-gold mb-6 tracking-widest">
              CREATE OPERATIVE PROFILE
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">
                  PROFILE PHOTO
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:border file:border-gold/30 file:bg-transparent file:text-gold file:font-mono file:text-[10px] file:tracking-widest file:cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">CODENAME</label>
                <input type="text" value={codename} onChange={(e) => setCodename(e.target.value)} placeholder="e.g., GHOST_07" className={inputClass} />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">REAL NAME</label>
                <input type="text" value={realName} onChange={(e) => setRealName(e.target.value)} placeholder="Full Name" className={inputClass} />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">WHATSAPP NUMBER</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 XXX XXX XXXX" className={inputClass} />
              </div>

              {/* Faction */}
              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-3">
                  CHOOSE YOUR FACTION
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {FACTIONS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFaction(f.id)}
                      className={cn(
                        "card-premium text-center p-6 cursor-pointer transition-all",
                        selectedFaction === f.id && "border-gold/50 bg-gold/5"
                      )}
                    >
                      <div className="text-3xl mb-3">{f.icon}</div>
                      <div className="font-serif font-bold text-sm mb-1">{f.name}</div>
                      <div className="text-[10px] text-white/40 italic">{f.motto}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-3">
                  CHOOSE YOUR ROLE
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={cn(
                        "card-premium p-3 text-left cursor-pointer transition-all",
                        selectedRole === r.id && "border-gold/50 bg-gold/5"
                      )}
                    >
                      <div className="text-xl mb-2">{r.icon}</div>
                      <div className="text-[10px] font-mono font-bold text-white">{r.name}</div>
                      <div className="text-[10px] text-white/40 mt-1">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">YOUR STORY</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 150))}
                  rows={3}
                  placeholder="Who are you in the jungle?"
                  className={cn(inputClass, "resize-none")}
                />
                <div className="text-right text-[10px] font-mono text-white/20 mt-1">{bio.length}/150</div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gold tracking-widest mb-2">
                  SQUAD NAME <span className="text-white/20">(Optional)</span>
                </label>
                <input type="text" value={squad} onChange={(e) => setSquad(e.target.value)} placeholder="e.g., ALPHA TEAM" className={inputClass} />
              </div>

              <button
                type="button"
                onClick={createProfile}
                className="w-full py-4 bg-gold text-black font-mono font-bold text-sm tracking-[0.2em] hover:bg-white transition-colors duration-300"
              >
                DEPLOY PROFILE
              </button>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD ── */}
        {activeTab === "leaderboard" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif text-gold">OPERATIVE LEADERBOARD</h3>
              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                {operatives.length}/100 OPERATIVES
              </span>
            </div>

            <div className="border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    {["RANK", "OPERATIVE", "FACTION", "ROLE", "LEVEL", "POINTS"].map((h) => (
                      <th key={h} className="px-4 py-4 text-left text-[10px] font-mono text-gold tracking-widest font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedOperatives.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center text-white/40 font-serif italic">
                        No operatives yet. Create a profile.
                      </td>
                    </tr>
                  ) : (
                    sortedOperatives.map((op, idx) => (
                      <tr
                        key={op.codename}
                        className={cn(
                          "border-b border-white/5 transition-colors hover:bg-white/5",
                          idx === 0 && "bg-gradient-to-r from-gold/10 to-transparent"
                        )}
                      >
                        <td className="px-4 py-4 font-mono text-sm">
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                        </td>
                        <td className="px-4 py-4 font-mono text-sm">{op.photo} {op.codename}</td>
                        <td className="px-4 py-4">
                          <span className={cn("px-2 py-1 text-[10px] font-mono text-white", getFactionBadge(op.faction))}>
                            {getFactionLabel(op.faction)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-white/60 font-mono uppercase">{op.role}</td>
                        <td className="px-4 py-4 text-sm text-white/60 font-mono">{op.clearanceLevel}/10</td>
                        <td className="px-4 py-4 text-sm font-mono text-gold">{op.points}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setActiveTab("profile")}
                className="px-8 py-3 border border-gold/30 text-gold font-mono text-[10px] tracking-widest hover:bg-gold/10 transition-colors"
              >
                CREATE YOUR PROFILE
              </button>
            </div>
          </div>
        )}

        {/* ── MISSIONS ── */}
        {activeTab === "missions" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-serif text-gold">ACTIVE MISSIONS</h3>
              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                {missions.filter((m) => m.completed).length}/24 COMPLETED
              </span>
            </div>
            <p className="text-sm text-white/40 font-serif italic mb-8">
              Complete all 24 missions to earn deployment clearance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "card-premium transition-all",
                    m.completed && "border-gold/50",
                    !m.unlocked && "opacity-50"
                  )}
                >
                  <div className="text-[10px] font-mono text-gold tracking-widest mb-2">
                    MISSION {m.id}
                  </div>
                  <div className="font-serif font-bold mb-2">{m.title}</div>
                  <div className="text-xs text-white/40 mb-3">{m.desc}</div>
                  <div className="text-[10px] font-mono text-gold mb-4">+{m.points} POINTS</div>

                  {m.completed ? (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gold">
                      <CheckCircle className="w-3 h-3" /> COMPLETED
                    </div>
                  ) : m.unlocked ? (
                    <button
                      onClick={() => openMission(m.id)}
                      className="px-4 py-2 border border-gold/30 text-gold font-mono text-[10px] tracking-widest hover:bg-gold/10 transition-colors"
                    >
                      START MISSION
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
                      <Lock className="w-3 h-3" /> LOCKED
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div>
            <h3 className="text-2xl font-serif text-gold mb-8">OPERATIVE DASHBOARD</h3>

            {!currentAgent ? (
              <div className="card-premium text-center py-16">
                <p className="text-white/40 font-serif italic mb-6">
                  No profile found. Create your operative profile first.
                </p>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="px-8 py-3 border border-gold/30 text-gold font-mono text-[10px] tracking-widest hover:bg-gold/10 transition-colors"
                >
                  CREATE PROFILE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Identity */}
                <div className="card-premium">
                  <div className="w-20 h-20 border border-gold/50 bg-white/5 flex items-center justify-center text-4xl mb-4">
                    {currentAgent.photo}
                  </div>
                  <h4 className="text-xl font-serif text-gold mb-2">{currentAgent.codename}</h4>
                  <p className="text-sm text-white/60 mb-1">{getFactionLabel(currentAgent.faction)}</p>
                  <p className="text-[10px] font-mono text-white/40 tracking-widest">
                    {currentAgent.role.toUpperCase()}
                  </p>
                  <p className="text-[10px] font-mono text-white/20 mt-1 tracking-widest">
                    SQUAD: {currentAgent.squad}
                  </p>
                </div>

                {/* Progress */}
                <div className="card-premium">
                  <div className="text-[10px] font-mono text-gold tracking-widest mb-6">PROGRESS</div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-white/40 mb-2">
                        <span>CLEARANCE LEVEL</span>
                        <span className="text-gold">{currentAgent.clearanceLevel}/10</span>
                      </div>
                      <div className="w-full h-0.5 bg-white/10">
                        <div
                          className="h-full bg-gold transition-all duration-500"
                          style={{ width: `${currentAgent.clearanceLevel * 10}%` }}
                        />
                      </div>
                    </div>
                    {[
                      { label: "MISSIONS", value: `${currentAgent.missionsComplete}/24` },
                      { label: "POINTS", value: currentAgent.points, gold: true },
                      { label: "GLOBAL RANK", value: `#${sortedOperatives.findIndex((o) => o.codename === currentAgent.codename) + 1}` },
                    ].map(({ label, value, gold }) => (
                      <div key={label} className="flex justify-between text-sm font-mono">
                        <span className="text-white/40">{label}</span>
                        <span className={gold ? "text-gold" : ""}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment */}
                <div className="card-premium">
                  <div className="text-[10px] font-mono text-gold tracking-widest mb-6">DEPLOYMENT STATUS</div>
                  <div className="text-[10px] font-mono text-white/40 mb-2 tracking-widest">DEPLOYMENT CODE</div>
                  <div className="text-sm font-mono text-gold mb-6 border border-gold/20 px-3 py-2 bg-gold/5">
                    {currentAgent.deploymentCode}
                  </div>
                  {currentAgent.missionsComplete >= 24 ? (
                    <button
                      onClick={() => alert("Booking opens soon! 15% discount")}
                      className="w-full py-3 bg-gold text-black font-mono font-bold text-[10px] tracking-widest hover:bg-white transition-colors"
                    >
                      BOOK NOW — 15% DISCOUNT
                    </button>
                  ) : (
                    <p className="text-[10px] font-mono text-white/40 tracking-widest leading-relaxed">
                      {24 - currentAgent.missionsComplete} MISSIONS REMAINING FOR DEPLOYMENT CLEARANCE
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mission Modal */}
      <Modal
        isOpen={!!activeMission}
        onClose={() => setActiveMission(null)}
        title={activeMission ? `MISSION ${activeMission.id}: ${activeMission.title}` : ""}
      >
        {activeMission && (
          <div className="space-y-6">
            <p className="text-white/60 font-serif italic">{activeMission.desc}</p>
            <div className="border-l-2 border-gold/30 pl-4">
              <p className="text-sm font-sans">{activeMission.question}</p>
            </div>
            <input
              type="text"
              value={missionAnswer}
              onChange={(e) => setMissionAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitMission()}
              placeholder="Your answer"
              className={inputClass}
              autoFocus
            />
            <div className="flex gap-4">
              <button
                onClick={submitMission}
                className="flex-1 py-3 bg-gold text-black font-mono font-bold text-[10px] tracking-widest hover:bg-white transition-colors"
              >
                SUBMIT
              </button>
              <button
                onClick={() => setActiveMission(null)}
                className="px-6 py-3 border border-white/10 text-white/60 font-mono text-[10px] tracking-widest hover:border-gold/30 hover:text-gold transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
