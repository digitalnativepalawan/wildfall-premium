import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Shield, Users, Trophy, Package, Sword, Trees } from "lucide-react";
import { Modal } from "./Modal";

const ADMIN_PASSWORD = "5309";

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [operatives, setOperatives] = useState<any[]>([]);
  const [factionStats, setFactionStats] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    // Import supabase dynamically to avoid top-level import issues
    const { supabase } = await import("../lib/supabase");
    
    const { data: opsData } = await supabase
      .from('operatives')
      .select('*')
      .order('points', { ascending: false });
    
    if (opsData) setOperatives(opsData);
    
    const { data: statsData } = await supabase
      .from('faction_stats')
      .select('*');
    
    if (statsData) setFactionStats(statsData);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchData();
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
    onClose();
  };

  useEffect(() => {
    if (localStorage.getItem('wildfall_admin') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Admin Access">
        <div className="space-y-6 py-4 text-center">
          <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Enter admin password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
            className="w-full p-3 bg-gray-900 rounded border border-white/10 text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gold text-black font-bold rounded"
          >
            ACCESS ADMIN
          </button>
        </div>
      </Modal>
    );
  }

  const totalPlayers = operatives.length;
  const totalPoints = operatives.reduce((sum, o) => sum + o.points, 0);

  return (
    <Modal isOpen={isOpen} onClose={handleLogout} title="Wildfall Admin" className="max-w-3xl">
      <div className="min-h-[400px]">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <span className="text-xs font-mono text-gold/70 uppercase">Game Control</span>
          <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 rounded p-4 border border-white/10">
            <p className="text-xs text-gray-400 uppercase">Total Players</p>
            <p className="text-2xl font-bold text-gold">{totalPlayers}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-white/10">
            <p className="text-xs text-gray-400 uppercase">Total Points</p>
            <p className="text-2xl font-bold text-gold">{totalPoints}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-mono uppercase ${activeTab === 'overview' ? 'text-gold border-b-2 border-gold' : 'text-white/60'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('players')}
            className={`px-4 py-2 text-xs font-mono uppercase ${activeTab === 'players' ? 'text-gold border-b-2 border-gold' : 'text-white/60'}`}
          >
            Players
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-gold/70 uppercase">Faction Standings</h3>
            {factionStats.map((stat: any) => (
              <div key={stat.faction} className="bg-gray-900 rounded p-4 border border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {stat.faction === 'legion' && <Sword className="w-5 h-5 text-red-400" />}
                    {stat.faction === 'guard' && <Shield className="w-5 h-5 text-blue-400" />}
                    {stat.faction === 'front' && <Trees className="w-5 h-5 text-green-400" />}
                    <span className="font-bold capitalize">{stat.faction}</span>
                  </div>
                  <span className="text-gold font-mono">{stat.total_points} pts</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.total_operatives} operatives</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {operatives.slice(0, 20).map((op: any) => (
              <div key={op.id} className="bg-gray-900 rounded p-3 border border-white/10 flex justify-between">
                <div>
                  <p className="font-bold text-sm">{op.codename}</p>
                  <p className="text-xs text-gray-400 font-mono">{op.deployment_code}</p>
                </div>
                <span className="text-gold font-mono">{op.points} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
