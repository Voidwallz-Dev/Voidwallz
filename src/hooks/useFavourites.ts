import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useFavourites() {
  const { user } = useAuth()
  const [favourites, setFavourites] = useState<string[]>([]) // wallpaper IDs
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    fetchFavourites()
  }, [user])

  async function fetchFavourites() {
    const { data } = await supabase
      .from('favourites')
      .select('wallpaper_id')
      .eq('user_id', user!.id)
    if (data) setFavourites(data.map(f => f.wallpaper_id))
  }

  async function toggleFavourite(wallpaperId: string) {
    if (!user) return
    setLoading(true)
    const isFav = favourites.includes(wallpaperId)
    if (isFav) {
      await supabase.from('favourites')
        .delete()
        .eq('user_id', user.id)
        .eq('wallpaper_id', wallpaperId)
      setFavourites(prev => prev.filter(id => id !== wallpaperId))
    } else {
      await supabase.from('favourites')
        .insert({ user_id: user.id, wallpaper_id: wallpaperId })
      setFavourites(prev => [...prev, wallpaperId])
    }
    setLoading(false)
  }

  const isFavourite = (wallpaperId: string) => favourites.includes(wallpaperId)

  return { favourites, toggleFavourite, isFavourite, loading }
}