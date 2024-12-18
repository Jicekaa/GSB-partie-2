import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//note pour moi : tjr importer les différentes pages ici
import Index from './pages/index.jsx'
import Accueil from './pages/accueil/accueil.jsx'
import Medecins from './pages/accueil/medecins.jsx'
import Rapports from './pages/accueil/rapports.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },

  {
    path: '/Accueil',
    element: <Accueil />,

    // enfant du composant accueil qui va en hériter 
    children: [
      {
        path : 'Medecins',
        element: <Medecins />
      },
    
      {
        path : 'Rapports',
        element: <Rapports />
      },
    ]

  },

  

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)