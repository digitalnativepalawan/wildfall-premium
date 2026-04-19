import { useState, useEffect } from "react";
import { Shield, Lock, Check, X, Eye, FileText } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Modal } from "./Modal";

export function ClassifiedIntel({ isOpen, onClose, code }: any) {
  const [page, setPage] = useState<any>(null);
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
    
    const { data } = await supabase
      .from('classified_pages')
      .select('*')
      .eq('id', code.toLowerCase())
      .eq('active', true)
      .single();
    
    if (!data) {
      setError('Invalid code. Intel not found.');
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem('wildfall_user_id');
    if (userId) {
      const { data: claimData } = await supabase
        .from('classified_claims')
        .select('*')
        .eq('operative_id', userId)
        .eq('classified_id', code.toLowerCase())
        .single();
      
      if (claimData) setClaimed(true);
    }

    setPage(data);
    setLoading(false);
  };

  const handleClaim = async () => {
    if (!page) return;
    
    const userId = localStorage.getItem('wildfall_user_id');
    if (!userId) {
      setError('Login required.');
      return;
    }

    const { data: existing } = await supabase
      .from('classified_claims')
      .select('*')
      .eq('operative_id', userId)
      .eq('classified_id', page.id)
      .single();
    
    if (existing) {
      setClaimed(true);
      return;
    }

    await supabase.from('classified_claims').insert([{
      operative_id: userId,
      classified_id: page.id
    }]);

    await supabase
      .from('operatives')
      .update({ points: page.points })
      .eq('id', userId);

    setClaimed(true);
  };

  if (loading) return (
    <Modal isOpen={isOpen} onClose={onClose} title="Classified Intel">
      <div className="text-center py-8">
        <Shield className="w-8 h-8 text-gold animate-pulse mx-auto mb-4" />
        <p className="text-gray-400">Decrypting...</p>
      </div>
    </Modal>
  );

  if (error) return (
    <Modal isOpen={isOpen} onClose={onClose} title="Access Denied">
      <div className="text-center py-8">
        <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <button onClick={onClose} className="mt-6 px-6 py-2 border border-white/20 rounded">Close</button>
      </div>
    </Modal>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={page?.title}>
      <div className="max-w-md">
        {claimed ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <span className="text-xs font-mono text-gold uppercase">Top Secret</span>
            </div>
            <div className="bg-black border border-gold/30 rounded p-4 mb-4">
              <p className="text-sm text-gray-300 font-mono">{page.intel}</p>
            </div>
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <Check className="w-5 h-5" />
              <span>Claimed (+{page.points} pts)</span>
            </div>
            <button onClick={onClose} className="w-full py-3 bg-gold text-black font-bold rounded">Close</button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-gold" />
              <span className="text-xs font-mono text-gold uppercase">Unclassified Intel</span>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded p-4 mb-4">
              <p className="text-sm text-gray-300">{page.intel.substring(0, 100)}... <span className="text-gray-500">[REDACTED]</span></p>
            </div>
            <div className="bg-gold/10 border border-gold/30 rounded p-4 mb-4 text-center">
              <p className="text-gold font-bold">Claim to unlock</p>
              <p className="text-xs text-gray-400">+{page.points} points</p>
            </div>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-3 border border-white/20 rounded"><X className="w-4 h-4 inline mr-2"/>Ignore</button>
              <button onClick={handleClaim} className="flex-1 py-3 bg-gold text-black font-bold rounded"><Check className="w-4 h-4 inline mr-2"/>Claim</button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
