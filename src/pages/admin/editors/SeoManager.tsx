import { useState, useEffect } from "react";
import { saveSiteContentKey, loadSiteContent } from "@/lib/supabase-content";
import { logActivity } from "@/lib/admin-helpers";
import { FileText, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
}

const defaultSeo: Record<string, PageSeo> = {
  home: { title: "TLEC - The Living Eye Centre", description: "Restoring sight, restoring hope in Port Harcourt, Nigeria", ogImage: "" },
  about: { title: "About TLEC", description: "Learn about our mission and story", ogImage: "" },
  clinic: { title: "Eye Clinic - TLEC", description: "World-class eye care services", ogImage: "" },
  blog: { title: "Blog - TLEC", description: "Latest news and stories", ogImage: "" },
  donate: { title: "Donate - TLEC", description: "Support our mission", ogImage: "" },
  contact: { title: "Contact - TLEC", description: "Get in touch with us", ogImage: "" },
  gallery: { title: "Gallery - TLEC", description: "Photos from our work", ogImage: "" },
};

const SeoManager = () => {
  const [seo, setSeo] = useState<Record<string, PageSeo>>(defaultSeo);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSiteContent().then(data => {
      if (data?.seo_settings) {
        setSeo({ ...defaultSeo, ...(data.seo_settings as Record<string, PageSeo>) });
      }
    });
  }, []);

  const handleChange = (page: string, field: keyof PageSeo, value: string) => {
    setSeo(prev => ({ ...prev, [page]: { ...prev[page], [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveSiteContentKey("seo_settings", seo);
    if (ok) {
      await logActivity("Updated SEO settings");
      toast({ title: "SEO settings saved!" });
    } else {
      toast({ title: "Save failed", variant: "destructive" });
    }
    setSaving(false);
  };

  const pages = Object.keys(seo);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText size={24} className="text-secondary" /> SEO & Meta Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage titles, descriptions, and OG images for all pages</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save All
        </button>
      </div>

      <div className="space-y-4">
        {pages.map(page => (
          <div key={page} className="rounded-2xl bg-card border border-border p-5 space-y-4">
            <h3 className="font-heading text-sm font-bold text-foreground capitalize">{page} Page</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Page Title</label>
                <input
                  value={seo[page].title}
                  onChange={e => handleChange(page, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={60}
                />
                <p className="text-[10px] text-muted-foreground mt-1">{seo[page].title.length}/60</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">OG Image URL</label>
                <input
                  value={seo[page].ogImage}
                  onChange={e => handleChange(page, "ogImage", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Meta Description</label>
              <textarea
                value={seo[page].description}
                onChange={e => handleChange(page, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={2}
                maxLength={160}
              />
              <p className="text-[10px] text-muted-foreground mt-1">{seo[page].description.length}/160</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeoManager;
