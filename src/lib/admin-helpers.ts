// Stub — Supabase removed

export async function logActivity(_action: string, _details?: Record<string, any>) {}

export async function getContactSubmissions() { return []; }

export async function markSubmissionRead(_id: string, _isRead: boolean) {}

export async function deleteSubmission(_id: string) {}

export async function submitContactForm(_data: { name: string; email: string; phone?: string; message: string }) {
  console.warn("submitContactForm: no backend connected");
  return false;
}

export async function getActivityLog(_limit = 50) { return []; }

export async function listMediaFiles(_prefix = "uploads/") { return []; }

export async function deleteMediaFile(_path: string) { return false; }

export function getMediaPublicUrl(path: string) { return path; }

export async function getUnreadCount() { return 0; }
