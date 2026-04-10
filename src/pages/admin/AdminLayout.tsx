import { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { getUnreadCount } from "@/lib/admin-helpers";
import {
  LayoutDashboard, Home, Info, Eye, BookOpen, Heart, Mail, Image, Settings,
  LogOut, Menu, X, ChevronDown, ChevronRight, Globe, Search, Sun, Moon,
  FolderOpen, FileText, Inbox, Activity, Megaphone, Slash,
} from "lucide-react";

interface NavItem {
  label: string;
  to?: string;
  icon: React.ElementType;
  badge?: number;
  children?: { label: string; to: string }[];
}

const AdminLayout = () => {
  const { logout, user } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUnreadCount().then(setUnreadCount);
  }, [location.pathname]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const navItems: NavItem[] = useMemo(() => [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    {
      label: "Home Page", icon: Home,
      children: [
        { label: "Hero Slider", to: "/admin/home/hero" },
        { label: "Stats", to: "/admin/home/stats" },
        { label: "About Section", to: "/admin/home/about" },
        { label: "Mission Spotlight", to: "/admin/home/mission-spotlight" },
        { label: "Spotlight Feature", to: "/admin/home/spotlight-feature" },
        { label: "Services", to: "/admin/home/services" },
        { label: "Journey Steps", to: "/admin/home/journey" },
        { label: "Testimonials", to: "/admin/home/testimonials" },
        { label: "Programs", to: "/admin/home/programs" },
        { label: "Impact Stats", to: "/admin/home/impact" },
        { label: "Why Choose Us", to: "/admin/home/why" },
        { label: "Partners", to: "/admin/home/partners" },
        { label: "Visit Cards", to: "/admin/home/visit" },
        { label: "Final CTA", to: "/admin/home/cta" },
        { label: "Images", to: "/admin/home/gallery" },
      ],
    },
    {
      label: "About Page", icon: Info,
      children: [
        { label: "Hero", to: "/admin/about/hero" },
        { label: "Origin Story", to: "/admin/about/origin" },
        { label: "Milestones", to: "/admin/about/milestones" },
        { label: "Director Bio", to: "/admin/about/director" },
        { label: "Values", to: "/admin/about/values" },
        { label: "Board Section", to: "/admin/about/board" },
        { label: "Images", to: "/admin/about/images" },
      ],
    },
    {
      label: "Eye Clinic Page", icon: Eye,
      children: [
        { label: "Hero", to: "/admin/clinic/hero" },
        { label: "Mission Quote", to: "/admin/clinic/mission" },
        { label: "About Clinic", to: "/admin/clinic/about" },
        { label: "Services", to: "/admin/clinic/services" },
        { label: "Surgical Stats", to: "/admin/clinic/surgical" },
        { label: "Clinic Hours", to: "/admin/clinic/hours" },
        { label: "CTA", to: "/admin/clinic/cta" },
        { label: "Images", to: "/admin/clinic/images" },
      ],
    },
    {
      label: "Blog Page", icon: BookOpen,
      children: [
        { label: "Manage Posts", to: "/admin/blog/manage" },
        { label: "Hero Section", to: "/admin/blog/hero" },
      ],
    },
    {
      label: "Donate Page", icon: Heart,
      children: [
        { label: "Hero", to: "/admin/donate/hero" },
        { label: "Why Support", to: "/admin/donate/why" },
        { label: "Ways to Help", to: "/admin/donate/ways" },
        { label: "Donate CTA", to: "/admin/donate/cta" },
        { label: "Image", to: "/admin/donate/image" },
      ],
    },
    {
      label: "Contact Page", icon: Mail,
      children: [
        { label: "Hero", to: "/admin/contact/hero" },
        { label: "Contact Info", to: "/admin/contact/info" },
      ],
    },
    {
      label: "Gallery Page", icon: Image,
      children: [
        { label: "Manage Images", to: "/admin/gallery/manage" },
        { label: "Hero Section", to: "/admin/gallery/hero" },
      ],
    },
    { label: "Media Library", to: "/admin/media", icon: FolderOpen },
    { label: "Inquiries", to: "/admin/inquiries", icon: Inbox, badge: unreadCount },
    { label: "SEO Manager", to: "/admin/seo", icon: FileText },
    { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
    { label: "Activity Log", to: "/admin/activity", icon: Activity },
    {
      label: "Global Settings", icon: Settings,
      children: [
        { label: "WhatsApp", to: "/admin/settings/whatsapp" },
        { label: "Social Links", to: "/admin/settings/socials" },
        { label: "Navbar", to: "/admin/settings/navbar" },
        { label: "Footer", to: "/admin/settings/footer" },
      ],
    },
  ], [unreadCount]);

  const allLinks = useMemo(() => {
    const links: { label: string; to: string; parent?: string }[] = [];
    navItems.forEach(item => {
      if (item.to) links.push({ label: item.label, to: item.to });
      item.children?.forEach(c => links.push({ label: c.label, to: c.to, parent: item.label }));
    });
    return links;
  }, [navItems]);

  const filteredSearch = searchQuery.trim()
    ? allLinks.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase()) || l.parent?.toLowerCase().includes(searchQuery.toLowerCase()))
    : allLinks;

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const isChildActive = (item: NavItem) => item.children?.some(c => location.pathname === c.to);

  const breadcrumbs = useMemo(() => {
    const parts: { label: string; to?: string }[] = [{ label: "Admin", to: "/admin" }];
    for (const item of navItems) {
      if (item.to && item.to === location.pathname && item.label !== "Dashboard") {
        parts.push({ label: item.label });
        break;
      }
      if (item.children) {
        const child = item.children.find(c => c.to === location.pathname);
        if (child) {
          parts.push({ label: item.label });
          parts.push({ label: child.label });
          break;
        }
      }
    }
    return parts;
  }, [location.pathname, navItems]);

  const currentPageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Search palette overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-10">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={18} className="text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search pages..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                onKeyDown={e => {
                  if (e.key === "Enter" && filteredSearch.length > 0) {
                    navigate(filteredSearch[0].to);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-1">
              {filteredSearch.map(link => (
                <button
                  key={link.to}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => { navigate(link.to); setSearchOpen(false); setSearchQuery(""); }}
                >
                  <span className="truncate">{link.label}</span>
                  {link.parent && <span className="text-xs text-muted-foreground ml-auto">{link.parent}</span>}
                </button>
              ))}
              {filteredSearch.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">No results found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Eye size={16} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">TLEC Admin</p>
              <p className="text-[10px] text-muted-foreground">Content Manager</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Sidebar search */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-muted-foreground text-xs hover:bg-muted/80 transition-colors"
          >
            <Search size={14} />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="text-[9px] bg-background/60 px-1 py-0.5 rounded">⌘K</kbd>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(item =>
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`
                }
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="ml-auto text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ) : (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isChildActive(item) ? "bg-secondary/10 text-secondary" : "text-foreground hover:bg-muted"}`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                  {expandedMenus.includes(item.label) || isChildActive(item) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {(expandedMenus.includes(item.label) || isChildActive(item)) && (
                  <div className="ml-5 mt-0.5 space-y-0.5 border-l-2 border-border pl-3">
                    {item.children?.map(child => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-border space-y-2">
          {user && (
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                {user.email?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          )}
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 h-14 bg-card/95 backdrop-blur border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu size={22} />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <Slash size={12} className="text-border" />}
                {b.to && i < breadcrumbs.length - 1 ? (
                  <NavLink to={b.to} className="hover:text-foreground transition-colors">{b.label}</NavLink>
                ) : (
                  <span className="text-foreground font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h2 className="sm:hidden text-sm font-semibold text-foreground truncate">{currentPageTitle}</h2>

          <div className="ml-auto flex items-center gap-2">
            {/* Search trigger */}
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Search size={16} />
            </button>

            {/* Dark mode */}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* View site */}
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-secondary px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
              <Globe size={14} /> View Site
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
