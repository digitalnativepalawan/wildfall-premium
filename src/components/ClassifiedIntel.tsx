/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Wildfall Classified Intel System
 * Easter egg hunt for operatives
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Lock, Check, X, Eye, FileText } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

interface ClassifiedPage {
  id: string;
  title: string;
  intel: string;
  points: number;
  found: boolean;
  claimed: boolean;
}

interface ClassifiedIntelProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
  onClaim?: (points: number) => void;
}

export function ClassifiedIntel({ isOpen, onClose, code, onClaim }: ClassifiedIntelProps) {
  const [page, setPage] = useState<ClassifiedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (isOpen && code) {
      fetchClassified();
    }
  }, [isOpen, code]);

  const fetchClassified = async () => {
    setLoading(true);
    setError('');
    
    const { data, error: fetchError } = await supabase
      .from('classified_pages')
      .select('*')
      .eq('id', code.toLowerCase())
      .eq('active', true)
      .single();
    
    if (fetchError || !data) {
      setError('Invalid code. This intel does not exist or has been redacted.');
      setLoading(false);
      return;
    }

    // Check if already claimed
    const userId = localStorage.getItem('wildfall_user_id');
    if (userId) {
      const { data: claimData } = await supabase
        .from('classified_claims')
        .select('*')
        .eq('operative_id', userId)
        .eq('classified_id', code.toLowerCase())
        .single();
      
      if (claimData) {
        setClaimed(true);
      }
    }

    setPage(data);
    setLoading(false);
  };

  const handleClaim = async () => {
    if (!page) return;
    
    const userId = localStorage.getItem('wildfall_user_id');
    if (!userId) {
      setError('You must be logged in to claim classified intel.');
      return;
    }

    // Check if already claimed
    const { data: existing } = await supabase
      .from('classified_claims')
      .select('*')
      .eq('operative_id', userId)
      .eq('classified_id', page.id)
      .single();
    
    if (existing) {
      setError('You have already claimed this intel.');
      setClaimed(true);
      return;
    }

    // Claim it
    const { error: insertError } = await supabase
      .from('classified_claims')
      .insert([{
        operative_id: userId,
        classified_id: page.id
      }]);

    if (insertError) {
      setError('Failed to claim intel. Try again.');
      return;
    }

    // Award points
    await supabase
      .from('operatives')
      .update({ 
        points: supabase.rpc('get_points', { user_id: userId }) + page.points 
      })
      .eq('id', userId);

    setClaimed(true);
    if (onClaim) onClaim(page.points);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={page?.title || "Classified Intel"}
    >
      <div className="max-w-md">
        {loading ? (
          <div className="text-center py-8">
            <Shield className="w-8 h-8 text-gold animate-pulse mx-auto mb-4" />
            <p className="text-gray-400 font-mono">Decrypting...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 mb-2">ACCESS DENIED</p>
            <p className="text-gray-400 text-sm">{error}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 border border-white/20 rounded-sm hover:bg-white/5"
            >
              Close
            </button>
          </div>
        ) : page && claimed ? (
          // Already claimed - show intel
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <span className="text-xs font-mono text-gold tracking-wider uppercase">
                Top Secret
              </span>
            </div>
            
            <div className="bg-black border border-gold/30 rounded-sm p-4">
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                {page.intel}
              </p>
            </div>

            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span className="text-sm">Intel already claimed (+{page.points} pts)</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gold text-black font-bold rounded-sm"
            >
              Close
            </button>
          </div>
        ) : page ? (
          // Not yet claimed - show claim button
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-gold" />
              <span className="text-xs font-mono text-gold tracking-wider uppercase">
                Unclassified Intel Available
              </span>
            </div>
            
            <div className="bg-gray-900 border border-white/10 rounded-sm p-4">
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                {page.intel.substring(0, 100)}...
                <span className="text-gray-500"> [REDACTED]</span>
              </p>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-sm p-4">
              <p className="text-sm text-gold font-bold text-center">
                Claim to unlock full intel
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                +{page.points} bonus points
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-white/20 rounded-sm hover:bg-white/5"
              >
                <X className="w-4 h-4 inline mr-2" />
                Ignore
              </button>
              <button
                onClick={handleClaim}
                className="flex-1 py-3 bg-gold text-black font-bold rounded-sm hover:bg-gold/80"
              >
                <Check className="w-4 h-4 inline mr-2" />
                Claim Intel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

// Hook to track hidden triggers
export function useHiddenTriggers(onTrigger: (code: string) => void) {
  const [shieldClicks, setShieldClicks] = useState(0);
  const [typedKeys, setTypedKeys] = useState('');

  useEffect(() => {
    // Shield click handler (for navbar)
    const handleShieldClick = () => {
      setShieldClicks(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          onTrigger('alpha');
          return 0;
        }
        // Reset after 2 seconds
        setTimeout(() => setShieldClicks(0), 2000);
        return newCount;
      });
    };

    // Konami code handler (type "jungle")
    const handleKeyDown = (e: KeyboardEvent) => {
      setTypedKeys(prev => {
        const newKeys = (prev + e.key.toLowerCase()).slice(-6);
        if (newKeys === 'jungle') {
          onTrigger('echo');
          return '';
        }
        return newKeys;
      });
    };

    // Time-based trigger (2-4 AM)
    const checkNightOwl = () => {
      const hour = new Date().getHours();
      if (hour >= 2 && hour < 4) {
        const claimed = localStorage.getItem('wildfall_foxtrot_claimed');
        if (!claimed) {
          onTrigger('foxtrot');
          localStorage.setItem('wildfall_foxtrot_claimed', 'true');
        }
      }
    };

    // Attach listeners
    document.addEventListener('keydown', handleKeyDown);
    
    // Check night owl on mount
    checkNightOwl();
    const nightOwlInterval = setInterval(checkNightOwl, 60000); // Check every minute

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(nightOwlInterval);
    };
  }, [onTrigger]);

  return { shieldClicks };
}

// Trigger component for clickable elements
export function ClassifiedTrigger({ 
  code, 
  children, 
  onTrigger,
  className,
  type = 'click'
}: { 
  code: string;
  children: React.ReactNode;
  onTrigger: (code: string) => void;
  className?: string;
  type?: 'click' | 'hover';
}) {
  const [hoverCount, setHoverCount] = useState(0);

  if (type === 'hover') {
    return (
      <span 
        className={cn("cursor-help", className)}
        onMouseEnter={() => {
          setHoverCount(prev => {
            if (prev >= 2) {
              onTrigger(code);
              return 0;
            }
            return prev + 1;
          });
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span 
      className={cn("cursor-pointer", className)}
      onClick={() => onTrigger(code)}
    >
      {children}
    </span>
  );
}
