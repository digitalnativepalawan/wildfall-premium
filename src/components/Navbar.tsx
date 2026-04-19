/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  const [shieldClickCount, setShieldClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shield click trigger for classified intel (code: alpha)
  const handleShieldClick = (e: React.MouseEvent) => {
    // Prevent navigation if it's a link
    e.preventDefault();
    
    setShieldClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        // Dispatch event for classified intel
        window.dispatchEvent(new CustomEvent('classified-trigger', { detail: 'alpha' }));
        return 0;
      }
      // Reset after 2 seconds of no clicks
      setTimeout(() => setShieldClickCount(0), 2000);
      return newCount;
    });
  };

  const navLinks = [
    { name: "EXPERIENCE", href: "#experience" },
    { name: "ROLES", href: "#roles" },
    { name: "BATTLEFIELD", href: "#battlefield" },
    { name: "FACTIONS", href: "#factions" },
    { name: "INVESTMENT", href: "#investment" },
    { name: "ENLIST", href: "#deploy" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Shield click trigger for classified intel */}
          <a 
            href="#" 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={handleShieldClick}
            title="Click 5 times for secret intel"
          >
            <Shield className={cn(
              "w-6 h-6 text-gold transition-transform",
              shieldClickCount > 0 && "scale-110"
            )} />
            <span className="text-sm font-mono tracking-widest text-white font-bold">
              WILDFALL
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-mono tracking-widest text-white/60 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {isAdmin && (
              <button
                onClick={onAdminToggle}
                className="text-gold flex items-center gap-2 text-sm font-mono tracking-widest"
              >
                <Settings className="w-4 h-4" />
                ADMIN
              </button>
            )}
            
            {user ? (
              <button
                onClick={logOut}
                className="text-sm font-mono tracking-widest text-white/60 hover:text-gold transition-colors"
              >
                LOGOUT
              </button>
            ) : (
              <button
                onClick={signIn}
                className="text-sm font-mono tracking-widest text-white/60 hover:text-gold transition-colors"
              >
                LOGIN
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10"
            >
              <div className="flex flex-col gap-4">
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
                
                {isAdmin && (
                  <button
                    onClick={() => {
                      onAdminToggle();
                      setIsOpen(false);
                    }}
                    className="text-gold flex items-center gap-2 text-sm font-mono tracking-widest"
                  >
                    <Settings className="w-4 h-4" />
                    ADMIN PANEL
                  </button>
                )}
                
                {user ? (
                  <button
                    onClick={logOut}
                    className="text-sm font-mono tracking-widest text-white/60 hover:text-gold text-left"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <button
                    onClick={signIn}
                    className="text-sm font-mono tracking-widest text-white/60 hover:text-gold text-left"
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
