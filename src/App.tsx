/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react"; // ← ADD useEffect
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
import { Footer } from "./components/Footer";
import { FieldManualModal } from "./components/FieldManualModal";
import { InvestPlayerModal } from "./components/InvestPlayerModal";
import { AdminPanel } from "./components/AdminPanel";
import { ClassifiedIntel } from "./components/ClassifiedIntel"; // ← ADD THIS IMPORT

export default function App() {
  const [isFieldManualOpen, setIsFieldManualOpen] = useState(false);
  const [isInvestParticipateOpen, setIsInvestParticipateOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // ← ADD THESE 2 LINES (classified intel state)
  const [classifiedOpen, setClassifiedOpen] = useState(false);
  const [classifiedCode, setClassifiedCode] = useState('');

  // ← ADD THIS useEffect (listen for triggers)
  useEffect(() => {
    const handleClassifiedTrigger = (e: CustomEvent) => {
      setClassifiedCode(e.detail);
      setClassifiedOpen(true);
    };
    
    window.addEventListener('classified-trigger' as any, handleClassifiedTrigger);
    return () => window.removeEventListener('classified-trigger' as any, handleClassifiedTrigger);
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
        <Recruitment />
      </main>

      <Footer />

      {/* Modals */}
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
      
      {/* ← ADD THIS MODAL (classified intel) */}
      <ClassifiedIntel 
        isOpen={classifiedOpen} 
        onClose={() => setClassifiedOpen(false)} 
        code={classifiedCode}
      />
    </div>
  );
}
