const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ease-travel.online/api/v1";
const BACKEND_URL = API_URL.replace(/\/api\/v1$/, "");

export function getImageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BACKEND_URL}/storage/${path}`;
}

export interface ApiTrip {
  id: number;
  category_id: number;
  title_ar: string;
  title_en: string;
  slug_ar: string;
  slug_en: string;
  description_ar: string | null;
  description_en: string | null;
  destination_ar: string;
  destination_en: string;
  duration_days: number;
  base_price: string;
  discounted_price: string | null;
  currency: string;
  featured_image: string | null;
  featured_image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  coming_soon: boolean;
  itinerary_ar: string | null;
  itinerary_en: string | null;
  inclusions_ar: string | null;
  inclusions_en: string | null;
  start_date: string | null;
  end_date: string | null;
  max_participants: number | null;
  category: {
    id: number;
    name_ar: string;
    name_en: string;
    type: "inbound" | "outbound" | "religious";
  };
}

export interface ApiCategory {
  id: number;
  name_ar: string;
  name_en: string;
  slug_ar: string;
  slug_en: string;
  type: "inbound" | "outbound" | "religious";
  description_ar: string | null;
  description_en: string | null;
  trips_count: number;
}

interface PaginatedResponse<T> {
  status: string;
  data: {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

interface ListResponse<T> {
  status: string;
  data: T[];
}

export async function getTrips(params?: Record<string, string>): Promise<ApiTrip[]> {
  const url = new URL(`${API_URL}/trips`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json: PaginatedResponse<ApiTrip> = await res.json();
  return json.data.data;
}

export async function getTrip(slug: string): Promise<ApiTrip | null> {
  const res = await fetch(`${API_URL}/trips/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json: { status: string; data: ApiTrip } = await res.json();
  return json.data;
}

export async function createBooking(data: {
  trip_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  num_passengers: number;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    return { success: false, error: err?.message || "Booking failed" };
  }
  return { success: true };
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    return { success: false, error: err?.message || "Failed to send message" };
  }
  return { success: true };
}

export async function getCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json: ListResponse<ApiCategory> = await res.json();
  return json.data;
}

export interface ApiBlog {
  id: number;
  category_id: number;
  title_ar: string;
  title_en: string;
  slug_ar: string;
  slug_en: string;
  excerpt_ar: string | null;
  excerpt_en: string | null;
  body_ar: string;
  body_en: string;
  featured_image: string | null;
  featured_image_url: string | null;
  direction: "rtl" | "ltr";
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  category: {
    id: number;
    name_ar: string;
    name_en: string;
    type: "inbound" | "outbound" | "religious";
  };
}

export async function getBlogs(params?: Record<string, string>): Promise<ApiBlog[]> {
  const url = new URL(`${API_URL}/blogs`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json: ListResponse<ApiBlog> = await res.json();
  return json.data;
}

export async function getBlog(slug: string): Promise<ApiBlog | null> {
  const res = await fetch(`${API_URL}/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json: { status: string; data: ApiBlog } = await res.json();
  return json.data;
}
