import { useState, useEffect } from "react";
import { getActivityLog } from "@/lib/admin-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Clock } from "lucide-react";

const ActivityLogPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivityLog(100).then(data => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity size={24} className="text-secondary" /> Activity Log
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track admin actions and changes</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 rounded-2xl" />)}
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16">
          <Activity size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No activity logged yet</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className="relative flex gap-4 pl-10">
                <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full bg-secondary border-2 border-card" />
                <div className="flex-1 rounded-2xl bg-card border border-border p-4">
                  <p className="text-sm font-medium text-foreground">{log.action}</p>
                  {log.details && Object.keys(log.details).length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {JSON.stringify(log.details).slice(0, 120)}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <Clock size={10} />
                    <span>{formatDate(log.created_at)}</span>
                    <span>•</span>
                    <span>{log.user_email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogPage;
