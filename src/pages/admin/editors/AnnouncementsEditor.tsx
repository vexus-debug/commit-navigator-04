import { useState, useEffect } from "react";
import { saveSiteContentKey, loadSiteContent } from "@/lib/supabase-content";
import { logActivity } from "@/lib/admin-helpers";
import { Megaphone, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  enabled: boolean;
  text: string;
  link: string;
  linkText: string;
  bgColor: string;
  textColor: string;
}

const defaultAnnouncement: Announcement = {
  enabled: false,
  text: "",
  link: "",
  linkText: "Learn More",
  bgColor: "hsl(213, 86%, 30%)",
  textColor: "hsl(0, 0%, 100%)",
};

const AnnouncementsEditor = () => {
  const [ann, setAnn] = useState<Announcement>(defaultAnnouncement);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSiteContent().then(data => {
      if (data?.site_announcement) {
        setAnn({ ...defaultAnnouncement, ...data.site_announcement });
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveSiteContentKey("site_announcement", ann);
    if (ok) {
      await logActivity("Updated site announcement", { enabled: ann.enabled });
      toast({ title: "Announcement saved!" });
    } else {
      toast({ title: "Save failed", variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Megaphone size={24} className="text-secondary" /> Site Announcement
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Display a top banner across the public site</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save
        </button>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5 space-y-5">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Enable Announcement Bar</span>
          <button
            onClick={() => setAnn(p => ({ ...p, enabled: !p.enabled }))}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${ann.enabled ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}
          >
            {ann.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
            {ann.enabled ? "Active" : "Disabled"}
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Announcement Text</label>
          <input
            value={ann.text}
            onChange={e => setAnn(p => ({ ...p, text: e.target.value }))}
            placeholder="🎉 Check out our upcoming event..."
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Link URL</label>
            <input
              value={ann.link}
              onChange={e => setAnn(p => ({ ...p, link: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Link Text</label>
            <input
              value={ann.linkText}
              onChange={e => setAnn(p => ({ ...p, linkText: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Preview */}
        {ann.enabled && ann.text && (
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">Preview</label>
            <div
              className="rounded-xl px-4 py-3 text-center text-sm font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: ann.bgColor, color: ann.textColor }}
            >
              {ann.text}
              {ann.link && ann.linkText && (
                <span className="underline opacity-80">{ann.linkText}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsEditor;
