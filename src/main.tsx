import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { ThemeProvider } from './lib/ThemeProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.tsx'
import store from './redux/store.ts';
import { initAuth } from './redux/features/Auth/authSlice.ts';
  store.dispatch(initAuth());
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>

     
       <RouterProvider router={router}/>
   </Provider>
    </ThemeProvider>
  </StrictMode>,
)
