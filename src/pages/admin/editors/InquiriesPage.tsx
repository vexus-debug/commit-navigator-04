import { useState, useEffect } from "react";
import { getContactSubmissions, markSubmissionRead, deleteSubmission, logActivity } from "@/lib/admin-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Inbox, Mail, MailOpen, Trash2, Loader2, Eye, ExternalLink, ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InquiriesPage = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await getContactSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRead = async (sub: any) => {
    await markSubmissionRead(sub.id, !sub.is_read);
    setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, is_read: !s.is_read } : s));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await deleteSubmission(id);
    await logActivity("Deleted contact submission", { id });
    toast({ title: "Deleted" });
    load();
  };

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  const unreadCount = submissions.filter(s => !s.is_read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Inbox size={24} className="text-secondary" /> Contact Inquiries
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {submissions.length} total • {unreadCount} unread
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16">
          <Inbox size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map(sub => (
            <div
              key={sub.id}
              className={`rounded-2xl border transition-all ${sub.is_read ? "bg-card border-border" : "bg-secondary/5 border-secondary/20"}`}
            >
              <button
                className="w-full flex items-center gap-4 p-4 text-left"
                onClick={() => {
                  setExpanded(expanded === sub.id ? null : sub.id);
                  if (!sub.is_read) toggleRead(sub);
                }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sub.is_read ? "bg-muted" : "bg-secondary/10"}`}>
                  {sub.is_read ? <MailOpen size={18} className="text-muted-foreground" /> : <Mail size={18} className="text-secondary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium truncate ${sub.is_read ? "text-foreground" : "text-foreground font-bold"}`}>
                      {sub.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{timeAgo(sub.created_at)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{sub.email}</p>
                </div>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expanded === sub.id ? "rotate-180" : ""}`} />
              </button>

              {expanded === sub.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border mx-4 mt-0 space-y-3">
                  <div className="pt-3">
                    <p className="text-sm text-foreground whitespace-pre-wrap">{sub.message}</p>
                    {sub.phone && <p className="text-xs text-muted-foreground mt-2">📞 {sub.phone}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${sub.email}?subject=Re: Your inquiry`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink size={12} /> Reply via Email
                    </a>
                    <button
                      onClick={() => toggleRead(sub)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <Eye size={12} /> Mark as {sub.is_read ? "Unread" : "Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors ml-auto"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesPage;
