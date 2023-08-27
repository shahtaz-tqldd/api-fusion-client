import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  "https://qqnaqibscvxnsqoaovuo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxbmFxaWJzY3Z4bnNxb2FvdnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzMjU2NjMsImV4cCI6MjAwNjkwMTY2M30.GDWhCOv4WbVhfKEH9vkdiJa4kENwN78DmozMyLSkCUA"
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
)
