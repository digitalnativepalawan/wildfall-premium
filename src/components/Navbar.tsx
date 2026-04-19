import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, Settings } from "lucide-react";
import { cn } from "../lib/utils";

// TODO: Replace with Supabase auth later
const user = null;
const isAdmin = false;

const signIn = () => {
  alert("Login with Supabase coming soon");
};

const logOut = () => {
  alert("Logout coming soon");
};

export function Navbar({ onAdminToggle }: { onAdminToggle: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "EXPERIENCE", href: "#experience" },
    { name: "ROLES", href: "#roles" },
    { name: "BATTLEFIELD", href: "#battlefield" },
    { name: "FACTIONS", href: "#factions" },
    { name: "INVESTMENT", href: "#investment" },
    { name: "ENLIST", href: "#deploy" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        scrolled ? "bg-black/90 backdrop-blur-md border-gold/20 py-3" : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-gold transition-transform group-hover:scale-110" />
          <span className="font-serif text-2xl tracking-tighter gold-gradient-text">WILDFALL</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono tracking-widest text-white/60 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            {isAdmin && (
              <button 
                onClick={onAdminToggle}
                className="p-2 text-gold/60 hover:text-gold transition-colors"
                title="Admin Panel"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            
            {user ? (
              <button 
                onClick={logOut}
                className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <span>LOGOUT</span>
              </button>
            ) : (
              <button 
                onClick={signIn}
                className="text-xs font-mono text-gold hover:text-white transition-colors"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-gold/20 p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-mono tracking-widest text-white/60 hover:text-gold"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              {isAdmin && (
                <button onClick={() => { onAdminToggle(); setIsOpen(false); }} className="text-gold flex items-center gap-2">
                  <Settings className="w-5 h-5" /> ADMIN PANEL
                </button>
              )}
              {user ? (
                <button onClick={logOut} className="text-white/60">
                  LOGOUT
                </button>
              ) : (
                <button onClick={signIn} className="text-gold">LOGIN</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
