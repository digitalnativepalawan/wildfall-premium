/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Wildfall Admin Panel
 * Game management dashboard
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Users, Trophy, Target, Package, Search, 
  Lock, Unlock, Plus, RefreshCw, AlertCircle,
  Sword, Trees, BarChart3, Check, X
} from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

// Admin password - change this to 5309
const ADMIN_PASSWORD = "5309";

interface Operative {
  id: string;
  codename: string;
  faction: 'legion' | 'guard' | 'front';
  role: string;
  points: number;
  missions_complete: number;
  clearance_level: number;
  created_at: string;
  deployment_code: string;
}

interface FactionStats {
  faction: 'legion' | 'guard' | 'front';
  total_operatives: number;
  total_points: number;
}

interface Mission {
  id: number;
  title: string;
  active: boolean;
  completions: number;
}

interface SupplyCrate {
  id: string;
  type: 'bronze' | 'silver' | 'gold' | 'black';
  active: boolean;
  current_claims: number;
  max_claims: number;
  drop_time: string;
  expire_time: string;
}

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'missions' | 'crates' | 'intel'>('overview');
  
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [factionStats, setFactionStats] = useState<FactionStats[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [crates, setCrates] = useState<SupplyCrate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [newCrate, setNewCrate] = useState({
    type: 'bronze' as const,
    min_points: 10,
    max_points: 20,
    duration_hours: 24,
    max_claims: 20
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    
    const { data: opsData } = await supabase
      .from('operatives')
      .select('*')
      .order('points', { ascending: false });
    
    if (opsData) setOperatives(opsData);
    
    const { data: statsData } = await supabase
      .from('faction_stats')
      .select('*');
    
    if (statsData) setFactionStats(statsData);
    
    const { data: missionsData } = await supabase
      .from('missions')
      .select('*')
      .order('id');
    
    if (missionsData) {
      const missionsWithCounts = await Promise.all(
        missionsData.map(async (m) => {
          const { count } = await supabase
            .from('mission_completions')
            .select('*', { count: 'exact', head: true })
            .eq('mission_id', m.id);
          return { ...m, completions: count || 0 };
        })
      );
      setMissions(missionsWithCounts);
    }
    
    const { data: cratesData } = await supabase
      .from('supply_crates')
      .select('*')
      .order('drop_time', { ascending: false })
      .limit(10);
    
    if (cratesData) setCrates(cratesData);
    
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('wildfall_admin', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wildfall_admin');
    setPassword('');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleCreateCrate = async () => {
    const dropTime = new Date();
    const expireTime = new Date(dropTime.getTime() + newCrate.duration_hours * 60 * 60 * 1000);
    
    const { data, error } = await supabase
      .from('supply_crates')
      .insert([{
        type: newCrate.type,
        min_points: newCrate.min_points,
        max_points: newCrate.max_points,
        drop_time: dropTime.toISOString(),
        expire_time: expireTime.toISOString(),
        max_claims: newCrate.max_claims,
        active: true
      }])
      .select();
    
    if (data) {
      alert(`Crate dropped! Expires in ${newCrate.duration_hours} hours.`);
      fetchData();
    } else {
      alert('Failed to create crate: ' + error?.message);
    }
  };

  const handleToggleMission = async (missionId: number, currentActive: boolean) => {
    await supabase
      .from('missions')
      .update({ active: !currentActive })
      .eq('id', missionId);
    
    fetchData();
  };

  const handleAwardPoints = async (operativeId: string, points: number) => {
    const operative = operatives.find(o => o.id === operativeId);
    if (!operative) return;
    
    await supabase
      .from('operatives')
      .update({ points: operative.points + points })
      .eq('id', operativeId);
    
    fetchData();
  };

  useEffect(() => {
    const saved = localStorage.getItem('wildfall_admin');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const totalPlayers = operatives.length;
  const totalPoints = operatives.reduce((sum, o) => sum + o.points, 0);
  const totalMissions = missions.reduce((sum, m) => sum + (m.completions || 0), 0);
  const activeCrates = crates.filter(c => c.active && new Date(c.expire_time) > new Date()).length;

  const getFactionIcon = (faction: string) => {
    if (faction === 'legion') return Sword;
    if (faction === 'guard') return Shield;
    return Trees;
  };

  if (!isAuthenticated) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Admin Access">
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-gold" />
          </div>
          
          <p className="text-center text-gray-400 mb-4">
            Enter admin password to access game management
          </p>
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full p-3 bg-gray-900 rounded-sm border border-white/10 focus:border-gold focus:outline-none font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              ACCESS ADMIN PANEL
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wildfall Admin Panel" className="max-w-4xl">
      <div className="min-h-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gold/70 tracking-wider uppercase">
              Game Management
            </span>
            <button
              onClick={handleRefresh}
              className={cn(
                "text-xs font-mono text-white/60 hover:text-gold flex items-center gap-1",
                refreshing && "animate-spin"
              )}
            >
              <RefreshCw className="w-3 h-3" />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
            <p className="text-xs font-mono text-gray-400 uppercase">Total Players</p>
            <p className="text-2xl font-bold text-gold">{totalPlayers}</p>
          </div>
          <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
            <p className="text-xs font-mono text-gray-400 uppercase">Total Points</p>
            <p className="text-2xl font-bold text-gold">{totalPoints.toLocaleString()}</p>
          </div>
          <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
            <p className="text-xs font-mono text-gray-400 uppercase">Missions Done</p>
            <p className="text-2xl font-bold text-gold">{totalMissions}</p>
          </div>
          <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
            <p className="text-xs font-mono text-gray-400 uppercase">Active Crates</p>
            <p className="text-2xl font-bold text-gold">{activeCrates}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'players', label: 'Players', icon: Users },
            { id: 'missions', label: 'Missions', icon: Target },
            { id: 'crates', label: 'Supply Crates', icon: Package },
            { id: 'intel', label: 'Classified', icon: Search }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 text-xs font-mono tracking-wider transition-colors flex items-center gap-2",
                activeTab === tab.id
                  ? "text-gold border-b-2 border-gold"
                  : "text-white/60 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-4">
                  Faction Standings
                </h3>
                <div className="space-y-3">
                  {factionStats.map(stat => {
                    const Icon = getFactionIcon(stat.faction);
                    const total = factionStats.reduce((s, f) => s + f.total_points, 0) || 1;
                    const percentage = (stat.total_points / total) * 100;
                    
                    return (
                      <div key={stat.faction} className="bg-gray-900 rounded-sm p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={cn("w-5 h-5",
                              stat.faction === 'legion' && "text-red-400",
                              stat.faction === 'guard' && "text-blue-400",
                              stat.faction === 'front' && "text-green-400"
                            )} />
                            <span className="font-bold capitalize">{stat.faction}</span>
                          </div>
                          <span className="text-gold font-mono">{stat.total_points} pts</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className={cn("h-2 rounded-full",
                              stat.faction === 'legion' && "bg-red-500",
                              stat.faction === 'guard' && "bg-blue-500",
                              stat.faction === 'front' && "bg-green-500"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.total_operatives} operatives
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-4">
                  Top 5 Operatives
                </h3>
                <div className="space-y-2">
                  {operatives.slice(0, 5).map((op, idx) => (
                    <div key={op.id} className="flex justify-between items-center bg-gray-900 rounded-sm p-3 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-mono w-8">#{idx + 1}</span>
                        <span className="font-bold">{op.codename}</span>
                        <span className={cn("text-xs px-2 py-1 rounded",
                          op.faction === 'legion' && "bg-red-900/30 text-red-400",
                          op.faction === 'guard' && "bg-blue-900/30 text-blue-400",
                          op.faction === 'front' && "bg-green-900/30 text-green-400"
                        )}>
                          {op.faction}
                        </span>
                      </div>
                      <span className="text-gold font-mono">{op.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-h-[400px] overflow-y-auto">
              <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-2">
                All Operatives ({operatives.length})
              </h3>
              {operatives.map(op => (
                <div key={op.id} className="bg-gray-900 rounded-sm p-4 border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{op.codename}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {op.deployment_code} • Lvl {op.clearance_level} • {op.missions_complete} missions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-mono mr-4">{op.points} pts</span>
                    <button
                      onClick={() => {
                        const points = parseInt(prompt('Points to award:', '10') || '0');
                        if (points) handleAwardPoints(op.id, points);
                      }}
                      className="p-2 bg-gold/20 text-gold rounded-sm hover:bg-gold/30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'missions' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-2">
                Mission Control
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {missions.map(mission => (
                  <div key={mission.id} className="bg-gray-900 rounded-sm p-3 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-sm">{mission.title}</p>
                        <p className="text-xs text-gray-400">{mission.completions} completions</p>
                      </div>
                      <button
                        onClick={() => handleToggleMission(mission.id, mission.active)}
                        className={cn(
                          "p-1 rounded",
                          mission.active ? "text-green-400 bg-green-900/30" : "text-red-400 bg-red-900/30"
                        )}
                      >
                        {mission.active ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'crates' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
                <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-4">
                  Drop New Supply Crate
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Type</label>
                    <select
                      value={newCrate.type}
                      onChange={(e) => setNewCrate({ ...newCrate, type: e.target.value as any })}
                      className="w-full p-2 bg-black border border-white/10 rounded-sm"
                    >
                      <option value="bronze">Bronze (+10-20 pts)</option>
                      <option value="silver">Silver (+25-40 pts)</option>
                      <option value="gold">Gold (+50-100 pts)</option>
                      <option value="black">Black (Mystery)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Duration</label>
                    <select
                      value={newCrate.duration_hours}
                      onChange={(e) => setNewCrate({ ...newCrate, duration_hours: parseInt(e.target.value) })}
                      className="w-full p-2 bg-black border border-white/10 rounded-sm"
                    >
                      <option value={2}>2 hours</option>
                      <option value={6}>6 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleCreateCrate}
                  className="w-full py-3 bg-gold text-black font-bold rounded-sm hover:bg-gold/80 transition"
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  DROP CRATE NOW
                </button>
              </div>

              <div>
                <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-2">
                  Recent Crates
                </h3>
                <div className="space-y-2">
                  {crates.map(crate => (
                    <div key={crate.id} className="bg-gray-900 rounded-sm p-3 border border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className={cn("w-3 h-3 rounded-full",
                          crate.type === 'bronze' && "bg-orange-400",
                          crate.type === 'silver' && "bg-gray-300",
                          crate.type === 'gold' && "bg-yellow-400",
                          crate.type === 'black' && "bg-purple-400"
                        )} />
                        <div>
                          <p className="text-sm font-bold capitalize">{crate.type} Crate</p>
                          <p className="text-xs text-gray-400">
                            {crate.current_claims}/{crate.max_claims} claimed
                          </p>
                        </div>
                      </div>
                      <span className={cn("text-xs font-mono",
                        crate.active && new Date(crate.expire_time) > new Date() ? "text-green-400" : "text-red-400"
                      )}>
                        {crate.active && new Date(crate.expire_time) > new Date() ? 'ACTIVE' : 'EXPIRED'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'intel' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
                <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-4">
                  Classified Intel Status
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel'].map((code, idx) => (
                    <div key={code} className="bg-black rounded-sm p-3 border border-white/10 text-center">
                      <p className="text-xs font-mono text-gray-400 uppercase">{code}</p>
                      <p className="text-gold font-bold">{idx + 1}</p>
                      <p className="text-xs text-green-400 mt-1">Active</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gold/10 border border-gold/30 rounded-sm p-4">
                <p className="text-sm text-gold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Hidden triggers active across site
                </p>
                <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc list-inside">
                  <li>Shield logo (5 clicks) → alpha</li>
                  <li>"60" in hero → bravo</li>
                  <li>Mr. Hopper name → charlie</li>
                  <li>Footer location hover → delta</li>
                  <li>Type "jungle" → echo</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
