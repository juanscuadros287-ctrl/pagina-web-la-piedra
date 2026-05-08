import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Producto = {
  id: string
  nombre: string
  categoria: 'Genesis' | 'Dual' | 'Elite'
  descripcion: string | null
  quilates: string | null
  color: string | null
  precio_mostrado: string | null
  disponible: boolean
  imagen_url: string | null
  created_at: string
  updated_at: string
}
