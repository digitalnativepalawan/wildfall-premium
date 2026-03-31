import { motion } from "motion/react";
import { TrendingUp, DollarSign, BarChart3, PieChart } from "lucide-react";

export function Operations() {
  const financials = [
    { label: "DEVELOPMENT CAPEX", value: "₱3.9M", icon: TrendingUp, desc: "Initial infrastructure and equipment investment." },
    { label: "OPERATIONAL COST", value: "₱180K", icon: DollarSign, desc: "Cost per 2-day simulation event." },
    { label: "REVENUE PER EVENT", value: "₱405K", icon: BarChart3, desc: "Ticket sales and premium services." },
    { label: "PROFIT PER EVENT", value: "₱230K", icon: PieChart, desc: "Net profit after all operational expenses." },
  ];

  return (
    <section id="investment" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Operations & <span className="gold-text italic">Investment</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">THE BUSINESS OF WAR</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {financials.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 gold-border bg-black group hover:bg-gold/5 transition-all duration-500"
            >
              <item.icon className="w-6 h-6 text-gold/40 mb-8 group-hover:text-gold transition-colors" />
              <div className="text-3xl font-mono text-gold mb-4">{item.value}</div>
              <h3 className="text-[10px] font-mono tracking-widest mb-4 uppercase text-white/60">{item.label}</h3>
              <p className="text-xs text-white/30 font-serif italic leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-12 gold-border bg-black/40 backdrop-blur-md">
            <h3 className="text-2xl font-serif mb-8 tracking-widest">MONTHLY <span className="gold-text">PROJECTIONS</span></h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-white/40 tracking-widest">BAR & HOSPITALITY REVENUE</span>
                <span className="text-2xl font-mono text-gold">+₱25K-40K</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-white/40 tracking-widest">TOTAL PROFIT PER EVENT</span>
                <span className="text-2xl font-mono text-gold">₱250K-270K</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-mono text-white/40 tracking-widest">ESTIMATED MONTHLY REVENUE</span>
                <span className="text-4xl font-mono text-gold">₱1M+</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-lg text-white/60 font-serif italic mb-8 leading-relaxed">
              "Wildfall is not just a simulation; it's a scalable ecosystem. With 60 hectares of prime terrain and a growing demand for elite experiences, the ROI is as certain as the sunrise over the canopy."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase">Strategic Investment Opportunity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
