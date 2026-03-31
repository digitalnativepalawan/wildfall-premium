import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { cn } from "../lib/utils";
import { CheckCircle2, ArrowRight, Download, Calendar, Users, Briefcase, X } from "lucide-react";
import { supabase } from "../lib/supabase";

// Investor Packet Modal Component - Full Prospectus
function InvestorPacketModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="INVESTOR PROSPECTUS — WILDFALL">
      <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-8">
        
        {/* Cover Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-serif gold-gradient-text tracking-wider">WILDFALL</h1>
          <p className="text-gold text-sm tracking-[4px] mt-2">NO MAN'S JUNGLE</p>
          <div className="w-16 h-px bg-gold mx-auto my-6" />
          <p className="text-xs text-white/40 tracking-[4px]">INVESTOR PROSPECTUS</p>
          <p className="text-3xl font-serif text-gold mt-8">60 Hectares</p>
          <p className="text-3xl font-serif text-gold mt-2">60 Players</p>
          <p className="text-3xl font-serif text-gold mt-2">₱15M+ Annual Profit</p>
          <p className="text-xs text-white/30 mt-8">April 2026 • San Vicente, Palawan</p>
          <div className="border-t border-gold/20 mt-8 pt-4">
            <p className="text-[10px] text-white/20">CONFIDENTIAL — FOR QUALIFIED INVESTORS ONLY</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Executive Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/5 border border-gold/20 p-3 text-center rounded">
              <div className="text-2xl font-mono text-gold">60</div>
              <div className="text-[9px] text-white/40">HECTARES</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-3 text-center rounded">
              <div className="text-2xl font-mono text-gold">60</div>
              <div className="text-[9px] text-white/40">PLAYERS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-3 text-center rounded">
              <div className="text-2xl font-mono text-gold">2</div>
              <div className="text-[9px] text-white/40">DAYS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-3 text-center rounded">
              <div className="text-2xl font-mono text-gold">1</div>
              <div className="text-[9px] text-white/40">NIGHT</div>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">Wildfall: No Man's Jungle is a full-scale, live war simulation set in a 60-hectare tropical battlefield in San Vicente, Palawan. With no direct competitors in the region, this premium immersive experience targets adventure tourists, corporate team-building, and military enthusiasts.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-gold font-mono text-xs mb-3">KEY HIGHLIGHTS</h3>
              <ul className="text-xs text-white/60 space-y-2 list-disc list-inside">
                <li>First-of-its-kind in Palawan</li>
                <li>64% profit margin per event</li>
                <li>3-month break-even</li>
                <li>₱15.5M Year 1 profit</li>
                <li>396% ROI in first year</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-mono text-xs mb-3">THE OPPORTUNITY</h3>
              <ul className="text-xs text-white/60 space-y-2 list-disc list-inside">
                <li>No direct competition</li>
                <li>Growing adventure tourism market</li>
                <li>Corporate team-building demand</li>
                <li>Military/law enforcement training</li>
                <li>Sponsorship revenue potential ₱3.1M/year</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">The Vision</h2>
          <p className="text-sm italic text-gold/80 mb-4">"This is not a match. This is not a game you play and forget."</p>
          <p className="text-sm text-white/60 leading-relaxed">Wildfall is a 48-hour immersive simulation that pushes the boundaries of tactical engagement. Participants are deployed into a living, breathing war zone where control is unstable, information is incomplete, and every decision carries weight.</p>
        </div>

        {/* Financial Summary */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Financial Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Development CAPEX</span>
              <span className="text-gold font-mono">₱3.58M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Profit per Event</span>
              <span className="text-gold font-mono">₱322K</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Break-Even</span>
              <span className="text-gold font-mono">12 events / 3 months</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Year 1 Profit</span>
              <span className="text-gold font-mono">₱15.5M</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-white/60">ROI Year 1</span>
              <span className="text-gold font-mono">396%</span>
            </div>
          </div>
        </div>

        {/* Development CAPEX */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Development CAPEX — ₱3.58M</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Terrain Preparation</span><span className="text-gold">₱260,000</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Las Sombras Village</span><span className="text-gold">₱700,000</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Base Camps (3)</span><span className="text-gold">₱390,000</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Outposts (3)</span><span className="text-gold">₱450,000</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Weapons & Equipment</span><span className="text-gold">₱700,000</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Tech System</span><span className="text-gold">₱280,000</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Setup & Buffer</span><span className="text-gold">₱800,000</span></div>
          </div>
        </div>

        {/* Revenue & Profit */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Revenue Per Event (60 Players)</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Ticket Sales (60 × ₱7,500)</span>
              <span className="text-gold font-mono">₱450,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Bar Revenue (La Tregua)</span>
              <span className="text-gold font-mono">₱36,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Merchandise & Photos</span>
              <span className="text-gold font-mono">₱16,000</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gold/30 pt-2">
              <span className="text-sm text-white font-bold">TOTAL REVENUE</span>
              <span className="text-gold font-mono font-bold">₱502,000</span>
            </div>
          </div>
        </div>

        {/* Profit Summary */}
        <div className="bg-gold/5 p-4 border border-gold/20 rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Operational Cost</span>
            <span className="text-white/60">-₱180,000</span>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gold/20">
            <span className="text-base text-white font-bold">NET PROFIT PER EVENT</span>
            <span className="text-gold font-mono font-bold text-xl">₱322,000</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-white/60">Profit Margin</span>
            <span className="text-gold text-xs">64%</span>
          </div>
        </div>

        {/* Sponsorship */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Sponsorship Potential</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">San Miguel Brewery</span>
              <span className="text-gold">₱500K/year</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Tanduay Rum</span>
              <span className="text-gold">₱250K/year</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Local Restaurant</span>
              <span className="text-gold">₱150K/year</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-white/60">Total Sponsorship</span>
              <span className="text-gold font-bold">₱3.1M/year</span>
            </div>
          </div>
        </div>

        {/* Investor Tiers */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Investor Tiers</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Seed</span>
              <span className="text-gold">₱500K (5%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Angel</span>
              <span className="text-gold">₱1M (10%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-sm text-white/60">Partner</span>
              <span className="text-gold">₱2M (20%)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-white/60">Lead</span>
              <span className="text-gold font-bold">₱3.58M (35.8%)</span>
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Competitive Advantage</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Duration</span><span className="text-gold">2 days/1 night</span><span className="text-white/40">vs 2-4 hours</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Terrain</span><span className="text-gold">60 hectares</span><span className="text-white/40">vs 1-5 hectares</span></div>
            <div className="flex justify-between py-1 border-b border-white/5"><span className="text-white/60">Players</span><span className="text-gold">60</span><span className="text-white/40">vs 10-20</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">NPCs</span><span className="text-gold">8 live actors</span><span className="text-white/40">vs None</span></div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-serif text-gold border-l-4 border-gold pl-4 mb-4">Timeline to Launch</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between py-1"><span className="text-white/60">Month 1-2</span><span className="text-white/80">Terrain preparation</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 2-3</span><span className="text-white/80">Construction</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 3-4</span><span className="text-white/80">Equipment & tech</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 4</span><span className="text-white/80">Staff hiring & training</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 5</span><span className="text-white/80">Beta test</span></div>
            <div className="flex justify-between py-1"><span className="text-gold">Month 6</span><span className="text-gold">GRAND OPENING</span></div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gold/10 p-6 text-center border border-gold/30 rounded mt-4">
          <p className="text-xs text-white/60">Ready to Deploy?</p>
          <p className="text-gold font-mono text-sm mt-2">investors@wildfall.com</p>
          <p className="text-xs text-white/40 mt-3">San Vicente, Palawan</p>
          <div className="border-t border-gold/20 mt-4 pt-4">
            <p className="text-[10px] text-white/30 italic">The war is waiting. The jungle is watching.</p>
          </div>
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

  // Fetch event data from Supabase
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
      console.log("Submitting:", { email, type });
      
      const { data, error } = await supabase
        .from('registrations')
        .insert([{ email, type }])
        .select();

      if (error) {
        console.error("Supabase error details:", error);
        alert(`Registration failed: ${error.message}`);
        return;
      }
      
      console.log("Success:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Caught error:", error);
      alert(`Registration failed: ${error}`);
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
                  <button
                    onClick={() => setShowInvestorPacket(true)}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-gold transition-all cursor-pointer"
                  >
                    <Download className="w-6 h-6 text-gold" />
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Available Asset</div>
                      <div className="text-sm font-serif italic">View Investor Packet →</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Calendar className="w-6 h-6 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Next Site Visit</div>
                      <div className="text-sm font-serif italic">{eventData.nextSiteVisit} • San Vicente</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Calendar className="w-6 h-6 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Next Event Date</div>
                      <div className="text-sm font-serif italic">{eventData.nextEventDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <Users className="w-6 h-6 text-gold" />
                    <div>
                      <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Slots Remaining</div>
                      <div className="text-sm font-serif italic">{eventData.slotsRemaining} / {eventData.maxSlots} Operatives</div>
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

      {/* Investor Packet Modal */}
      <InvestorPacketModal isOpen={showInvestorPacket} onClose={() => setShowInvestorPacket(false)} />
    </>
  );
}
