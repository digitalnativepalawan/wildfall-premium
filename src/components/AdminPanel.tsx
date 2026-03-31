import { useState } from "react";
import { Modal } from "./Modal";
import { useContent, SectionContent } from "../hooks/useContent";
import { Save, Loader2 } from "lucide-react";

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { content, updateSection, loading } = useContent();
  const [saving, setSaving] = useState(false);

  const handleSave = async (id: string, data: any) => {
    setSaving(true);
    try {
      await updateSection(id, data);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="COMMAND CENTER — CONTENT MANAGEMENT">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      ) : (
        <div className="space-y-12">
          <div className="p-6 bg-gold/5 border border-gold/20">
            <h4 className="text-gold font-mono text-xs tracking-widest mb-4 uppercase">System Status</h4>
            <p className="text-sm text-white/60 font-serif italic">
              All systems operational. Content modifications will be reflected in real-time across all active deployments.
            </p>
          </div>

          <div className="space-y-8">
            {Object.values(content).map((section) => (
              <div key={section.id} className="p-8 gold-border bg-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-xl font-serif tracking-widest text-gold uppercase">{section.id}</h5>
                  <button
                    onClick={() => handleSave(section.id, section)}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-black font-mono text-[10px] font-bold tracking-widest hover:bg-white transition-all disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" />
                    {saving ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                </div>
                
                <div className="grid gap-6">
                  <div>
                    <label className="block text-[10px] font-mono text-white/40 tracking-widest uppercase mb-2">Title</label>
                    <input
                      type="text"
                      defaultValue={section.title}
                      onChange={(e) => section.title = e.target.value}
                      className="w-full bg-black border border-white/10 p-3 text-white font-serif text-sm focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-white/40 tracking-widest uppercase mb-2">Subtitle</label>
                    <input
                      type="text"
                      defaultValue={section.subtitle}
                      onChange={(e) => section.subtitle = e.target.value}
                      className="w-full bg-black border border-white/10 p-3 text-white font-serif text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
