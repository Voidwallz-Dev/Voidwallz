import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
}

const isLikelyJwt = supabaseAnonKey.split('.').length === 3

if (!isLikelyJwt) {
  throw new Error('Invalid Supabase anon key. Make sure VITE_SUPABASE_ANON_KEY is the anon/public API key from your Supabase project settings.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type Wallpaper = {
  id: string
  title: string
  description: string
  category: string
  device: 'pc' | 'mobile' | 'tablet' | 'all'
  resolution: string
  file_url: string
  thumbnail_url: string
  cloudinary_id?: string
  folder?: 'desktop' | 'phone'
  tags: string[]
  downloads: number
  featured: boolean
  created_at: string
}

export type Profile = {
  id: string
  email: string
  role: 'admin' | 'user'
  created_at: string
}