/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Wildfall Operative Recruitment System
 * Design: Gold #C5A028, Black, White
 * Fonts: Playfair Display (headings), JetBrains Mono (labels), Inter (body)
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Heart, Settings, Target, Crosshair, Eye, Crown,
  Sword, Trees, Users, Trophy, Package, Search,
  Lock, Check, X, LogIn
} from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

// ============================================
// TYPES
// ============================================

type Faction = 'legion' | 'guard' | 'front';
type Role = 'infantry' | 'medic' | 'engineer' | 'specialforces' | 'sniper' | 'spy' | 'command';

interface Operative {
  id: string;
  codename: string;
  faction: Faction;
  role: Role;
  bio: string | null;
  squad_name: string | null;
  clearance_level: number;
  missions_complete: number;
  points: number;
  deployment_code: string;
  created_at: string;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  intel_brief: string;
  question: string;
  answer: string;
  hint: string | null;
  points: number;
  unlock_level: number;
  week: number;
  completed: boolean;
}

// ============================================
// FACTION & ROLE CONFIG
// ============================================

const FACTION_CONFIG = {
  legion: { 
    name: "Légionnaires du Nord", 
    Icon: Sword,
    motto: '"The jungle is chaos. We are the structure that tames it."',
    bonus: '+10% outpost points'
  },
  guard: { 
    name: 'National Guard', 
    Icon: Shield,
    motto: '"Security is not a privilege. It is a mandate we enforce."',
    bonus: '+1 extra life'
  },
  front: { 
    name: 'Popular Front', 
    Icon: Trees,
    motto: '"They call us rebels. We call ourselves the rightful owners of the canopy."',
    bonus: '+5 stealth bonus'
  }
};

const ROLE_CONFIG = {
  infantry: { name: 'Infantry', Icon: Crosshair, desc: 'Frontline combatants' },
  medic: { name: 'Medic', Icon: Heart, desc: 'Life-savers under fire' },
  engineer: { name: 'Engineer', Icon: Settings, desc: 'Fortification experts' },
  specialforces: { name: 'Special Forces', Icon: Target, desc: 'Elite tactical specialists' },
  sniper: { name: 'Sniper', Icon: Crosshair, desc: 'Long-range precision' },
  spy: { name: 'Spy', Icon: Eye, desc: 'Intelligence gathering' },
  command: { name: 'Command', Icon: Crown, desc: 'Strategic leadership' }
};

// ============================================
// MAIN COMPONENT
// ============================================

export function Recruitment() {
  const [activeTab, setActiveTab] = useState<'create' | 'leaderboard' | 'missions' | 'dashboard'>('create');
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [currentUser, setCurrentUser] = useState<Operative | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  
  const [formData, setFormData] = useState({
    codename: '',
    faction: '' as Faction | '',
    role: '' as Role | '',
    bio: '',
    squad: ''
  });
  
  const [loginCode, setLoginCode] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [missionAnswer, setMissionAnswer] = useState('');

  // ============================================
  // FETCH DATA
  // ============================================

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    const { data: opsData } = await supabase
      .from('operatives')
      .select('*')
      .order('points', { ascending: false });
    
    if (opsData) setOperatives(opsData);
    
    const { data: missionsData } = await supabase
      .from('missions')
      .select('*')
      .order('id');
    
    if (missionsData) setMissions(missionsData.map(m => ({ ...m, completed: false })));
    
    const savedUserId = localStorage.getItem('wildfall_user_id');
    if (savedUserId && opsData) {
      const user = opsData.find(o => o.id === savedUserId);
      if (user) {
        setCurrentUser(user);
        
        const { data: completions } = await supabase
          .from('mission_completions')
          .select('mission_id')
          .eq('operative_id', user.id);
        
        if (completions && missionsData) {
          const completedIds = completions.map(c => c.mission_id);
          setMissions(missionsData.map(m => ({
            ...m,
            completed: completedIds.includes(m.id)
          })));
        }
      }
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ============================================
  // ACTIONS
  // ============================================

  const handleCreateProfile = async () => {
    if (!formData.codename || !formData.faction || !formData.role) return;
    
    const { data, error } = await supabase
      .from('operatives')
      .insert([{
        codename: formData.codename,
        faction: formData.faction,
        role: formData.role,
        bio: formData.bio || null,
        squad_name: formData.squad || null
      }])
      .select()
      .single();
    
    if (data) {
      setCurrentUser(data);
      localStorage.setItem('wildfall_user_id', data.id);
      setActiveTab('dashboard');
      fetchData();
    }
  };

  const handleLogin = async () => {
    if (!loginCode.trim()) return;
    
    const { data, error } = await supabase
      .from('operatives')
      .select('*')
      .eq('deployment_code', loginCode.trim().toUpperCase())
      .single();
    
    if (data) {
      setCurrentUser(data);
      localStorage.setItem('wildfall_user_id', data.id);
      setLoginCode('');
      setLoginError('');
      setShowLogin(false);
      fetchData();
    } else {
      setLoginError('Invalid deployment code. Check your code and try again.');
    }
  };

  const handleCompleteMission = async () => {
    if (!selectedMission || !currentUser) return;
    
    const isCorrect = missionAnswer.toLowerCase().trim().includes(selectedMission.answer.toLowerCase());
    
    if (!isCorrect) {
      alert('Incorrect answer. Try again.');
      return;
    }
    
    await supabase.from('mission_completions').insert([{
      operative_id: currentUser.id,
      mission_id: selectedMission.id,
      answer_submitted: missionAnswer,
      points_earned: selectedMission.points
    }]);
    
    const newPoints = currentUser.points + selectedMission.points;
    const newMissionsComplete = currentUser.missions_complete + 1;
    const newClearance = Math.min(10, Math.floor(newMissionsComplete / 2) + 1);
    
    await supabase.from('operatives').update({
      points: newPoints,
      missions_complete: newMissionsComplete,
      clearance_level: newClearance
    }).eq('id', currentUser.id);
    
    setSelectedMission(null);
    setMissionAnswer('');
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem('wildfall_user_id');
    setCurrentUser(null);
    setActiveTab('create');
  };

  const getUserRank = () => {
    if (!currentUser) return 0;
    return operatives.findIndex(o => o.id === currentUser.id) + 1;
  };

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <section id="deploy" className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="font-mono text-gold/70">Loading operative database...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="deploy" className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-gold" />
            <span className="text-sm font-mono tracking-widest text-gold/70 uppercase">
              Operative Program
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gold-gradient-text">
            BECOME AN OPERATIVE
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create your profile. Choose your faction. Complete missions. Deploy to the jungle.
          </p>
        </motion.div>

        {/* SLOT COUNTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-sm p-4 mb-8 text-center border border-white/10"
        >
          <p className="text-2xl">
            <span className="text-gold font-bold">{operatives.length}</span>
            <span className="text-gray-400">/100</span> operatives deployed
          </p>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2 max-w-md mx-auto">
            <div 
              className="bg-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (operatives.length / 100) * 100)}%` }}
            />
          </div>
        </motion.div>

        {/* TABS */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'create', label: currentUser ? 'My Profile' : 'Create / Login', icon: Shield },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'missions', label: 'Missions', icon: Target },
            { id: 'dashboard', label: 'Dashboard', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-sm font-mono text-xs tracking-wider transition-all border",
                activeTab === tab.id
                  ? "bg-gold text-black border-gold"
                  : "bg-transparent text-white/60 border-white/10 hover:text-white hover:border-white/30"
              )}
            >
              <tab.icon className="w-4 h-4 inline mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          
          {/* CREATE / LOGIN TAB */}
          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {currentUser ? (
                // LOGGED IN: Show profile summary
                <div className="card-premium p-8 text-center">
                  <div className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center border-2 mx-auto mb-4",
                    currentUser.faction === 'legion' && "border-red-400 bg-red-900/20",
                    currentUser.faction === 'guard' && "border-blue-400 bg-blue-900/20",
                    currentUser.faction === 'front' && "border-green-400 bg-green-900/20"
                  )}>
                    {(() => {
                      const Icon = FACTION_CONFIG[currentUser.faction].Icon;
                      return <Icon className={cn("w-12 h-12",
                        currentUser.faction === 'legion' && "text-red-400",
                        currentUser.faction === 'guard' && "text-blue-400",
                        currentUser.faction === 'front' && "text-green-400"
                      )} />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">{currentUser.codename}</h3>
                  <p className="text-gold mb-1">{FACTION_CONFIG[currentUser.faction].name}</p>
                  <p className="text-gray-400 mb-4">{ROLE_CONFIG[currentUser.role].name}</p>
                  <p className="text-sm text-gray-500 mb-6 font-mono">
                    Deployment Code: <span className="text-gold">{currentUser.deployment_code}</span>
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="px-6 py-3 bg-gold text-black font-bold rounded-sm"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 border border-white/20 text-white font-bold rounded-sm hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : showLogin ? (
                // LOGIN FORM
                <div className="max-w-md mx-auto">
                  <button
                    onClick={() => { setShowLogin(false); setLoginError(''); }}
                    className="text-sm text-gold mb-4 hover:underline"
                  >
                    ← Back to Create Profile
                  </button>
                  
                  <div className="card-premium p-8">
                    <div className="text-center mb-6">
                      <LogIn className="w-12 h-12 text-gold mx-auto mb-4" />
                      <h3 className="text-xl font-serif font-bold">Operative Login</h3>
                      <p className="text-sm text-gray-400 mt-2">
                        Enter your deployment code to access your profile
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-gold/70 tracking-widest uppercase mb-2">
                          Deployment Code
                        </label>
                        <input
                          type="text"
                          value={loginCode}
                          onChange={(e) => setLoginCode(e.target.value)}
                          placeholder="e.g., WF-2026-LEG-451"
                          className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none font-mono uppercase"
                        />
                        {loginError && (
                          <p className="text-red-400 text-sm mt-2">{loginError}</p>
                        )}
                      </div>
                      
                      <button
                        onClick={handleLogin}
                        disabled={!loginCode.trim()}
                        className="w-full py-4 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition disabled:opacity-50"
                      >
                        <LogIn className="w-5 h-5 inline mr-2" />
                        ACCESS PROFILE
                      </button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-900 rounded-sm border border-white/5">
                      <p className="text-xs text-gray-400 text-center">
                        Your deployment code was shown after you created your profile.<br/>
                        Example format: <span className="text-gold font-mono">WF-2026-LEG-451</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // CHOICE: Create New or Login
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Create New */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogin(false)}
                    className="card-premium p-8 text-left h-full"
                  >
                    <Shield className="w-12 h-12 text-gold mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-2">Create New Profile</h3>
                    <p className="text-gray-400 mb-4">
                      Join the Wildfall operative program. Choose your faction and role.
                    </p>
                    <span className="text-gold text-sm font-mono">Get Started →</span>
                  </motion.button>
                  
                  {/* Login */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogin(true)}
                    className="card-premium p-8 text-left h-full border-gold/30"
                  >
                    <LogIn className="w-12 h-12 text-gold mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-2">Existing Operative</h3>
                    <p className="text-gray-400 mb-4">
                      Already have a deployment code? Login to continue your training.
                    </p>
                    <span className="text-gold text-sm font-mono">Enter Code →</span>
                  </motion.button>
                </div>
              )}

              {/* CREATE PROFILE FORM (only show if not logged in and not showing login) */}
              {!currentUser && !showLogin && (
                <div className="mt-8">
                  <h3 className="text-lg font-serif mb-6 text-center">Create New Operative Profile</h3>
                  
                  {/* Faction Selection */}
                  <div>
                    <p className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-4">
                      Choose Your Faction
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(FACTION_CONFIG).map(([key, config]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, faction: key as Faction })}
                          className={cn(
                            "card-premium p-6 text-left transition-all",
                            formData.faction === key && "border-gold bg-gold/5"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <config.Icon className={cn("w-8 h-8",
                              key === 'legion' && "text-red-400",
                              key === 'guard' && "text-blue-400",
                              key === 'front' && "text-green-400"
                            )} />
                            <h4 className="font-serif font-bold text-lg">{config.name}</h4>
                          </div>
                          <p className="text-sm text-gray-400 italic mb-2">{config.motto}</p>
                          <p className="text-sm text-gold">{config.bonus}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="mt-8">
                    <p className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-4">
                      Choose Your Role
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, role: key as Role })}
                          className={cn(
                            "card-premium p-4 text-center transition-all",
                            formData.role === key && "border-gold bg-gold/5"
                          )}
                        >
                          <config.Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                          <h4 className="font-bold">{config.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">{config.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div>
                      <label className="block text-xs font-mono text-gold/70 tracking-widest uppercase mb-2">
                        Codename
                      </label>
                      <input
                        type="text"
                        value={formData.codename}
                        onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                        placeholder="e.g., Ghost_07"
                        className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gold/70 tracking-widest uppercase mb-2">
                        Squad Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.squad}
                        onChange={(e) => setFormData({ ...formData, squad: e.target.value })}
                        placeholder="e.g., Alpha Team"
                        className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mt-4">
                    <label className="block text-xs font-mono text-gold/70 tracking-widest uppercase mb-2">
                      Your Story (Max 150 Characters)
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      maxLength={150}
                      placeholder="Who are you in the jungle?"
                      className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none resize-none h-24"
                    />
                    <p className="text-right text-xs text-gray-500 mt-1 font-mono">
                      {formData.bio.length}/150
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleCreateProfile}
                    disabled={!formData.codename || !formData.faction || !formData.role}
                    className="w-full mt-6 py-4 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Shield className="w-5 h-5 inline mr-2" />
                    DEPLOY PROFILE
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-gray-900 rounded-sm overflow-hidden border border-white/10">
                <table className="w-full">
                  <thead className="bg-gold/20">
                    <tr>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">RANK</th>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">OPERATIVE</th>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">FACTION</th>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">ROLE</th>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">LEVEL</th>
                      <th className="p-4 text-left font-mono text-xs tracking-wider text-gold">POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operatives.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-400">
                          No operatives deployed yet. Be the first!
                        </td>
                      </tr>
                    ) : (
                      operatives.map((op, index) => (
                        <tr 
                          key={op.id}
                          className={cn(
                            "border-b border-white/5 hover:bg-white/5 transition",
                            index === 0 && "bg-yellow-900/10",
                            index === 1 && "bg-gray-600/10",
                            index === 2 && "bg-orange-900/10"
                          )}
                        >
                          <td className="p-4">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </td>
                          <td className="p-4">
                            <span className={cn(
                              currentUser?.id === op.id && "text-gold font-bold"
                            )}>
                              {op.codename}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={cn(
                              "px-3 py-1 rounded-sm text-xs font-mono",
                              op.faction === 'legion' && "bg-red-900/30 text-red-400",
                              op.faction === 'guard' && "bg-blue-900/30 text-blue-400",
                              op.faction === 'front' && "bg-green-900/30 text-green-400"
                            )}>
                              {FACTION_CONFIG[op.faction].name.split(' ')[0]}
                            </span>
                          </td>
                          <td className="p-4 capitalize">{ROLE_CONFIG[op.role].name}</td>
                          <td className="p-4 font-mono">{op.clearance_level}/10</td>
                          <td className="p-4 font-bold text-gold font-mono">{op.points}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* MISSIONS */}
          {activeTab === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!currentUser ? (
                <div className="text-center py-12">
                  <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Create a profile or login to access missions</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 px-6 py-2 bg-gold text-black font-bold rounded-sm"
                  >
                    Go to Login
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {missions.map((mission) => {
                    const isUnlocked = currentUser.clearance_level >= mission.unlock_level;
                    return (
                      <motion.button
                        key={mission.id}
                        whileHover={isUnlocked && !mission.completed ? { scale: 1.02 } : {}}
                        onClick={() => isUnlocked && !mission.completed && setSelectedMission(mission)}
                        className={cn(
                          "card-premium p-6 text-left transition-all",
                          mission.completed && "border-green-600/30 opacity-75",
                          !isUnlocked && "opacity-50 cursor-not-allowed",
                          isUnlocked && !mission.completed && "hover:border-gold cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Target className={cn(
                            "w-5 h-5",
                            mission.completed ? "text-green-400" : "text-gold"
                          )} />
                          <span className="text-xs font-mono text-gray-400">Mission {mission.id}</span>
                        </div>
                        <h4 className="font-serif font-bold mb-2">{mission.title}</h4>
                        <p className="text-sm text-gray-400">{mission.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-gold font-bold font-mono">+{mission.points} pts</span>
                          {mission.completed && <Check className="w-5 h-5 text-green-400" />}
                          {!isUnlocked && (
                            <span className="text-xs text-gray-500 font-mono">Lvl {mission.unlock_level} required</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!currentUser ? (
                <div className="text-center py-12">
                  <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Create a profile or login to view dashboard</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 px-6 py-2 bg-gold text-black font-bold rounded-sm"
                  >
                    Go to Login
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Profile Card */}
                  <div className="card-premium p-6">
                    <div className="flex items-start gap-6">
                      <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center border-2",
                        currentUser.faction === 'legion' && "border-red-400 bg-red-900/20",
                        currentUser.faction === 'guard' && "border-blue-400 bg-blue-900/20",
                        currentUser.faction === 'front' && "border-green-400 bg-green-900/20"
                      )}>
                        {(() => {
                          const Icon = FACTION_CONFIG[currentUser.faction].Icon;
                          return <Icon className={cn("w-12 h-12",
                            currentUser.faction === 'legion' && "text-red-400",
                            currentUser.faction === 'guard' && "text-blue-400",
                            currentUser.faction === 'front' && "text-green-400"
                          )} />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold mb-1">{currentUser.codename}</h3>
                        <p className="text-gold mb-2">{FACTION_CONFIG[currentUser.faction].name}</p>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span>{ROLE_CONFIG[currentUser.role].name}</span>
                          {currentUser.squad_name && <span>• {currentUser.squad_name}</span>}
                        </div>
                        {currentUser.bio && (
                          <p className="text-sm text-gray-400 mt-2 italic">
                            "{currentUser.bio}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-black rounded-sm p-4 text-center border border-white/10">
                        <p className="text-xs font-mono text-gray-400">CLEARANCE</p>
                        <p className="text-2xl font-bold text-gold mt-1">{currentUser.clearance_level}/10</p>
                      </div>
                      <div className="bg-black rounded-sm p-4 text-center border border-white/10">
                        <p className="text-xs font-mono text-gray-400">MISSIONS</p>
                        <p className="text-2xl font-bold text-gold mt-1">{currentUser.missions_complete}/16</p>
                      </div>
                      <div className="bg-black rounded-sm p-4 text-center border border-white/10">
                        <p className="text-xs font-mono text-gray-400">POINTS</p>
                        <p className="text-2xl font-bold text-gold mt-1">{currentUser.points}</p>
                      </div>
                      <div className="bg-black rounded-sm p-4 text-center border border-white/10">
                        <p className="text-xs font-mono text-gray-400">RANK</p>
                        <p className="text-2xl font-bold text-gold mt-1">#{getUserRank()}</p>
                      </div>
                    </div>

                    {/* Deployment Code */}
                    <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-sm">
                      <p className="text-xs font-mono text-gold/70 mb-1">DEPLOYMENT CODE</p>
                      <p className="text-xl font-mono text-gold font-bold">{currentUser.deployment_code}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Save this code! You need it to login on other devices.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveTab('missions')}
                      className="px-6 py-3 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition"
                    >
                      <Target className="w-4 h-4 inline mr-2" />
                      Continue Missions
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 border border-white/20 text-white font-bold rounded-sm hover:bg-white/5 transition"
                    >
                      <X className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MISSION MODAL */}
      <Modal
        isOpen={selectedMission !== null}
        onClose={() => {
          setSelectedMission(null);
          setMissionAnswer('');
        }}
        title={`Mission ${selectedMission?.id}: ${selectedMission?.title}`}
      >
        {selectedMission && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
              <p className="text-xs font-mono text-gold tracking-wider mb-2">INTEL BRIEF</p>
              <p className="text-sm text-gray-300">{selectedMission.intel_brief}</p>
            </div>
            
            <div>
              <p className="font-serif font-bold mb-2">{selectedMission.question}</p>
              <input
                type="text"
                value={missionAnswer}
                onChange={(e) => setMissionAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none font-mono"
              />
              {selectedMission.hint && (
                <p className="text-xs text-gray-500 mt-2">💡 Hint: {selectedMission.hint}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedMission(null);
                  setMissionAnswer('');
                }}
                className="flex-1 py-3 border border-white/20 rounded-sm hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteMission}
                className="flex-1 py-3 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition"
              >
                <Check className="w-4 h-4 inline mr-2" />
                Submit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
