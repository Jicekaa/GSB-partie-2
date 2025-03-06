import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function FicheMedecin() {
    const [medecin, setMedecin] = useOutletContext(); // Récupère state Medecin
    const [affichage, setAffichage] = useState('fiche'); // Affichage par défaut, fiche par défaut
    
/*Composant imbriquée Fiche, qui va prendre comme param le hook Medecin*/
function Fiche({leMedecin}) {

    const [medecin, setMedecin] = leMedecin;
    //check si màj réussi ou non
    const [updateMedecinSucess, setUpdateMedecinSuccess] = useState();
    
    function updatemedecin(e) {
        
    }
    
    return(
        <h1>Fiche du Médecin</h1>
    )
}


/*Composant imbriquée Rapports Medecin, qui prend en props idMedecin et récup rapport dans API*/
function Rapports({idMedecin}) {
    return(
        <h1>Les Rapports du Médecin</h1>
    )
}
    
    return (
        <>
            <div className="w-full bg-white shadow-sm border-b mb-8 mt-8">
                <div className="container mx-auto px-4 py-4">
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <button
                                onClick={() => setAffichage('fiche')}
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${
                                affichage === 'fiche'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 hover:bg-blue-100 text-blue-600'
                                }`} >
                                    Fiche Médecin
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setAffichage('rapports')}
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${
                                affichage === 'rapports'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 hover:bg-blue-100 text-blue-600'
                                }`} >
                                    Rapports Médecin
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {
                affichage == 'fiche' ?
                <Fiche leMedecin={[medecin, setMedecin]} />
                :
                <Rapports idMedecin={medecin.id} />
            }

        </>
    )
 
    
    {/*
    return (
        <div>Hello World, {`${medecin.nom} ${medecin.prenom}`}</div>
    );
    */}
}




export default FicheMedecin;
