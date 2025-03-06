import { Outlet } from "react-router-dom";
import Navbar from "../../composants/navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Accueil(){
    
    const { state } = useLocation(); //récupérer les valeurs qui ont été redirigées par l'api
    const [visiteur, setVisiteur] = useState(state); //on valorise avec les valeurs récupérées
    const { nom, prenom } = visiteur; //récup nom & prenom du visiteur (pour les afficher dans BVN !)
    
    
    useEffect(() => {
        console.log("récupération des States : ", state);
        setVisiteur(state)
    }, []);
    

    return (
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    Bienvenue, {nom} {prenom} !
                </h1>
                
            </div>
            <Outlet context={{visiteur, setVisiteur}} />
        </>
    );
}
