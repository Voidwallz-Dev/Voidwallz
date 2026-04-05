import { useFavourites } from '../../hooks/useFavourites'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface FavouriteButtonProps {
  wallpaperId: string
  size?: 'sm' | 'md'
}

export default function FavouriteButton({ wallpaperId, size = 'md' }: FavouriteButtonProps) {
  const { user } = useAuth()
  const { isFavourite, toggleFavourite, loading } = useFavourites()
  const navigate = useNavigate()
  const fav = isFavourite(wallpaperId)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    toggleFavourite(wallpaperId)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        background: fav ? '#B03030' : 'transparent',
        border: `1px solid ${fav ? '#B03030' : '#333'}`,
        color: fav ? '#F6EFD2' : '#555',
        fontFamily: 'Space Mono, monospace',
        fontSize: size === 'sm' ? '9px' : '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: size === 'sm' ? '4px 8px' : '6px 12px',
        cursor: 'pointer',
        borderRadius: 0,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {fav ? '♥ SAVED' : '♡ SAVE'}
    </button>
  )
}