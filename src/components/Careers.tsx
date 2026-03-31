import { motion } from "motion/react";
import { Briefcase, MapPin } from "lucide-react";

export function Careers() {
  const positions = [
    { title: "FIELD OPERATIVE", req: "Military/LEO background preferred. High physical endurance.", type: "FULL-TIME" },
    { title: "LOGISTICS COORDINATOR", req: "Experience in remote supply chain management.", type: "CONTRACT" },
    { title: "MEDICAL STAFF", req: "Certified trauma medic or emergency nurse.", type: "EVENT-BASED" },
    { title: "HOSPITALITY MANAGER", req: "Experience in luxury or remote resort management.", type: "FULL-TIME" },
    { title: "JUNGLE GUIDE", req: "Deep knowledge of Palawan flora/fauna. Local residents only.", type: "CONTRACT" },
  ];

  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-gold mb-4">
              <Briefcase className="w-6 h-6" />
              <span className="text-xs font-mono tracking-widest uppercase">Recruitment</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Join the <br /><span className="gold-text italic">Team</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-gold/10 border border-gold/20 text-gold">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Local Hiring Highlight: San Vicente Residents</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-6 px-4 text-[10px] font-mono text-white/40 tracking-widest uppercase">Position</th>
                <th className="text-left py-6 px-4 text-[10px] font-mono text-white/40 tracking-widest uppercase">Requirements</th>
                <th className="text-left py-6 px-4 text-[10px] font-mono text-white/40 tracking-widest uppercase">Type</th>
                <th className="text-right py-6 px-4 text-[10px] font-mono text-white/40 tracking-widest uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, idx) => (
                <motion.tr
                  key={pos.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-b border-white/5 hover:bg-gold/5 transition-colors group"
                >
                  <td className="py-8 px-4">
                    <div className="text-xl font-serif tracking-widest group-hover:text-gold transition-colors">{pos.title}</div>
                  </td>
                  <td className="py-8 px-4">
                    <div className="text-sm text-white/40 font-serif italic">{pos.req}</div>
                  </td>
                  <td className="py-8 px-4">
                    <div className="text-[10px] font-mono text-gold/60 tracking-widest">{pos.type}</div>
                  </td>
                  <td className="py-8 px-4 text-right">
                    <button className="px-6 py-2 border border-gold/30 text-[10px] font-mono text-gold hover:bg-gold hover:text-black transition-all duration-300 tracking-widest">
                      APPLY
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
