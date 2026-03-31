// Investor Packet Modal Component - Fixed (No Double Scroll)
function InvestorPacketModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="INVESTOR PROSPECTUS — WILDFALL">
      <div className="space-y-8 overflow-y-auto pr-2" style={{ maxHeight: "calc(85vh - 100px)" }}>
        {/* Cover Section */}
        <div className="text-center py-4">
          <h1 className="text-4xl font-serif gold-gradient-text tracking-wider">WILDFALL</h1>
          <p className="text-gold text-xs tracking-[4px] mt-2">NO MAN'S JUNGLE</p>
          <div className="w-16 h-px bg-gold mx-auto my-4" />
          <p className="text-[10px] text-white/40 tracking-[4px]">INVESTOR PROSPECTUS</p>
          <p className="text-2xl font-serif text-gold mt-6">60 Hectares</p>
          <p className="text-2xl font-serif text-gold mt-1">60 Players</p>
          <p className="text-2xl font-serif text-gold mt-1">₱15M+ Annual Profit</p>
          <p className="text-[10px] text-white/30 mt-6">April 2026 • San Vicente, Palawan</p>
          <div className="border-t border-gold/20 mt-6 pt-3">
            <p className="text-[8px] text-white/20">CONFIDENTIAL — FOR QUALIFIED INVESTORS ONLY</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Executive Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-xl font-mono text-gold">60</div>
              <div className="text-[8px] text-white/40">HECTARES</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-xl font-mono text-gold">60</div>
              <div className="text-[8px] text-white/40">PLAYERS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-xl font-mono text-gold">2</div>
              <div className="text-[8px] text-white/40">DAYS</div>
            </div>
            <div className="bg-white/5 border border-gold/20 p-2 text-center rounded">
              <div className="text-xl font-mono text-gold">1</div>
              <div className="text-[8px] text-white/40">NIGHT</div>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">Wildfall: No Man's Jungle is a full-scale, live war simulation set in a 60-hectare tropical battlefield in San Vicente, Palawan. With no direct competitors in the region, this premium immersive experience targets adventure tourists, corporate team-building, and military enthusiasts.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-gold font-mono text-[10px] mb-2">KEY HIGHLIGHTS</h3>
              <ul className="text-[11px] text-white/60 space-y-1 list-disc list-inside">
                <li>First-of-its-kind in Palawan</li>
                <li>64% profit margin per event</li>
                <li>3-month break-even</li>
                <li>₱15.5M Year 1 profit</li>
                <li>396% ROI in first year</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-mono text-[10px] mb-2">THE OPPORTUNITY</h3>
              <ul className="text-[11px] text-white/60 space-y-1 list-disc list-inside">
                <li>No direct competition</li>
                <li>Growing adventure tourism market</li>
                <li>Corporate team-building demand</li>
                <li>Military/law enforcement training</li>
                <li>Sponsorship revenue potential ₱3.1M/year</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Financial Summary</h2>
          <div className="space-y-1">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Development CAPEX</span>
              <span className="text-gold font-mono text-xs">₱3.58M</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Profit per Event</span>
              <span className="text-gold font-mono text-xs">₱322K</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Break-Even</span>
              <span className="text-gold font-mono text-xs">12 events / 3 months</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Year 1 Profit</span>
              <span className="text-gold font-mono text-xs">₱15.5M</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-xs text-white/60">ROI Year 1</span>
              <span className="text-gold font-mono text-xs">396%</span>
            </div>
          </div>
        </div>

        {/* Revenue Per Event */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Revenue Per Event (60 Players)</h2>
          <div className="space-y-1">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Ticket Sales (60 × ₱7,500)</span>
              <span className="text-gold font-mono text-xs">₱450,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Bar Revenue (La Tregua)</span>
              <span className="text-gold font-mono text-xs">₱36,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-xs text-white/60">Merchandise & Photos</span>
              <span className="text-gold font-mono text-xs">₱16,000</span>
            </div>
            <div className="flex justify-between py-1 border-t border-gold/30 pt-2 mt-1">
              <span className="text-xs text-white font-bold">TOTAL REVENUE</span>
              <span className="text-gold font-mono text-xs font-bold">₱502,000</span>
            </div>
          </div>
        </div>

        {/* Profit Summary */}
        <div className="bg-gold/5 p-3 border border-gold/20 rounded">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white">Operational Cost</span>
            <span className="text-white/60 text-xs">-₱180,000</span>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gold/20">
            <span className="text-sm text-white font-bold">NET PROFIT PER EVENT</span>
            <span className="text-gold font-mono font-bold text-base">₱322,000</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-white/60">Profit Margin</span>
            <span className="text-gold text-[10px]">64%</span>
          </div>
        </div>

        {/* Sponsorship Potential */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Sponsorship Potential</h2>
          <div className="space-y-1">
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
              <span className="text-xs text-white/60">Total Sponsorship</span>
              <span className="text-gold text-xs font-bold">₱3.1M/year</span>
            </div>
          </div>
        </div>

        {/* Investor Tiers */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Investor Tiers</h2>
          <div className="space-y-1">
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

        {/* Competitive Advantage */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Competitive Advantage</h2>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/60">Duration</span>
              <span className="text-gold">2 days/1 night</span>
              <span className="text-white/40">vs 2-4 hours</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/60">Terrain</span>
              <span className="text-gold">60 hectares</span>
              <span className="text-white/40">vs 1-5 hectares</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/60">Players</span>
              <span className="text-gold">60</span>
              <span className="text-white/40">vs 10-20</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/60">NPCs</span>
              <span className="text-gold">8 live actors</span>
              <span className="text-white/40">vs None</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-lg font-serif text-gold border-l-4 border-gold pl-3 mb-3">Timeline to Launch</h2>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1"><span className="text-white/60">Month 1-2</span><span className="text-white/80">Terrain preparation</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 2-3</span><span className="text-white/80">Construction</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 3-4</span><span className="text-white/80">Equipment & tech</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 4</span><span className="text-white/80">Staff hiring & training</span></div>
            <div className="flex justify-between py-1"><span className="text-white/60">Month 5</span><span className="text-white/80">Beta test</span></div>
            <div className="flex justify-between py-1"><span className="text-gold">Month 6</span><span className="text-gold">GRAND OPENING</span></div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gold/10 p-4 text-center border border-gold/30 rounded">
          <p className="text-[10px] text-white/60">Ready to Deploy?</p>
          <p className="text-gold font-mono text-xs mt-1">investors@wildfall.com</p>
          <p className="text-[10px] text-white/40 mt-2">San Vicente, Palawan</p>
          <div className="border-t border-gold/20 mt-3 pt-3">
            <p className="text-[8px] text-white/30 italic">The war is waiting. The jungle is watching.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
