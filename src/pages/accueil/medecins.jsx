import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";
import api from "../../api/api";

function Medecins() {
    const { visiteur, setVisiteur } = useOutletContext();

    const navigate = useNavigate();

    const [nomMedecins, setNomMedecins] = useState(""); // état champ de saisie
    const [listeMedecins, setListeMedecins] = useState([]); // liste contenant tous les médecins trouvés
    const [medecin, setMedecin] = useState({}); // état qui contient les données du médecin sélectionné
    const [version, setVersion] = useState(0);

    // Fonction qui charge la liste des médecins à chaque touche clavier
    async function charger() {
        try {
            // Appel à l'API
            const response = await api.get(`http://192.168.162.196/restGSB/medecins?nom=${nomMedecins}`);
            setListeMedecins(response.data); // mise à jour de la liste des médecins

            // Vérification de la réponse
            console.log("Liste des médecins :", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de la liste des médecins :", error);
        }
    }

    // Récupère la valeur du champ de saisie actuel
    const champSaisie = (event) => {
        setNomMedecins(event.target.value);
    };

    useEffect(() => {
        if (nomMedecins.length > 0) {
            charger(); // Charge la liste des médecins selon ce qu'on écrit
        } else {
            setListeMedecins([]); // Si rien dans la searchbar, alors n'affiche rien
        }
    }, [nomMedecins]); // Dépendance = réexécuté à chaque fois que nomMedecins change

    // Fonction qui valorise le médecin sélectionné
    async function selectMedecin(leMedecin) {
        if (!leMedecin || !leMedecin.nom || !leMedecin.prenom) {
            console.error("Médecin invalide :", leMedecin);
            return; // Sortie anticipée si le médecin n'est pas valide
        }

        try {
            // Récupérer toutes les données du médecin
            const response2 = await api.get(`http://192.168.162.196/restGSB/medecins?nom=${leMedecin.nom}`);
            const infosMedecin = response2.data[0];

            setMedecin(infosMedecin);
            setNomMedecins(`${leMedecin.nom} ${leMedecin.prenom}`); // Nom complet dans le champ de saisie
            setListeMedecins([]); // Cache la liste après avoir choisi son médecin
            console.log("Médecin sélectionné :", infosMedecin);

            // Charger composant & forcer re-render de React pour afficher la bonne version de la page (URL)
            setVersion(version + 1);
            navigate('' + infosMedecin.id);
        } catch (error) {
            console.error("Erreur lors de la sélection du médecin :", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Médecins Pages</h1>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Recherchez un médecin
                </label>
                <input
                    type="text"
                    placeholder="Nom de famille du médecin"
                    value={nomMedecins}
                    onChange={champSaisie}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                    {/* Affichage de la liste des médecins selon la recherche */}
                    <ul>
                        {listeMedecins.map((medecin) => (
                            <li
                                key={medecin.id}
                                className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-300 bg-gray-200 duration-300"
                                onClick={() => selectMedecin(medecin)}
                            >
                                {medecin.nom} {medecin.prenom}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Charge le composant-enfant FicheMedecin en lui partageant l'état medecin */}
            <Outlet context={[medecin, setMedecin]} key={version} />
        </div>
    );
}

export default Medecins;
