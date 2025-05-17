
import { createClient } from '@supabase/supabase-js'

// Replace this:
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// With this:
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase