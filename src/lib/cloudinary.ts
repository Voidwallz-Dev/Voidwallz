const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const cloudinary = {
  // Get full image URL from public_id
  url: (publicId: string, options?: {
    width?: number
    height?: number
    quality?: string
    format?: string
  }) => {
    const transforms = []
    if (options?.width) transforms.push(`w_${options.width}`)
    if (options?.height) transforms.push(`h_${options.height}`)
    if (options?.quality) transforms.push(`q_${options.quality}`)
    if (options?.format) transforms.push(`f_${options.format}`)
    transforms.push('c_fill')

    const transformStr = transforms.length ? transforms.join(',') + '/' : ''
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}${publicId}`
  },

  // Auto thumbnail — 800x450 webp, quality auto
  thumbnail: (publicId: string) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800,h_450,c_fill,q_auto,f_webp/${publicId}`,

  // Mobile thumbnail — 400x700 webp
  mobileThumbnail: (publicId: string) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_400,h_700,c_fill,q_auto,f_webp/${publicId}`,

  // Full quality download URL
  download: (publicId: string) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/fl_attachment/${publicId}`,

  // List images in a folder using Cloudinary API
  listFolder: async (folder: string) => {
    const res = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder}.json`
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.resources ?? []
  }
}