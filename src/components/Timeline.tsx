import { motion } from "motion/react";

export function Timeline() {
  const events = [
    { time: "09:30", event: "EXTRACTION", description: "All participants extracted from rendezvous points." },
    { time: "10:30", event: "TRAINING PHASE", description: "Weaponry, tactical movement, and comms briefing." },
    { time: "13:00", event: "TEAM FORMATION", description: "Factions assigned, roles locked, base camps established." },
    { time: "14:00", event: "DEPLOYMENT", description: "Teams move to their respective starting sectors." },
    { time: "15:00", event: "WAR BEGINS", description: "Rules of engagement active. No man's jungle is live." },
  ];

  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Journey <span className="gold-text italic">Timeline</span></h2>
          <p className="text-xs font-mono tracking-widest text-white/40">THE FIRST 24 HOURS</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-32">
            {events.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 flex justify-center md:justify-start px-12">
                  <div className={`text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="text-4xl font-mono text-gold mb-2">{item.time}</div>
                    <h3 className="text-2xl font-serif tracking-widest mb-4">{item.event}</h3>
                    <p className="text-sm text-white/40 max-w-xs mx-auto md:mx-0">{item.description}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-black border-2 border-gold shadow-[0_0_10px_rgba(197,160,40,0.5)]" />
                </div>

                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
