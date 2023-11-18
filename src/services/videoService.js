import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://eycgkgvawqcoakewlcpc.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2drZ3Zhd3Fjb2FrZXdsY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDUyNzksImV4cCI6MjAxNTY4MTI3OX0.WL3m-77IcYiS6RyszWroSnHf6vyA9Iv7LRppR143FMo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
        }
    }
}