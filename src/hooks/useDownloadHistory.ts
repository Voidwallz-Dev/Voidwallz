import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useDownloadHistory() {
  const { user } = useAuth()

  async function recordDownload(wallpaperId: string) {
    if (!user) return
    await supabase.from('download_history').insert({
      user_id: user.id,
      wallpaper_id: wallpaperId,
    })
    // Also increment global download counter
    await supabase.rpc('increment_downloads', { wallpaper_id: wallpaperId })
  }

  async function getHistory() {
    if (!user) return []
    const { data } = await supabase
      .from('download_history')
      .select(`
        downloaded_at,
        wallpapers (
          id, title, thumbnail_url, resolution, category
        )
      `)
      .eq('user_id', user.id)
      .order('downloaded_at', { ascending: false })
      .limit(50)
    return data ?? []
  }

  return { recordDownload, getHistory }
}