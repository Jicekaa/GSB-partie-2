import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/api";
function Medecins(){

    const {visiteur, setVisiteur} = useOutletContext();

    const navigate = useNavigate();
    
    const [nomMedecins, setNomMedecins] = useState(""); //état champ de saisie
    const [listeMedecins, setListeMedecins] = useState([]) //liste contenant ts les médecins trouvés

    const [listeVisible, setListeVisible] = useState(false); //état de visibilité de la liste
    const [medecin, setMedecin] = useState({}); //état qui contient les données du médecin sélectionné
    


    //fct° qui charge la liste médecins à chq touche clavier
    async function charger(){
        try {
            //appel API
            //semble y avoir une erreur url
            const response = await api.get(`http://192.168.136.196/restGSB/medecins?nom=${nomMedecins}`);
            const medecins = response.data.map(medecin => medecin.nom); //récup la réponse de l'api et créer un tableau avec "map"
            //test dans la console log pr voir si tout est bien récup
            console.log("nom médecins : ", medecins);
        } catch (error) {
            console.error("ptite erreur liste médecins", error);
        }
    };

    const handleInputChange = (event) =>
        setNomMedecins(event.target.value); //récupère la valeur du champ de saisie actuel
        charger(); // charge la liste

    
    // fct° qd le médecin sera sélectionné dans la liste
    function selectMedecin(leMedecin){
        
    }

    async function rechercherRapports(){

    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Médecins Pages</h1>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Recherchez un médecin
                </label>
                <input type="text" placeholder="Nom de famille du médecin" value={nomMedecins} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                
                <div className="resultat mt-4">
                    {/* Ajouter ici rendu */}
                    <ul>
                        {/* 
                        {nomMedecins && response
                            .filter((medecin) => medecin.includes(nomMedecins))
                            .map ((nomMedecins, index) => <li key={index}>{medecin}</li>)}
                        */}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
    
}

export default Medecins;