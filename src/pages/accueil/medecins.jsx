import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";
import api from "../../api/api";


function Medecins() {

    const { visiteur, setVisiteur } = useOutletContext();

    const navigate = useNavigate();

    const [nomMedecins, setNomMedecins] = useState(""); //état champ de saisie
    const [listeMedecins, setListeMedecins] = useState([]); //liste contenant ts les médecins trouvés
    const [medecin, setMedecin] = useState({}); //état qui contient les données du médecin sélectionné
    const [version, setVersion] = useState(0);



    //Fct° qui charge la liste médecins à chq touche clavier
    async function charger() {
        try {
            //appel API
            //RAPPEL : changer l'@ IP en fonction de là où je me connecte
            const response = await api.get(`http://192.168.162.196/restGSB/medecins?nom=${nomMedecins}`);
            const medecins = response.data.map(medecin => `${medecin.nom} ${medecin.prenom}`); //récup nom/prénom dans l'api et créer un tableau avec "map"
            setListeMedecins(medecins); //màj et c'est ce qui affiche la liste ENFIN!!!!

            //test dans la console log pr voir si tout est bien récup
            console.log("nom des médecins : ", medecins);

        } catch (error) {
            console.error("ptite erreur liste médecins", error);
        }
    };

    //Récupère la valeur du champ de saisie actuel
    const champSaisie = (event) => {
        setNomMedecins(event.target.value); 
    }

    useEffect(() => {
        if (nomMedecins.length > 0) {
            charger(); // charge la liste des médecins selon ce qu'on écrit
        }
        else {
            setListeMedecins([]); //si rien dans la searchbar, alors n'affiche rien
        }
    }, [nomMedecins] //dépendance = réexécuté à chq fois que nomMedecins change
    );
    

    //Fct° qui valorise le médecin sélectionné
    async function selectMedecin(leMedecin) {
        //récup ttes data du médecin en question
        //RAPPEL : changer l'@ IP en fonction de là où je me connecte
        const response2 = await api.get(`http://192.168.162.196/restGSB/medecins?nom=${leMedecin[0]}`);
        //[0] ==> récupère le 1er élément de la liste leMedecin
        const infosMedecin = response2.data[0];
        
        setMedecin(infosMedecin);
        setNomMedecins(leMedecin); // champ saisie = médecin choisi
        setListeMedecins([]); //cache la liste après avoir choisi son médecin
        console.log("Médecin sélectionné : ", infosMedecin);

        //charger composant & forcer re-render de React pour afficher bonne version page (URL)
        setVersion(version+1);
        navigate(''+infosMedecin.id);
    }

    async function rechercherRapports() {

    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Médecins Pages</h1>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Recherchez un médecin
                </label>
                <input type="text" placeholder="Nom de famille du médecin" value={nomMedecins}
                    onChange={champSaisie}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div>
                    {/*Affichage de la liste des médecins selon la recherche*/}
                    <ul>
                        {listeMedecins.map((medecin) => (
                            <li key={medecin}
                            className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-300 bg-gray-200 duration-300"
                            onClick={() => selectMedecin(medecin)}>
                                {medecin}
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>


            {/* Charge le composant-enfant FicheMedecin en lui partageant état medecin */}
            <Outlet context={[medecin, setMedecin]} key={version} />
        </div>
    );

}

export default Medecins;