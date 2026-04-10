// Stub — Supabase removed. All content comes from defaults in SiteContentContext.

export async function loadSiteContent(): Promise<Record<string, any> | null> {
  return null;
}

export async function saveSiteContentKey(_key: string, _value: any): Promise<boolean> {
  return true;
}

export async function saveSiteContentBatch(_entries: { key: string; value: any }[]): Promise<boolean> {
  return true;
}

export async function uploadImage(_file: File): Promise<string | null> {
  return null;
}

export async function trackPageVisit(_page: string) {}

export async function getPageVisitors() {
  return [];
}
