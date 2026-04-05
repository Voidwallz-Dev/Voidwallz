import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const CLOUD = Deno.env.get('CLOUDINARY_CLOUD_NAME')!
    const API_KEY = Deno.env.get('CLOUDINARY_API_KEY')!
    const API_SECRET = Deno.env.get('CLOUDINARY_API_SECRET')!
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_KEY = Deno.env.get('SERVICE_ROLE_KEY')!

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const auth = btoa(`${API_KEY}:${API_SECRET}`)

    // Use Search API with asset_folder for Dynamic folders mode
    const searchFolder = async (folder: string, deviceType: string) => {
      console.log(`Searching folder: ${folder}`)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expression: `asset_folder="${folder}"`,
            max_results: 500,
            with_field: ['tags', 'context'],
          }),
        }
      )
      console.log(`Search status for ${folder}:`, res.status)
      const data = await res.json()
      console.log(`Found in ${folder}:`, data.total_count ?? 0)
      if (data.error) console.error('Search error:', data.error)
      return (data.resources ?? []).map((r: any) => ({ ...r, deviceType }))
    }

    const desktop = await searchFolder('wallpapers desktop', 'pc')
    const phone = await searchFolder('wallpapers phone', 'mobile')
    const all = [...desktop, ...phone]

    console.log('Total found:', all.length)

    if (all.length === 0) {
      return new Response(
        JSON.stringify({ success: true, synced: 0, skipped: 0, total: 0, message: 'No images found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let synced = 0
    let skipped = 0

    for (const wp of all) {
      const { data: existing } = await supabase
        .from('wallpapers')
        .select('id')
        .eq('cloudinary_id', wp.public_id)
        .single()

      if (existing) { skipped++; continue }

      const name = wp.public_id
        .replace(/[_-]/g, ' ')
        .replace(/[a-z0-9]{6}$/, '')
        .trim()
        .toUpperCase() || wp.display_name?.toUpperCase() || 'UNTITLED'

      const thumbnail = wp.deviceType === 'mobile'
        ? `https://res.cloudinary.com/${CLOUD}/image/upload/w_400,h_711,c_fill,q_auto,f_webp/${wp.public_id}`
        : `https://res.cloudinary.com/${CLOUD}/image/upload/w_800,h_450,c_fill,q_auto,f_webp/${wp.public_id}`

      const { error: insertError } = await supabase.from('wallpapers').insert({
        title: name,
        description: '',
        category: 'DARK',
        device: wp.deviceType,
        resolution: `${wp.width ?? 1920}×${wp.height ?? 1080}`,
        cloudinary_id: wp.public_id,
        file_url: `https://res.cloudinary.com/${CLOUD}/image/upload/${wp.public_id}`,
        thumbnail_url: thumbnail,
        tags: wp.tags ?? [],
        downloads: 0,
        featured: false,
      })

      if (insertError) console.error('Insert error:', insertError)
      else synced++
    }

    return new Response(
      JSON.stringify({ success: true, synced, skipped, total: all.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('Function error:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})