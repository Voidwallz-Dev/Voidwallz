import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase, Wallpaper } from '../lib/supabase'
import { cloudinary } from '../lib/cloudinary'

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'DARK',
    device: 'all',
    resolution: '1920×1080',
    tags: '',
    featured: false
  })
  const [wallpaperFile, setWallpaperFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth')
    }
    if (isAdmin) {
      fetchWallpapers()
    }
  }, [user, isAdmin, isLoading, navigate])

  const fetchWallpapers = async () => {
    const { data } = await supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setWallpapers(data)
  }

  const uploadToCloudinary = async (file: File, folder: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'voidwallz')
      formData.append('folder', `wallpapers ${folder}`)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error('Upload failed'))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`)
      xhr.send(formData)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallpaperFile) {
      setMessage({ text: 'Please select a wallpaper file', error: true })
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setMessage(null)

    try {
      const folder = formData.device === 'mobile' ? 'phone' : 'desktop'
      
      // Upload to Cloudinary
      const data: any = await uploadToCloudinary(wallpaperFile, folder)
      
      // Insert into database
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t)

      const { error } = await supabase.from('wallpapers').insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        device: formData.device,
        resolution: `${data.width}×${data.height}`,
        cloudinary_id: data.public_id,
        file_url: data.secure_url,
        thumbnail_url: cloudinary.thumbnail(data.public_id),
        folder: folder,
        tags: tagsArray,
        featured: formData.featured,
        uploaded_by: user?.id
      })

      if (error) throw error

      setMessage({ text: '✓ WALLPAPER UPLOADED', error: false })
      setFormData({
        title: '',
        description: '',
        category: 'DARK',
        device: 'all',
        resolution: '1920×1080',
        tags: '',
        featured: false
      })
      setWallpaperFile(null)
      setUploadProgress(0)
      fetchWallpapers()
    } catch (err: any) {
      setMessage({ text: err.message, error: true })
    } finally {
      setUploading(false)
    }
  }

  const syncCloudinary = async () => {
    setSyncing(true)
    try {
      const { data, error } = await supabase.functions.invoke('sync-cloudinary')

      if (error) throw error

      alert(`✓ Sync complete!\n${data.synced} new wallpapers added\n${data.skipped} already existed\n${data.total} total found`)
    } catch (err) {
      console.error('Sync error:', err)
      alert('Sync failed: ' + String(err))
    }
    setSyncing(false)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('wallpapers').delete().eq('id', id)
    fetchWallpapers()
  }

  if (isLoading) return <div className="min-h-screen bg-black pt-[80px]" />

  return (
    <div className="min-h-screen bg-black pt-[80px] pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2]">ADMIN DASHBOARD</h1>
              <p className="font-[Space_Mono] text-[11px] text-[#555] mt-2">{user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="border border-[#B03030] text-[#B03030] font-[Space_Mono] text-[9px] uppercase px-4 py-2"
            >
              SIGN OUT
            </button>
          </div>
          <hr className="border-[#222]" />
        </div>

        <form onSubmit={handleSubmit} className="border border-[#222] bg-[#111] p-8 mb-12">
          <h2 className="font-[Syne] font-bold text-[24px] text-[#F6EFD2] mb-8">UPLOAD WALLPAPER</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">CATEGORY</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
              >
                <option>DARK</option>
                <option>MINIMAL</option>
                <option>ABSTRACT</option>
                <option>NATURE</option>
                <option>SPACE</option>
                <option>NEON</option>
                <option>RETRO</option>
                <option>ARCHITECTURE</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">DEVICE</label>
              <select
                value={formData.device}
                onChange={e => setFormData({ ...formData, device: e.target.value })}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
              >
                <option value="all">ALL</option>
                <option value="pc">PC</option>
                <option value="mobile">MOBILE</option>
                <option value="tablet">TABLET</option>
              </select>
            </div>

            <div>
              <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">RESOLUTION</label>
              <select
                value={formData.resolution}
                onChange={e => setFormData({ ...formData, resolution: e.target.value })}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
              >
                <option>1920×1080</option>
                <option>2560×1440</option>
                <option>3840×2160</option>
                <option>7680×4320</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">TAGS (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
            />
          </div>

          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={e => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 border border-[#222] bg-[#0a0a0a] appearance-none cursor-pointer checked:bg-[#B03030]"
            />
            <label className="font-[Space_Mono] text-[9px] text-[#555] uppercase">FEATURED</label>
          </div>

           <div className="grid grid-cols-1 mb-6">
             <div>
               <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">WALLPAPER FILE</label>
               <label className="block border border-dashed border-[#333] bg-[#0a0a0a] p-8 text-center cursor-pointer hover:border-[#B03030] transition-colors">
                 <p className="font-[Space_Mono] text-[9px] text-[#555] uppercase">↓ DROP FILE OR CLICK TO UPLOAD</p>
                 <input
                   type="file"
                   accept=".jpg,.png,.webp"
                   onChange={e => setWallpaperFile(e.target.files?.[0] || null)}
                   className="hidden"
                 />
                 {wallpaperFile && <p className="font-[Space_Mono] text-[11px] text-[#F6EFD2] mt-2">{wallpaperFile.name}</p>}
               </label>
             </div>
           </div>

           {message && (
             <p className={`font-[Space_Mono] text-[11px] mb-4 ${message.error ? 'text-[#B03030]' : 'text-[#F6EFD2]'}`}>
               {message.text}
             </p>
           )}
           
           {uploading && uploadProgress > 0 && (
             <div className="mb-4 h-2 bg-[#222] w-full overflow-hidden">
               <div className="h-full bg-[#B03030] transition-all" style={{ width: `${uploadProgress}%` }} />
             </div>
           )}

           <button
             type="submit"
             disabled={uploading}
             className="w-full bg-[#B03030] text-[#F6EFD2] font-[Syne] font-bold uppercase py-4 disabled:opacity-50"
           >
             {uploading ? `UPLOADING ${uploadProgress}%` : 'UPLOAD WALLPAPER'}
           </button>
           
           <div className="mt-6 pt-6 border-t border-[#222]">
             <button
               type="button"
               onClick={syncCloudinary}
               disabled={syncing}
               className="border border-[#B03030] text-[#B03030] font-[Space_Mono] text-[9px] uppercase px-4 py-2 w-full disabled:opacity-50"
             >
               {syncing ? 'SYNCING...' : 'SYNC CLOUDINARY'}
             </button>
           </div>
        </form>

        <div className="border border-[#222] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">THUMBNAIL</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">TITLE</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">CATEGORY</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">DEVICE</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">RESOLUTION</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">DOWNLOADS</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">FEATURED</th>
                <th className="font-[Space_Mono] text-[9px] text-[#555] uppercase p-4 text-left">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {wallpapers.map(wp => (
                <tr key={wp.id} className="border-b border-[#222]">
                  <td className="p-4">
                    <img src={wp.cloudinary_id ? cloudinary.thumbnail(wp.cloudinary_id) : wp.thumbnail_url} alt={wp.title} className="w-10 h-10 object-cover" />
                  </td>
                  <td className="p-4 font-[Space_Mono] text-[12px] text-[#F6EFD2]">{wp.title}</td>
                  <td className="p-4 font-[Space_Mono] text-[11px] text-[#555]">{wp.category}</td>
                  <td className="p-4 font-[Space_Mono] text-[11px] text-[#555]">{wp.device}</td>
                  <td className="p-4 font-[Space_Mono] text-[11px] text-[#555]">{wp.resolution}</td>
                  <td className="p-4 font-[Space_Mono] text-[11px] text-[#555]">{wp.downloads}</td>
                  <td className="p-4 font-[Space_Mono] text-[11px]">{wp.featured ? '✓' : ''}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(wp.id)} className="font-[Space_Mono] text-[16px] text-[#B03030]">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin