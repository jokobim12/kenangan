export interface Memory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string;
  date: string;
  category?: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
