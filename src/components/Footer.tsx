import { Shield } from "lucide-react";

export function Footer() {
  const links = [
    { name: "About Wildfall", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ];

  return (
    <footer className="py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Shield className="w-8 h-8 text-gold" />
              <span className="font-serif text-2xl tracking-tighter gold-gradient-text">WILDFALL</span>
            </div>
            <p className="text-sm text-white/40 font-serif italic max-w-sm leading-relaxed mb-8">
              The world's most immersive live war simulation. 60 hectares of tactical terrain in the heart of Palawan.
            </p>
            <div className="text-[10px] font-mono text-gold/60 tracking-widest uppercase">
              San Vicente, Palawan • Between Port Barton & Poblacion
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-6">Navigation</div>
              {links.slice(0, 3).map((link) => (
                <a key={link.name} href={link.href} className="block text-sm text-white/60 hover:text-gold transition-colors font-serif italic">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-6">Resources</div>
              {links.slice(3).map((link) => (
                <a key={link.name} href={link.href} className="block text-sm text-white/60 hover:text-gold transition-colors font-serif italic">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
          <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
            © 2026 WILDFALL SIMULATIONS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            {["INSTAGRAM", "TWITTER", "YOUTUBE"].map((social) => (
              <a key={social} href="#" className="text-[10px] font-mono text-white/20 hover:text-gold transition-colors tracking-widest">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
