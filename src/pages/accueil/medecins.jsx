import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
function Medecins(){

    //const {visiteur, setVisiteur} = useOutletContext();

    const navigate = useNavigate();
    const [listeVisible, setListeVisible] = useState(false); //état de visibilité de la liste
    const [nomMedecins, setNomMedecins] = useState(''); //état champ de saisie
    const [listeMedecins, setListeMedecins] = useState([]) //liste contenant ts les médecins trouvés
    const [medecin, setMedecin] = useState({}); //état qui contient les données du médecin sélectionné
    


    //fct° qui charge la liste médecins à chq touche clavier
    async function charger(){
        try {
            //appel API
            const response = await api.get('http://192.168.136.196/restGSB/medecins');
            const nomMedecins = response.data.map(medecins => medecin.nom);
            //test dans la console log
            console.log('nom médecins : ', nomMedecins);
        } catch (error) {
            console.error("ptite erreur liste médecins", error);
        }
    };

    const handleInputChange = (event) =>
        setNomMedecins(event.target.value); //récupère la valeur du champ de saisie actuel
        charger(); // charge la liste

    

    function selectMedecin(leMedecin){

    }

    async function rechercherRapports(){

    }

    return (
        <>
            <h1>Médecins pages !</h1>

            <br></br>
            <label>Recherchez un médecin</label><br></br>
            <input type="text" placeholder="nom du médecin" value={nomMedecins} onChange={handleInputChange}></input>
            <button type="submit" className="bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded">Rechercher</button>
            <div className="resultat">
                
            </div>

 
        </>
    )
}

export default Medecins;