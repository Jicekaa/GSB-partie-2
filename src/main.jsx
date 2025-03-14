import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import des pages
import Index from './pages/index.jsx';
import Accueil from './pages/accueil/accueil.jsx';
import Medecins from './pages/accueil/medecins.jsx';
import Rapports from './pages/accueil/rapports.jsx';
import './index.css';
import FicheMedecin from './composants/fichemedecin.jsx';
import AjouterRapport from './composants/ajouterRapport.jsx';
import ModifierRapport from './composants/modifierRapport.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/Accueil',
    element: <Accueil />,

    // Routes enfants du composant Accueil
    children: [
      {
        path: 'Medecins',
        element: <Medecins />,

        // Enfants du composant Medecins
        children: [
          {
            path: ':id', // Dynamique
            element: <FicheMedecin />,
          },
        ],
      },
      {
        path: 'Rapports',
        element: <Rapports />,

        // Enfants du composant Rapports
        children: [
          {
            path: 'ajouterRapport', // Sous-route explicite
            element: <AjouterRapport />,
          },
          {
            path: 'modifierRapport', // Sous-route explicite
            element: <ModifierRapport />,
          },
        ],
      },
    ],
  },
]);

// Point d'entrée de l'application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
