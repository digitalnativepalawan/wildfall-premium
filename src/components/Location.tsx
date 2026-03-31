import { motion } from "motion/react";
import { MapPin, Mountain, Trees, Compass, Route } from "lucide-react";

export function Location() {
  const stats = [
    { label: "HECTARES", value: "60", icon: Trees },
    { label: "ELEVATION", value: "450m", icon: Mountain },
    { label: "HIDDEN PATHS", value: "12", icon: Route },
    { label: "DENSE JUNGLE", value: "85%", icon: Compass },
  ];

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <div className="flex items-center gap-3 text-gold mb-6">
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-mono tracking-widest">SAN VICENTE, PALAWAN</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              Location & <br /><span className="gold-text italic">Terrain</span>
            </h2>
            <p className="text-lg text-white/60 font-serif italic mb-12 max-w-lg">
              Situated between the pristine shores of Port Barton and the rugged mountains of Poblacion, 
              Wildfall takes place in the most unforgiving terrain in the Philippines.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
                    <span className="text-[10px] font-mono tracking-widest text-white/40">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-mono text-gold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square md:aspect-auto md:h-[600px] gold-border rounded-sm overflow-hidden bg-white/5">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/jungle/1200/1600')] bg-cover bg-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/80 backdrop-blur-md border border-gold/20">
              <div className="text-[10px] font-mono text-gold mb-2 tracking-widest">STRATEGIC INTEL</div>
              <p className="text-sm text-white/80 font-serif italic">
                "The canopy provides 90% concealment from aerial reconnaissance. Movement is slow, deliberate, and dangerous."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
