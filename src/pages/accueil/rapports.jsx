import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

function Rapports(){

    const {visiteur, setVisiteur} = useOutletContext();
    console.log();
    return(
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100">
                <h1>AU RAPPORT</h1>
            </div>
            
            
            {/* test #1 */}
            {/*}
            <div>id : {visiteur.id}</div>
            <div>prenom : {visiteur.prenom}</div>
            <div>nom : {visiteur.nom}</div>
            <div>adresse : {visiteur.adresse}</div>
            <div>cp : {visiteur.cp}</div>
            <div>ville : {visiteur.ville}</div>
            */}


            {/* test #2 */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/*Transforme les valeurs d'entrées (obj.entries) en tableau (.map) en parcourant
                chq clé et sa valeur pr les afficher*/}
                {visiteur ? Object.entries(visiteur).map(([key, value]) => (
                        <div key={key}> {key} : {value}</div>
                    ))
                    : <div>Pas de données du visiteur.</div>
                }
            </div>
            
        </>
    )
}

export default Rapports;