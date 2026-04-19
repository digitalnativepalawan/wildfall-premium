/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, User, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";

export function Navbar({ onAdminToggle }: { onAdminToggle: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginCode, setLoginCode] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const userId = localStorage.getItem('wildfall_user_id');
    if (userId) {
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId: string) => {
    const { data } = await supabase
      .from('operatives')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setCurrentUser(data);
    }
  };

  const handleLogin = async () => {
    if (!loginCode.trim()) return;
    
    setLoading(true);
    
    const { data } = await supabase
      .from('operatives')
      .select('*')
      .eq('deployment_code', loginCode.trim().toUpperCase())
      .single();
    
    if (data) {
      localStorage.setItem('wildfall_user_id', data.id);
      setCurrentUser(data);
      setShowLogin(false);
      setLoginCode('');
      // Scroll to recruitment section
      document.getElementById('deploy')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Invalid deployment code. Check your code and try again.');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('wildfall_user_id');
    setCurrentUser(null);
  };

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
    <>
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
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
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
              
              {/* ADMIN BUTTON */}
              <button
                onClick={onAdminToggle}
                className="text-gold flex items-center gap-2 text-sm font-mono tracking-widest border border-gold/30 px-3 py-1 rounded-sm hover:border-gold"
              >
                ADMIN
              </button>
              
              {/* USER SECTION */}
              {currentUser ? (
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  {/* User Mini Profile */}
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      currentUser.faction === 'legion' && "bg-red-900/50 text-red-400",
                      currentUser.faction === 'guard' && "bg-blue-900/50 text-blue-400",
                      currentUser.faction === 'front' && "bg-green-900/50 text-green-400"
                    )}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-bold text-white leading-none">{currentUser.codename}</p>
                      <p className="text-xs text-gold font-mono">{currentUser.points} pts • Lvl {currentUser.clearance_level}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="text-white/60 hover:text-white"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm font-mono tracking-widest text-gold hover:text-gold/80 transition-colors border border-gold/30 px-4 py-2 rounded-sm hover:border-gold"
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
                  
                  {currentUser ? (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          currentUser.faction === 'legion' && "bg-red-900/50 text-red-400",
                          currentUser.faction === 'guard' && "bg-blue-900/50 text-blue-400",
                          currentUser.faction === 'front' && "bg-green-900/50 text-green-400"
                        )}>
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{currentUser.codename}</p>
                          <p className="text-xs text-gold font-mono">{currentUser.points} pts • Lvl {currentUser.clearance_level}</p>
                          <p className="text-xs text-gray-400 font-mono">Code: {currentUser.deployment_code}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="text-sm font-mono text-red-400 hover:text-red-300"
                      >
                        LOGOUT
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setIsOpen(false);
                      }}
                      className="text-gold text-sm font-mono tracking-widest border border-gold/30 px-4 py-2 rounded"
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

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-gold/30"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold">Operative Login</h3>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-400 mb-4 text-sm">
              Enter your deployment code to access your operative profile.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gold/70 uppercase mb-2">
                  Deployment Code
                </label>
                <input
                  type="text"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  placeholder="e.g., WF-2026-LEG-451"
                  className="w-full p-3 bg-black rounded border border-white/10 focus:border-gold focus:outline-none font-mono uppercase"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <button
                onClick={handleLogin}
                disabled={loading || !loginCode.trim()}
                className="w-full py-3 bg-gold text-black font-bold rounded hover:bg-gold/80 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'ACCESS PROFILE'}
              </button>
              
              <button
                onClick={() => {
                  setShowLogin(false);
                  document.getElementById('deploy')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 text-sm text-gray-400 hover:text-white"
              >
                Don't have a code? Create profile →
              </button>
            </div>
            
            <div className="mt-6 p-3 bg-black/50 rounded border border-white/5">
              <p className="text-xs text-gray-500 text-center">
                Your deployment code was shown after creating your profile.<br/>
                Example: <span className="text-gold font-mono">WF-2026-LEG-451</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
