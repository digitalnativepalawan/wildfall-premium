/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Location } from "./components/Location";
import { Timeline } from "./components/Timeline";
import { Roles } from "./components/Roles";
import { Battlefield } from "./components/Battlefield";
import { Factions } from "./components/Factions";
import { NPCs } from "./components/NPCs";
import { Scoring } from "./components/Scoring";
import { FinalPhase } from "./components/FinalPhase";
import { Operations } from "./components/Operations";
import { CTA } from "./components/CTA";
import { Careers } from "./components/Careers";
import { Recruitment } from "./components/Recruitment";
import { SupplyCrates } from "./components/SupplyCrates";
import { Footer } from "./components/Footer";
import { FieldManualModal } from "./components/FieldManualModal";
import { InvestPlayerModal } from "./components/InvestPlayerModal";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [isFieldManualOpen, setIsFieldManualOpen] = useState(false);
  const [isInvestParticipateOpen, setIsInvestParticipateOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Keep userId in sync with localStorage (login/logout from Navbar)
  useEffect(() => {
    const sync = () => setCurrentUserId(localStorage.getItem('wildfall_user_id'));
    sync();
    window.addEventListener('storage', sync);
    // Poll every 2s for in-tab login changes
    const interval = setInterval(sync, 2000);
    return () => {
      window.removeEventListener('storage', sync);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-gold selection:text-black">
      <Navbar onAdminToggle={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero />
        <Location />
        <Timeline />
        <Roles />
        <Battlefield />
        <Factions />
        <NPCs />
        <Scoring />
        <FinalPhase />
        <Operations />
        <CTA 
          onFieldManual={() => setIsFieldManualOpen(true)} 
          onInvestParticipate={() => setIsInvestParticipateOpen(true)} 
        />
        <Careers />

        {/* Supply Drops — appears automatically when admin drops a crate */}
        <SupplyCrates currentUserId={currentUserId} />

        <Recruitment />
      </main>

      <Footer />

      <FieldManualModal 
        isOpen={isFieldManualOpen} 
        onClose={() => setIsFieldManualOpen(false)} 
      />
      <InvestPlayerModal 
        isOpen={isInvestParticipateOpen} 
        onClose={() => setIsInvestParticipateOpen(false)} 
      />
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
