// Stub — Supabase removed

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  span: string | null;
  sort_order: number;
  created_at: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> { return []; }
export async function addGalleryImage(_img: any): Promise<GalleryImage | null> { return null; }
export async function updateGalleryImage(_id: string, _updates: any): Promise<boolean> { return false; }
export async function deleteGalleryImage(_id: string): Promise<boolean> { return false; }
