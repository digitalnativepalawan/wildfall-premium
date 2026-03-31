import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { CheckCircle2, ArrowRight, Download, Calendar, Users, Briefcase } from "lucide-react";
import { supabase } from "../lib/supabase";

// Investor Packet Modal Component
function InvestorPacketModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="INVESTOR PROSPECTUS — WILDFALL">
      <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: "calc(80vh - 100px)" }}>
        {/* Cover */}
        <div className="text-center py-4">
          <h1 className="text-3xl font-serif text-gold tracking-wider">WILDFALL</h1>
          <p className="text-gold text-xs tracking-[4px] mt-1">NO MAN'S JUNGLE</p>
          <div className="w-12 h-px bg-gold mx-auto my-3" />
          <p className="text-[10px] text-white/40">INVESTOR PROSPECTUS</p>
          <p className="text-xl font-serif text-gold mt-4">60 Hectares</p>
          <p className="text-xl font-serif text-gold">60 Players</p>
          <p className="text-xl font-serif text-gold">₱15M+ Annual Profit</p>
          <p className="text-[9px] text-white/30 mt-4">April 2026 • San Vicente, Palawan</p>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-md font-serif text-gold border-l-4 border-gold pl-3 mb-3">Executive Summary</h2>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-lg font-mono text-gold">60</div>
              <div className="text-[8px] text-white/40">HECTARES</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-lg font-mono text-gold">60</div>
              <div className="text-[8px] text-white/40">PLAYERS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-lg font-mono text-gold">2</div>
              <div className="text-[8px] text-white/40">DAYS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-lg font-mono text-gold">1</div>
              <div className="text-[8px] text-white/40">NIGHT</div>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">Wildfall: No Man's Jungle is a full-scale, live war simulation set in a 60-hectare tropical battlefield in San Vicente, Palawan.</p>
        </div>

        {/* Financial Summary */}
        <div>
          <h2 className="text-md font-serif text-gold border-l-4 border-gold pl-3 mb-3">Financial Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Development CAPEX</span>
              <span className="text-gold text-xs">₱3.58M</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Profit per Event</span>
              <span className="text-gold text-xs">₱322K</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Break-Even</span>
              <span className="text-gold text-xs">12 events / 3 months</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Year 1 Profit</span>
              <span className="text-gold text-xs">₱15.5M</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-xs text-white/60">ROI Year 1</span>
              <span className="text-gold text-xs">396%</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div>
          <h2 className="text-md font-serif text-gold border-l-4 border-gold pl-3 mb-3">Revenue Per Event</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Ticket Sales</span>
              <span className="text-gold text-xs">₱450,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Bar Revenue</span>
              <span className="text-gold text-xs">₱36,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Merchandise</span>
              <span className="text-gold text-xs">₱16,000</span>
            </div>
            <div className="flex justify-between py-1 pt-2 border-t border-gold/30">
              <span className="text-xs text-white font-bold">TOTAL</span>
              <span className="text-gold text-xs font-bold">₱502,000</span>
            </div>
          </div>
        </div>

        {/* Profit Box */}
        <div className="bg-gold/10 p-3 border border-gold/30 rounded text-center">
          <p className="text-xs text-white/60">NET PROFIT PER EVENT</p>
          <p className="text-2xl font-mono text-gold font-bold">₱322,000</p>
          <p className="text-[10px] text-white/40">64% profit margin</p>
        </div>

        {/* Sponsorship */}
        <div>
          <h2 className="text-md font-serif text-gold border-l-4 border-gold pl-3 mb-3">Sponsorship Potential</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">San Miguel Brewery</span>
              <span className="text-gold text-xs">₱500K/year</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Tanduay Rum</span>
              <span className="text-gold text-xs">₱250K/year</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Local Restaurant</span>
              <span className="text-gold text-xs">₱150K/year</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-xs text-white/60">Total</span>
              <span className="text-gold text-xs font-bold">₱3.1M/year</span>
            </div>
          </div>
        </div>

        {/* Investor Tiers */}
        <div>
          <h2 className="text-md font-serif text-gold border-l-4 border-gold pl-3 mb-3">Investor Tiers</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Seed</span>
              <span className="text-gold text-xs">₱500K (5%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Angel</span>
              <span className="text-gold text-xs">₱1M (10%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Partner</span>
              <span className="text-gold text-xs">₱2M (20%)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-xs text-white/60">Lead</span>
              <span className="text-gold text-xs font-bold">₱3.58M (35.8%)</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gold/10 p-3 text-center border border-gold/30 rounded">
          <p className="text-[10px] text-white/60">investors@wildfall.com</p>
          <p className="text-[9px] text-white/40 mt-1">San Vicente, Palawan</p>
        </div>
      </div>
    </Modal>
  );
}

export function InvestPlayerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"investor" | "player" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInvestorPacket, setShowInvestorPacket] = useState(false);
  const [eventData, setEventData] = useState({
    nextEventDate: "May 22-24, 2026",
    slotsRemaining: 14,
    maxSlots: 60,
    nextSiteVisit: "April 15-17, 2026",
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data, error } = await supabase
          .from('event_data')
          .select('*');
        
        if (error) {
          console.error("Error fetching event data:", error);
          return;
        }
        
        if (data && data.length > 0) {
          const map: Record<string, string> = {};
          data.forEach(item => {
            map[item.key] = item.value;
          });
          
          setEventData({
            nextEventDate: map.next_event_date || "May 22-24, 2026",
            slotsRemaining: parseInt(map.slots_remaining) || 14,
            maxSlots: parseInt(map.max_slots) || 60,
            nextSiteVisit: map.next_site_visit || "April 15-17, 2026",
          });
        }
      } catch (err) {
        console.error("Failed to fetch event data:", err);
      }
    };

    if (isOpen) {
      fetchEventData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !type) {
      alert("Please select a type and enter your email");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{ email, type }]);

      if (error) throw error;
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
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
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={() => { onClose(); reset(); }} 
        title={submitted ? "REGISTRATION SUCCESSFUL" : step === 1 ? "CHOOSE YOUR PATH" : `DEPLOY AS ${type?.toUpperCase()}`}
      >
        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
            <h4 className="text-2xl font-serif italic text-gold mb-3">You are on the list.</h4>
            <p className="text-white/60 text-sm mb-8">
              A strategic briefing has been sent to <span className="text-white">{email}</span>.
            </p>
            <button
              onClick={() => { onClose(); reset(); }}
              className="px-8 py-3 bg-gold text-black font-mono text-sm font-bold tracking-widest"
            >
              CLOSE
            </button>
          </div>
        ) : step === 1 ? (
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => { setType("investor"); setStep(2); }}
              className="group p-8 gold-border bg-black text-left hover:bg-gold/5 transition-all"
            >
              <Briefcase className="w-10 h-10 text-gold mb-4" />
              <h4 className="text-xl font-serif tracking-widest mb-2">INVESTOR</h4>
              <p className="text-xs text-white/40 mb-6">
                Access financial decks, site visit schedules, and equity opportunities.
              </p>
              <div className="text-gold text-[10px] font-mono">PROCEED →</div>
            </button>

            <button
              onClick={() => { setType("player"); setStep(2); }}
              className="group p-8 gold-border bg-black text-left hover:bg-gold/5 transition-all"
            >
              <Users className="w-10 h-10 text-gold mb-4" />
              <h4 className="text-xl font-serif tracking-widest mb-2">OPERATIVE</h4>
              <p className="text-xs text-white/40 mb-6">
                Book your slot, view available roles, and secure early bird codes.
              </p>
              <div className="text-gold text-[10px] font-mono">PROCEED →</div>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {type === "investor" ? (
                <>
                  <button
                    onClick={() => setShowInvestorPacket(true)}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-gold transition-all"
                  >
                    <Download className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40">Available Asset</div>
                      <div className="text-sm font-serif">View Investor Packet →</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Calendar className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40">Next Site Visit</div>
                      <div className="text-sm font-serif">{eventData.nextSiteVisit}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Calendar className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40">Next Event</div>
                      <div className="text-sm font-serif">{eventData.nextEventDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Users className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40">Slots Remaining</div>
                      <div className="text-sm font-serif">{eventData.slotsRemaining} / {eventData.maxSlots}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gold mb-2">Secure Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@ADDRESS.COM"
                  className="w-full bg-black border border-gold/30 p-3 text-white text-sm focus:border-gold outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold text-black font-mono text-sm font-bold tracking-widest hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? "TRANSMITTING..." : "REQUEST ACCESS →"}
              </button>
              <p className="text-[9px] font-mono text-white/20 text-center">
                By requesting access, you agree to the rules of engagement.
              </p>
            </form>
          </div>
        )}
      </Modal>

      <InvestorPacketModal isOpen={showInvestorPacket} onClose={() => setShowInvestorPacket(false)} />
    </>
  );
}
