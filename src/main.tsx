import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ThemeProvider } from './lib/ThemeProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
       <RouterProvider router={router}/>
  
    </ThemeProvider>
  </StrictMode>,
)
