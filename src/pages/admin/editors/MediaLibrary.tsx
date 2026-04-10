import { useState, useEffect } from "react";
import { listMediaFiles, deleteMediaFile, getMediaPublicUrl } from "@/lib/admin-helpers";
import { uploadImage } from "@/lib/supabase-content";
import { logActivity } from "@/lib/admin-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderOpen, Upload, Trash2, Copy, ExternalLink, Loader2, Search, X, Check, Image,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MediaLibrary = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const loadFiles = async () => {
    setLoading(true);
    const data = await listMediaFiles();
    setFiles(data);
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      await logActivity("Uploaded media", { filename: file.name });
      toast({ title: "Uploaded", description: file.name });
      loadFiles();
    } else {
      toast({ title: "Upload failed", variant: "destructive" });
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(name);
    const ok = await deleteMediaFile(`uploads/${name}`);
    if (ok) {
      await logActivity("Deleted media", { filename: name });
      toast({ title: "Deleted", description: name });
      loadFiles();
    }
    setDeleting(null);
  };

  const copyUrl = (name: string) => {
    const url = getMediaPublicUrl(`uploads/${name}`);
    navigator.clipboard.writeText(url);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = search.trim()
    ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <FolderOpen size={24} className="text-secondary" /> Media Library
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{files.length} files in storage</p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl cursor-pointer hover:bg-primary/90 transition-colors">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Upload File"}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter files..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Image size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(file => {
            const url = getMediaPublicUrl(`uploads/${file.name}`);
            return (
              <div key={file.name} className="group relative rounded-2xl overflow-hidden border border-border bg-card">
                <div className="aspect-square bg-muted">
                  <img src={url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs text-foreground truncate font-medium">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(0)} KB` : ""}
                  </p>
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(file.name)} className="p-2 bg-card rounded-lg hover:bg-muted transition-colors" title="Copy URL">
                    {copied === file.name ? <Check size={16} className="text-secondary" /> : <Copy size={16} className="text-foreground" />}
                  </button>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 bg-card rounded-lg hover:bg-muted transition-colors" title="Open">
                    <ExternalLink size={16} className="text-foreground" />
                  </a>
                  <button onClick={() => handleDelete(file.name)} className="p-2 bg-card rounded-lg hover:bg-destructive/10 transition-colors" title="Delete" disabled={deleting === file.name}>
                    {deleting === file.name ? <Loader2 size={16} className="animate-spin text-destructive" /> : <Trash2 size={16} className="text-destructive" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
