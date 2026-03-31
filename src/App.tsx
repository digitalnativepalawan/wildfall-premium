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
import { Footer } from "./components/Footer";
import { FieldManualModal } from "./components/FieldManualModal";
import { InvestPlayerModal } from "./components/InvestPlayerModal";
import { AdminPanel } from "./components/AdminPanel";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [isFieldManualOpen, setIsFieldManualOpen] = useState(false);
  const [isInvestParticipateOpen, setIsInvestParticipateOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Seed initial content if empty
  useEffect(() => {
    const seedContent = async () => {
      const snapshot = await getDocs(collection(db, "content"));
      if (snapshot.empty) {
        const initialSections = [
          { id: "hero", title: "WILDFALL", subtitle: "No Man's Jungle" },
          { id: "location", title: "Location & Terrain", subtitle: "San Vicente, Palawan" },
          { id: "roles", title: "Operational Roles", subtitle: "Choose Your Doctrine" },
          { id: "battlefield", title: "Battlefield Zones", subtitle: "The Theater of War" },
          { id: "factions", title: "The Factions", subtitle: "Choose Your Allegiance" },
          { id: "npc", title: "NPC World", subtitle: "The Denizens of Las Sombras" },
          { id: "scoring", title: "Scoring System", subtitle: "The Metrics of Victory" },
          { id: "operations", title: "Operations & Investment", subtitle: "The Business of War" },
          { id: "careers", title: "Join the Team", subtitle: "Recruitment" }
        ];

        for (const section of initialSections) {
          await setDoc(doc(db, "content", section.id), section);
        }
      }
    };
    seedContent();
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
    </div>
  );
}
