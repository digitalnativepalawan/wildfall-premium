import { useState } from "react";
import { Modal } from "./Modal";
import { cn } from "../lib/utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { CheckCircle2, ArrowRight, Download, Calendar, Users, Briefcase } from "lucide-react";

export function InvestPlayerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"investor" | "player" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !type) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "registrations"), {
        email,
        type,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setType(null);
    setEmail("");
    setSubmitted(false);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => { onClose(); reset(); }} 
      title={submitted ? "REGISTRATION SUCCESSFUL" : step === 1 ? "CHOOSE YOUR PATH" : `DEPLOY AS ${type?.toUpperCase()}`}
    >
      {submitted ? (
        <div className="text-center py-12">
          <CheckCircle2 className="w-20 h-20 text-gold mx-auto mb-8" />
          <h4 className="text-3xl font-serif italic text-gold mb-4">You are on the list.</h4>
          <p className="text-white/60 font-serif italic mb-12 max-w-md mx-auto">
            A strategic briefing has been sent to <span className="text-white">{email}</span>. 
            Prepare for further instructions.
          </p>
          <button
            onClick={() => { onClose(); reset(); }}
            className="px-12 py-4 bg-gold text-black font-mono font-bold tracking-widest"
          >
            CLOSE FREQUENCY
          </button>
        </div>
      ) : step === 1 ? (
        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => { setType("investor"); setStep(2); }}
            className="group p-12 gold-border bg-black text-left hover:bg-gold/5 transition-all"
          >
            <Briefcase className="w-12 h-12 text-gold mb-8 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-serif tracking-widest mb-4">INVESTOR</h4>
            <p className="text-sm text-white/40 font-serif italic mb-8">
              Access financial decks, site visit schedules, and equity opportunities in the Wildfall ecosystem.
            </p>
            <div className="flex items-center gap-2 text-gold font-mono text-[10px] tracking-widest">
              PROCEED TO BRIEFING <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          <button
            onClick={() => { setType("player"); setStep(2); }}
            className="group p-12 gold-border bg-black text-left hover:bg-gold/5 transition-all"
          >
            <Users className="w-12 h-12 text-gold mb-8 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-serif tracking-widest mb-4">OPERATIVE</h4>
            <p className="text-sm text-white/40 font-serif italic mb-8">
              Book your slot for the next event, view available roles, and secure early bird deployment codes.
            </p>
            <div className="flex items-center gap-2 text-gold font-mono text-[10px] tracking-widest">
              PROCEED TO DEPLOYMENT <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {type === "investor" ? (
              <>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Download className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Available Asset</div>
                    <div className="text-sm font-serif italic">Wildfall_Investment_Deck_Q2_2026.pdf</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Calendar className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Next Site Visit</div>
                    <div className="text-sm font-serif italic">April 15-17, 2026 • San Vicente</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Calendar className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Next Event Date</div>
                    <div className="text-sm font-serif italic">May 22-24, 2026</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Users className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Slots Remaining</div>
                    <div className="text-sm font-serif italic">14 / 60 Operatives</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-gold tracking-widest uppercase mb-2">Secure Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="OPERATIVE@SECURE.COM"
                className="w-full bg-black border border-gold/30 p-4 text-white font-mono text-sm focus:border-gold outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold text-black font-mono font-bold tracking-widest hover:bg-white transition-all disabled:opacity-50"
            >
              {loading ? "TRANSMITTING..." : "REQUEST ACCESS →"}
            </button>
            <p className="text-[10px] font-mono text-white/20 text-center tracking-widest uppercase">
              By requesting access, you agree to the rules of engagement.
            </p>
          </form>
        </div>
      )}
    </Modal>
  );
}
