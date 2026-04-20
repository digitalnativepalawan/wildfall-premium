/**
 * Wildfall Supply Crates System
 * Players see active crates and race to claim them for random points.
 * Admin drops crates from AdminPanel.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Clock, Zap, Check, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";

interface Crate {
  id: string;
  label: string;
  min_points: number;
  max_points: number;
  expire_time: string;
  max_claims: number;
  current_claims: number;
  active: boolean;
}

interface SupplyCratesProps {
  currentUserId?: string | null;
  onPointsEarned?: (points: number) => void;
}

function useCountdown(expiresAt: string) {
  const [timeLeft, setTimeLeft] = useState('');
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        setExpired(true);
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${m}:${s.toString().padStart(2, '0')}`);
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  return { timeLeft, expired };
}

function CrateCard({ crate, userId, onClaim }: { crate: Crate; userId?: string | null; onClaim: (id: string) => void }) {
  const { timeLeft, expired } = useCountdown(crate.expire_time);
  const isFull = crate.current_claims >= crate.max_claims;
  const isUnavailable = expired || isFull || !crate.active;
  const urgency = (() => {
    const diff = new Date(crate.expire_time).getTime() - Date.now();
    if (diff < 60000) return 'critical';
    if (diff < 180000) return 'warning';
    return 'normal';
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className={cn(
        "relative overflow-hidden border transition-all duration-300",
        isUnavailable
          ? "border-white/10 opacity-60 bg-black"
          : urgency === 'critical'
          ? "border-red-500/60 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          : urgency === 'warning'
          ? "border-yellow-500/40 bg-yellow-950/10"
          : "border-gold/30 bg-black hover:border-gold hover:bg-gold/5"
      )}
    >
      {urgency === 'critical' && !isUnavailable && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 flex items-center justify-center border",
              isUnavailable ? "border-white/10 text-white/30" : "border-gold/40 text-gold"
            )}>
              {isFull ? <Check className="w-5 h-5 text-green-400" /> : <Package className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs font-mono text-white/40 tracking-widest uppercase">Supply Drop</p>
              <h3 className={cn(
                "font-serif font-bold",
                isUnavailable ? "text-white/40" : "text-white"
              )}>{crate.label}</h3>
            </div>
          </div>

          <div className={cn(
            "text-right font-mono text-sm font-bold",
            expired ? "text-white/20" :
            urgency === 'critical' ? "text-red-400 animate-pulse" :
            urgency === 'warning' ? "text-yellow-400" : "text-gold"
          )}>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeLeft}
            </div>
          </div>
        </div>

        <div className={cn(
          "text-3xl font-mono font-bold mb-4",
          isUnavailable ? "text-white/20" : "text-gold"
        )}>
          +{crate.min_points}–{crate.max_points}
          <span className="text-sm font-sans font-normal text-white/40 ml-2">pts</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono text-white/30 mb-1">
            <span>CLAIMS</span>
            <span>{crate.current_claims}/{crate.max_claims}</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-500", isFull ? "bg-green-500" : "bg-gold")}
              style={{ width: `${(crate.current_claims / crate.max_claims) * 100}%` }}
            />
          </div>
        </div>

        {!userId ? (
          <div className="flex items-center gap-2 text-xs text-white/30 font-mono">
            <Lock className="w-3 h-3" />
            LOGIN TO CLAIM
          </div>
        ) : isUnavailable ? (
          <div className="text-xs font-mono text-white/30 uppercase tracking-wider">
            {isFull ? '✓ Fully Claimed' : expired ? 'Expired' : 'Unavailable'}
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onClaim(crate.id)}
            className={cn(
              "w-full py-3 font-mono text-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2",
              urgency === 'critical'
                ? "bg-red-500 text-white hover:bg-red-400"
                : "bg-gold text-black hover:bg-gold/80"
            )}
          >
            <Zap className="w-4 h-4" />
            CLAIM CRATE
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export function SupplyCrates({ currentUserId, onPointsEarned }: SupplyCratesProps) {
  const [crates, setCrates] = useState<Crate[]>([]);
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState<{ points: number; crateId: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCrates = useCallback(async () => {
    const { data } = await supabase
      .from('supply_crates')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (data) setCrates(data);

    if (currentUserId) {
      const { data: claims } = await supabase
        .from('crate_claims')
        .select('crate_id')
        .eq('operative_id', currentUserId);
      if (claims) setClaimedIds(new Set(claims.map((c: any) => c.crate_id)));
    }

    setLoading(false);
  }, [currentUserId]);

  useEffect(() => {
    fetchCrates();
    const interval = setInterval(fetchCrates, 10000);
    return () => clearInterval(interval);
  }, [fetchCrates]);

  useEffect(() => {
    const channel = supabase
      .channel('supply_crates_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'supply_crates' }, () => {
        fetchCrates();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchCrates]);

  const handleClaim = async (crateId: string) => {
    if (!currentUserId) return;
    if (claimedIds.has(crateId)) return;

    const crate = crates.find(c => c.id === crateId);
    if (!crate) return;

    if (new Date(crate.expire_time) < new Date()) return;
    if (crate.current_claims >= crate.max_claims) return;

    const points = Math.floor(
      Math.random() * (crate.max_points - crate.min_points + 1) + crate.min_points
    );

    const { error: claimError } = await supabase
      .from('crate_claims')
      .insert([{ crate_id: crateId, operative_id: currentUserId, points_awarded: points }]);

    if (claimError) return;

    await supabase
      .from('supply_crates')
      .update({ current_claims: crate.current_claims + 1 })
      .eq('id', crateId);

    const { data: user } = await supabase
      .from('operatives')
      .select('points')
      .eq('id', currentUserId)
      .single();

    if (user) {
      await supabase
        .from('operatives')
        .update({ points: user.points + points })
        .eq('id', currentUserId);
    }

    setClaimedIds(prev => new Set([...prev, crateId]));
    setFlash({ points, crateId });
    onPointsEarned?.(points);
    setTimeout(() => setFlash(null), 3000);
    fetchCrates();
  };

  const activeCrates = crates.filter(c => {
    const notExpired = new Date(c.expire_time) > new Date();
    return c.active && (notExpired || c.current_claims > 0);
  });

  if (loading) return null;
  if (activeCrates.length === 0) return null;

  return (
    <section className="py-16 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-gold" />
            <div>
              <h3 className="font-serif text-xl font-bold">Supply Drops</h3>
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Active Intelligence Assets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gold/60">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse inline-block" />
            LIVE
          </div>
        </div>

        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-gold/20 border border-gold/50 flex items-center gap-3"
            >
              <Zap className="w-5 h-5 text-gold" />
              <p className="text-gold font-mono font-bold">
                +{flash.points} INTEL POINTS SECURED
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {activeCrates.map(crate => {
              const alreadyClaimed = claimedIds.has(crate.id);
              const crateDisplay = alreadyClaimed
                ? { ...crate, current_claims: Math.max(crate.current_claims, 1) }
                : crate;
              return (
                <CrateCard
                  key={crate.id}
                  crate={crateDisplay}
                  userId={currentUserId}
                  onClaim={alreadyClaimed ? () => {} : handleClaim}
                />
              );
            })}
          </AnimatePresence>
        </div>

        <p className="text-xs font-mono text-white/20 text-center mt-6">
          Supply drops appear without warning. Check back often.
        </p>
      </div>
    </section>
  );
}
