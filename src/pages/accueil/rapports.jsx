import { useState, useEffect } from "react";
import api from "../../api/api";
import { useOutletContext } from "react-router-dom";

function Rapports() {

        



    return (
        <>
            <div className="w-full bg-white shadow-sm border-b mb-8 mt-8">
                <div className="container mx-auto px-4 py-4">
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <button
                                onClick={() => setAffichage('ajout')}
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${affichage === 'ajout'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-blue-100 text-blue-600'
                                    }`} >
                                Ajouter un rapport
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setAffichage('modifier')}
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${affichage === 'modifier'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-blue-100 text-blue-600'
                                    }`} >
                                Modifier un rapport
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/*Condition pour faire afficher les bons onglets */
                affichage === 'ajout' ?
                    <AjouterRapport />
                    :
                    <ModifierRapport />
            }


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
            {/*<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">*/}
            {/*Transforme les valeurs d'entrées (obj.entries) en tableau (.map) en parcourant
                chq clé et sa valeur pr les afficher*/}

            {/*visiteur ? Object.entries(visiteur).map(([key, value]) => (
                        <div key={key}> {key} : {value}</div>
                    ))
                    : <div>Pas de données du visiteur.</div>
                */}
            {/*</div>*/}
        </>
    )


}

export default Rapports;