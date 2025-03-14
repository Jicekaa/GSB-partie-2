import { useState, useEffect } from "react";
import api from "../api/api";
import { useOutlet, useOutletContext } from "react-router-dom";


function AjouterRapport({ visiteur }) {

    // const [visiteur, setVisiteur] = useOutletContext();
    const [nomRecherche, setNomRecherche] = useState("");
    const [listeMedecins, setListeMedecins] = useState([]);
    const [medecinSelectionne, setMedecinSelectionne] = useState(null);
    const [addRapportSuccess, setAddRapportSuccess] = useState(null);
    //État pour stocker les infos saisies dans form
    const [formData, setFormData] = useState({date: "", motif: "", bilan: ""});


    //ÉTAPE 1 : se connecte à l'API pour liste médecins

    //hook exe à chq fois que nomRecherche change
    useEffect(() => {
        async function charger() {
            if (nomRecherche.length > 0) {
                try {
                    //Appel l'API pour obtenir liste médecins
                    const response = await api.get(`http://192.168.162.196/restGSB/medecins?nom=${nomRecherche}`);
                    setListeMedecins(response.data); // màj liste médecins trouvés
                    console.log("Liste des médecins trouvés : ", response.data); //vérif° réponse
                } catch (error) {
                    console.error("Erreur lors du chargement des médecins :", error);
                    setListeMedecins([]);
                }
            } else {
                setListeMedecins([]); //vide liste
            }
        }
        charger();
    }, [nomRecherche]); //fct° est déclenchée à chaque fois que `nomRecherche` change



    //ÉTAPE 2 : Formulaire ajout de rapport

    //Fonction gérer la saisie des champs dans le formulaire (date, motif, bilan)
    function handleChange(e){
        const majFormData = {...formData};
        majFormData[e.target.name] = e.target.value;
        setFormData(majFormData);
    }

    //Fonction déclenchée lors de la soumission du formulaire pour ajouter un rapport
    async function ajouteRapport(e) {
        e.preventDefault(); //bloque le re-render
        const params = {
            ...formData, //Données saisies dans le formulaire
            idMedecin: medecinSelectionne.id, //add id médecin sélectionné
        };
        console.log("Données qui sont envoyées ? : ", params) //test pr voir ???
        try {
            // Appel à l'API pour envoyer les données via la méthode PUT
            const ajoutbdd = await api.put(`http://192.168.162.196/restGSB/ajouterRapport`, params);
            console.log("Insertion réussie du rapport :", ajoutbdd);
            setAddRapportSuccess(true); //màj en cas de succès
            setFormData({date: "", motif: "", bilan: ""});
        } catch (error) {
            console.error("Erreur lors de l'ajout du rapport :", error);
            setAddRapportSuccess(false); //màj de l'état en cas d'erreur
        }
    }



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-2xl font-bold mb-6">Ajouter un rapport</h2>

            {/*#1 : Recherche du médecin*/}
            {!medecinSelectionne && (
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    {/*Barre de recherche*/}
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rechercher un médecin :</label>
                    <input
                        type="text"
                        value={nomRecherche} //valeur actuelle du champ
                        onChange={(e) => setNomRecherche(e.target.value)} //Màj l'état `nomRecherche`
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom du médecin"
                    />
                    {/*Liste des résultats*/}
                    <ul>
                        {listeMedecins.map((medecin) => (
                            <li
                                key={medecin.id}
                                onClick={() => {
                                    setMedecinSelectionne(medecin) //Sélectionne un médecin lorsqu'on clique dessus
                                    console.log("Médecin select : ", medecin)//test affiche ses infos
                                }}
                                
                                className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-300 bg-gray-200">
                                {medecin.nom} {medecin.prenom}
                            </li>
                        ))
                        }
                    </ul>
                </div>
            )}

            {/*#2 : Ajout du rapport pour le médecin sélectionné*/}
            {medecinSelectionne && (
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-6">
                    <p className="mb-4">
                        Médecin sélectionné : <strong>{medecinSelectionne.nom} {medecinSelectionne.prenom}</strong>
                    </p>
                    <form onSubmit={ajouteRapport}>
                        {/*Champ pour la date*/}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date de visite :
                        </label>
                        <input
                            type="datetime-local"
                            name="date" //Nom du champ (clé de l'objet `formData`)
                            value={formData.date} //Valeur actuelle
                            onChange={handleChange} //Màj l'état `formData`
                            required
                            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        {/*Champ pour le motif*/}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Motif :
                        </label>
                        <input
                            type="text"
                            name="motif"
                            value={formData.motif}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        {/*Champ pour le bilan*/}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bilan :
                        </label>
                        <textarea
                            name="bilan"
                            value={formData.bilan}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                            Ajouter le rapport
                        </button>
                    </form>
                    {/*Messages de succès ou d'erreur*/}
                    {addRapportSuccess && <p className="text-green-600 mt-4">Rapport bien ajouté</p>}
                    {addRapportSuccess === false && <p className="text-red-600 mt-4">Erreur lors de l'ajout du rapport.</p>}
                </div>
            )}
        </div>
    );
}

export default AjouterRapport;