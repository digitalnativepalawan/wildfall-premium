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
  Lock, Unlock, Plus, Minus, RefreshCw, AlertCircle,
  Sword, Trees, BarChart3, Activity, Check, X
} from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

// CHANGE PASSWORD HERE - Current: 5309
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
  
  // Data states
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [factionStats, setFactionStats] = useState<FactionStats[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [crates, setCrates] = useState<SupplyCrate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Create crate form
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
    
    // Fetch operatives
    const { data: opsData } = await supabase
      .from('operatives')
      .select('*')
      .order('points', { ascending: false });
    
    if (opsData) setOperatives(opsData);
    
    // Fetch faction stats
    const { data: statsData } = await supabase
      .from('faction_stats')
      .select('*');
    
    if (statsData) setFactionStats(statsData);
    
    // Fetch missions with completion counts
    const { data: missionsData } = await supabase
      .from('missions')
      .select('*')
      .order('id');
    
    if (missionsData) {
      // Get completion counts for each mission
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
    
    // Fetch active crates
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

  // Check if already logged in
  useEffect(() => {
    const saved = localStorage.get*
