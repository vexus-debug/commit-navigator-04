// Stub — Supabase removed

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogMedia {
  id: string;
  post_id: string;
  url: string;
  type: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export async function getBlogPosts(_publishedOnly = true): Promise<BlogPost[]> { return []; }
export async function getBlogPostBySlug(_slug: string): Promise<BlogPost | null> { return null; }
export async function createBlogPost(_post: any): Promise<BlogPost | null> { return null; }
export async function updateBlogPost(_id: string, _updates: any): Promise<boolean> { return false; }
export async function deleteBlogPost(_id: string): Promise<boolean> { return false; }
export async function getBlogMedia(_postId: string): Promise<BlogMedia[]> { return []; }
export async function addBlogMedia(_postId: string, _url: string, _type?: string, _caption?: string): Promise<BlogMedia | null> { return null; }
export async function deleteBlogMedia(_id: string): Promise<boolean> { return false; }
