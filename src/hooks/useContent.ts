import { useState, useEffect } from "react";

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  data: any;
}

// Default static content (replace with Supabase later)
const defaultContent: Record<string, SectionContent> = {
  hero: { id: "hero", title: "WILDFALL", subtitle: "No Man's Jungle", data: {} },
  location: { id: "location", title: "Location & Terrain", subtitle: "San Vicente, Palawan", data: {} },
  roles: { id: "roles", title: "Operational Roles", subtitle: "Choose Your Doctrine", data: {} },
  battlefield: { id: "battlefield", title: "Battlefield Zones", subtitle: "The Theater of War", data: {} },
  factions: { id: "factions", title: "The Factions", subtitle: "Choose Your Allegiance", data: {} },
  npc: { id: "npc", title: "NPC World", subtitle: "The Denizens of Las Sombras", data: {} },
  scoring: { id: "scoring", title: "Scoring System", subtitle: "The Metrics of Victory", data: {} },
  operations: { id: "operations", title: "Operations & Investment", subtitle: "The Business of War", data: {} },
  careers: { id: "careers", title: "Join the Team", subtitle: "Recruitment", data: {} },
};

export function useContent() {
  const [content, setContent] = useState<Record<string, SectionContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Supabase later
    // Simulate loading data
    setTimeout(() => {
      setContent(defaultContent);
      setLoading(false);
    }, 100);
  }, []);

  const updateSection = async (id: string, data: Partial<SectionContent>) => {
    // TODO: Replace with Supabase later
    console.log("Update section:", id, data);
    setContent(prev => ({
      ...prev,
      [id]: { ...prev[id], ...data }
    }));
  };

  return { content, loading, updateSection };
}
