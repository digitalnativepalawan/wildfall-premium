import { useState, useEffect, useCallback } from "react";
import { Shield, Users, Trophy, Package, Sword, Trees, Zap, Trash2, RefreshCw } from "lucide-react";
import { Modal } from "./Modal";

const ADMIN_PASSWORD = "5309";

interface CrateForm {
  label: string;
  points_min: number;
  points_max: number;
  duration_minutes: number;
  max_claims: number;
}

const DEFAULT_CRATE_FORM: CrateForm = {
  label: "FIELD CACHE",
  points_min: 10,
  points_max: 50,
  duration_minutes: 30,
  max_claims: 10,
};

const CRATE_PRESETS = [
  { label: "FIELD CACHE", points_min: 10, points_max: 30, duration_minutes: 20, max_claims: 10 },
  { label: "INTEL DROP", points_min: 25, points_max: 75, duration_minutes: 15, max_claims: 5 },
  { label: "CLASSIFIED ASSET", points_min: 50, points_max: 100, duration_minutes: 10, max_claims: 3 },
  { label: "GOLDEN CRATE", points_min: 100, points_max: 200, duration_minutes: 5, max_claims: 1 },
];

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [operatives, setOperatives] = useState<any[]>([]);
  const [factionStats, setFactionStats] = useState<any[]>([]);
  const [crates, setCrates] = useState<any[]>([]);
  const [crateForm, setCrateForm] = useState<CrateForm>(DEFAULT_CRATE_FORM);
  const [dropping, setDropping] = useState(false);
  const [dropSuccess, setDropSuccess] = useState('');
  const [awardTarget, setAwardTarget] = useState('');
  const [awardPoints, setAwardPoints] = useState(10);
  const [awardMsg, setAwardMsg] = useState('');

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    const { supabase } = await import("../lib/supabase");

    const [opsRes, statsRes, cratesRes] = await Promise.all([
      supabase.from('operatives').select('*').order('points', { ascending: false }),
      supabase.from('faction_stats').select('*'),
      supabase.from('supply_crates').select('*').order('created_at', { ascending: false }).limit(20),
    ]);

    if (opsRes.data) setOperatives(opsRes.data);
    if (statsRes.data) setFactionStats(statsRes.data);
    if (cratesRes.data) setCrates(cratesRes.data);
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
    if (localStorage.getItem('wildfall_admin') === 'true') setIsAuthenticated(true);
  }, []);

  const handleDropCrate = async () => {
    if (dropping) return;
    setDropping(true);
    setDropSuccess('');

    const { supabase } = await import("../lib/supabase");
    const expiresAt = new Date(Date.now() + crateForm.duration_minutes * 60 * 1000).toISOString();

    const { data, error } = await supabase.from('supply_crates').insert([{
      label: crateForm.label,
      min_points: crateForm.points_min,
      max_points: crateForm.points_max,
      points_min: crateForm.points_min,
      points_max: crateForm.points_max,
      expire_time: expiresAt,
      expires_at: expiresAt,
      max_claims: crateForm.max_claims,
      current_claims: 0,
      claim_count: 0,
      active: true,
    }]).select().single();

    setDropping(false);
    if (data) {
      setDropSuccess(`✓ "${crateForm.label}" dropped! Expires in ${crateForm.duration_minutes} min.`);
      fetchData();
      setTimeout(() => setDropSuccess(''), 5000);
    } else {
      alert('Error dropping crate: ' + error?.message);
    }
  };

  const handleDeactivateCrate = async (id: string) => {
    const { supabase } = await import("../lib/supabase");
    await supabase.from('supply_crates').update({ active: false }).eq('id', id);
    fetchData();
  };

  const handleAwardPoints = async () => {
    if (!awardTarget.trim() || !awardPoints) return;
    const { supabase } = await import("../lib/supabase");

    const { data: op } = await supabase
      .from('operatives')
      .select('*')
      .or(`codename.ilike.${awardTarget.trim()},deployment_code.ilike.${awardTarget.trim().toUpperCase()}`)
      .single();

    if (!op) {
      setAwardMsg('Operative not found.');
      return;
    }

    await supabase.from('operatives').update({ points: op.points + awardPoints }).eq('id', op.id);
    setAwardMsg(`✓ +${awardPoints} pts awarded to ${op.codename}`);
    setAwardTarget('');
    fetchData();
    setTimeout(() => setAwardMsg(''), 4000);
  };

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
          <button onClick={handleLogin} className="w-full py-3 bg-gold text-black font-bold rounded">
            ACCESS ADMIN
          </button>
        </div>
      </Modal>
    );
  }

  const totalPlayers = operatives.length;
  const totalPoints = operatives.reduce((sum, o) => sum + o.points, 0);
  const activeCrates = crates.filter(c => c.active && new Date(c.expire_time) > new Date());

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'crates', label: `Supply Drops ${activeCrates.length > 0 ? `(${activeCrates.length})` : ''}` },
    { id: 'players', label: 'Players' },
    { id: 'award', label: 'Award Points' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleLogout} title="Wildfall Admin" className="max-w-3xl">
      <div className="min-h-[500px]">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <span className="text-xs font-mono text-gold/70 uppercase">Game Control</span>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="text-white/40 hover:text-gold">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded p-4 border border-white/10 text-center">
            <p className="text-xs text-gray-400 uppercase font-mono">Players</p>
            <p className="text-2xl font-bold text-gold">{totalPlayers}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-white/10 text-center">
            <p className="text-xs text-gray-400 uppercase font-mono">Total Points</p>
            <p className="text-2xl font-bold text-gold">{totalPoints}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-white/10 text-center">
            <p className="text-xs text-gray-400 uppercase font-mono">Active Crates</p>
            <p className={`text-2xl font-bold ${activeCrates.length > 0 ? 'text-gold animate-pulse' : 'text-white/30'}`}>
              {activeCrates.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-mono uppercase transition-colors ${
                activeTab === tab.id ? 'text-gold border-b-2 border-gold' : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-gold/70 uppercase">Faction Standings</h3>
            {factionStats.length === 0 ? (
              <p className="text-sm text-white/30">No faction data yet.</p>
            ) : (
              factionStats.map((stat: any) => (
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
              ))
            )}
          </div>
        )}

        {/* SUPPLY DROPS */}
        {activeTab === 'crates' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded p-6 border border-gold/20">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gold" />
                <h3 className="text-sm font-mono text-gold uppercase">Drop New Crate</h3>
              </div>

              <div className="mb-4">
                <p className="text-xs font-mono text-white/40 mb-2 uppercase">Quick Presets</p>
                <div className="grid grid-cols-2 gap-2">
                  {CRATE_PRESETS.map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => setCrateForm(preset)}
                      className={`px-3 py-2 text-xs font-mono border transition-all text-left ${
                        crateForm.label === preset.label
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/10 text-white/50 hover:border-white/30'
                      }`}
                    >
                      {preset.label}
                      <span className="block text-white/30">
                        {preset.points_min}–{preset.points_max} pts • {preset.duration_minutes}min
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="text-xs font-mono text-white/40 uppercase block mb-1">Label</label>
                  <input
                    type="text"
                    value={crateForm.label}
                    onChange={(e) => setCrateForm({ ...crateForm, label: e.target.value.toUpperCase() })}
                    className="w-full p-2 bg-black border border-white/10 text-white text-sm font-mono focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 uppercase block mb-1">Min Points</label>
                  <input
                    type="number"
                    value={crateForm.points_min}
                    onChange={(e) => setCrateForm({ ...crateForm, points_min: +e.target.value })}
                    className="w-full p-2 bg-black border border-white/10 text-gold font-mono focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 uppercase block mb-1">Max Points</label>
                  <input
                    type="number"
                    value={crateForm.points_max}
                    onChange={(e) => setCrateForm({ ...crateForm, points_max: +e.target.value })}
                    className="w-full p-2 bg-black border border-white/10 text-gold font-mono focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 uppercase block mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={crateForm.duration_minutes}
                    onChange={(e) => setCrateForm({ ...crateForm, duration_minutes: +e.target.value })}
                    className="w-full p-2 bg-black border border-white/10 text-white font-mono focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 uppercase block mb-1">Max Claims</label>
                  <input
                    type="number"
                    value={crateForm.max_claims}
                    onChange={(e) => setCrateForm({ ...crateForm, max_claims: +e.target.value })}
                    className="w-full p-2 bg-black border border-white/10 text-white font-mono focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {dropSuccess && (
                <p className="text-green-400 text-sm font-mono mb-3">{dropSuccess}</p>
              )}

              <button
                onClick={handleDropCrate}
                disabled={dropping}
                className="w-full py-3 bg-gold text-black font-bold font-mono tracking-widest hover:bg-gold/80 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {dropping ? <>Dropping...</> : <><Zap className="w-4 h-4" /> DROP SUPPLY CRATE</>}
              </button>
            </div>

            <div>
              <h3 className="text-sm font-mono text-white/40 uppercase mb-3">Recent Drops</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {crates.length === 0 ? (
                  <p className="text-sm text-white/20 font-mono">No crates dropped yet.</p>
                ) : (
                  crates.map((crate: any) => {
                    const isActive = crate.active && new Date(crate.expire_time) > new Date();
                    const remaining = Math.max(0, Math.floor((new Date(crate.expire_time).getTime() - Date.now()) / 60000));
                    return (
                      <div key={crate.id} className={`flex items-center justify-between p-3 rounded border ${
                        isActive ? 'border-gold/30 bg-gold/5' : 'border-white/5 bg-black opacity-50'
                      }`}>
                        <div>
                          <p className="text-sm font-mono font-bold">{crate.label}</p>
                          <p className="text-xs text-white/40">
                            {crate.current_claims}/{crate.max_claims} claimed •{' '}
                            {isActive ? `${remaining}m left` : 'Expired'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gold font-mono text-sm">
                            {crate.min_points}–{crate.max_points}
                          </span>
                          {isActive && (
                            <button
                              onClick={() => handleDeactivateCrate(crate.id)}
                              className="text-red-400/60 hover:text-red-400"
                              title="Deactivate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* PLAYERS */}
        {activeTab === 'players' && (
          <div className="space-y-2 max-h-[380px] overflow-y-auto">
            {operatives.slice(0, 50).map((op: any, i: number) => (
              <div key={op.id} className="bg-gray-900 rounded p-3 border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm">
                    <span className="text-white/30 font-mono mr-2">#{i + 1}</span>
                    {op.codename}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">{op.deployment_code} • {op.faction} • Lvl {op.clearance_level}</p>
                </div>
                <span className="text-gold font-mono font-bold">{op.points} pts</span>
              </div>
            ))}
          </div>
        )}

        {/* AWARD POINTS */}
        {activeTab === 'award' && (
          <div className="space-y-4">
            <p className="text-sm text-white/50">Award manual points to any operative.</p>
            <div>
              <label className="text-xs font-mono text-white/40 uppercase block mb-1">Codename or Deployment Code</label>
              <input
                type="text"
                value={awardTarget}
                onChange={(e) => setAwardTarget(e.target.value)}
                placeholder="e.g., GhostKitchen64 or WF-2026-LEG-451"
                className="w-full p-3 bg-gray-900 border border-white/10 text-white font-mono focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-white/40 uppercase block mb-1">Points to Award</label>
              <input
                type="number"
                value={awardPoints}
                onChange={(e) => setAwardPoints(+e.target.value)}
                className="w-full p-3 bg-gray-900 border border-white/10 text-gold font-mono focus:border-gold focus:outline-none"
              />
            </div>
            {awardMsg && (
              <p className={`text-sm font-mono ${awardMsg.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                {awardMsg}
              </p>
            )}
            <button
              onClick={handleAwardPoints}
              disabled={!awardTarget.trim()}
              className="w-full py-3 bg-gold text-black font-bold font-mono tracking-widest hover:bg-gold/80 transition disabled:opacity-50"
            >
              <Trophy className="w-4 h-4 inline mr-2" />
              AWARD POINTS
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
