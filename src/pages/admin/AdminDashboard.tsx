import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPageVisitors } from "@/lib/supabase-content";
import { getActivityLog, getUnreadCount } from "@/lib/admin-helpers";
import {
  Users, Eye, Globe, Clock, Monitor, Smartphone, Tablet, MapPin,
  ArrowUpRight, TrendingUp, Loader2, Plus, Upload, Image, Edit3,
  Activity, Inbox, ChevronRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getPageVisitors(),
      getActivityLog(10),
      getUnreadCount(),
    ]).then(([v, a, u]) => {
      setVisitors(v);
      setActivityLog(a);
      setUnreadCount(u);
      setLoading(false);
    });
  }, []);

  const pageViews: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};

  visitors.forEach(v => {
    pageViews[v.page] = (pageViews[v.page] || 0) + 1;
    referrerCounts[v.referrer] = (referrerCounts[v.referrer] || 0) + 1;
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
  });

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const DeviceIcon = ({ device }: { device: string }) => {
    if (device === "Mobile") return <Smartphone size={14} />;
    if (device === "Tablet") return <Tablet size={14} />;
    return <Monitor size={14} />;
  };

  const pageLabels: Record<string, string> = {
    "/": "Home", "/about": "About", "/eye-clinic": "Eye Clinic",
    "/blog": "Blog", "/donate": "Donate", "/contact": "Contact", "/gallery": "Gallery",
  };

  const quickActions = [
    { label: "New Blog Post", icon: Plus, to: "/admin/blog/manage", color: "bg-primary" },
    { label: "Upload Media", icon: Upload, to: "/admin/media", color: "bg-secondary" },
    { label: "Edit Hero", icon: Edit3, to: "/admin/home/hero", color: "bg-accent" },
    { label: "Gallery", icon: Image, to: "/admin/gallery/manage", color: "bg-primary" },
  ];

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back — here's what's happening</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(action => (
          <button
            key={action.label}
            onClick={() => navigate(action.to)}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all group text-left"
          >
            <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shrink-0`}>
              <action.icon size={18} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Visitors", value: visitors.length, icon: Users, color: "bg-primary" },
          { label: "Pages Viewed", value: Object.keys(pageViews).length, icon: Eye, color: "bg-secondary" },
          { label: "Referrers", value: Object.keys(referrerCounts).length, icon: Globe, color: "bg-accent" },
          { label: "Unread Inquiries", value: unreadCount, icon: Inbox, color: "bg-destructive" },
        ].map((s, i) => (
          <div key={i} className="p-4 rounded-2xl bg-card border border-border">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent visitors */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Clock size={16} className="text-secondary" />
            <h3 className="font-heading text-sm font-bold text-foreground">Recent Visitors</h3>
          </div>
          <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
            {visitors.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No visitors yet.</div>
            ) : (
              visitors.slice(0, 15).map(v => (
                <div key={v.id} className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <DeviceIcon device={v.device} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{pageLabels[v.page] || v.page}</span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(v.created_at)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUpRight size={10} /> {v.referrer} • {v.device}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top pages */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <TrendingUp size={16} className="text-secondary" />
              <h3 className="font-heading text-sm font-bold text-foreground">Top Pages</h3>
            </div>
            <div className="p-4 space-y-3">
              {Object.entries(pageViews).sort(([, a], [, b]) => b - a).map(([page, count]) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{pageLabels[page] || page}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${(count / visitors.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-secondary" />
                <h3 className="font-heading text-sm font-bold text-foreground">Recent Activity</h3>
              </div>
              <button onClick={() => navigate("/admin/activity")} className="text-xs text-secondary hover:underline flex items-center gap-0.5">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-border max-h-[250px] overflow-y-auto">
              {activityLog.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">No activity logged yet.</div>
              ) : (
                activityLog.map(a => (
                  <div key={a.id} className="px-4 py-3">
                    <p className="text-sm text-foreground">{a.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.user_email} • {timeAgo(a.created_at)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Devices */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Monitor size={16} className="text-secondary" />
              <h3 className="font-heading text-sm font-bold text-foreground">Devices</h3>
            </div>
            <div className="p-4 flex gap-3">
              {Object.entries(deviceCounts).map(([device, count]) => (
                <div key={device} className="flex-1 text-center p-3 rounded-xl bg-muted">
                  <div className="flex justify-center mb-1"><DeviceIcon device={device} /></div>
                  <p className="text-lg font-bold text-foreground">{count}</p>
                  <p className="text-[10px] text-muted-foreground">{device}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
