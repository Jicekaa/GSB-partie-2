import { useEffect, useState } from "react";
import api from "../api/api";

function ModifierRapport({ visiteur }) {
    const [date, setDate] = useState(); //Date du rapport recherché
    const [listeRapports, setListeRapports] = useState([]); //État qui va contenir liste des rapports
    const [rapport, setRapport] = useState({}); //État qui stock rapport modifié
    const [majRapportSuccess, setMajRapportSuccess] = useState(); //État vérif si bien modif
    const [RapportTrouveSuccess, setRapportTrouveSuccess] = useState(); // État qui vérif si le rapport a été trouvé

    /* Fonction pour charger les rapports */
    function chargerRapports() {
        if (date != undefined) {
            const regex_yyyymmdd = /^(19|20)\d\d[-/.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])$/;
            if (regex_yyyymmdd.test(date)) {
                rechercherRapports(visiteur.id, date);
            } else {
                setRapportTrouveSuccess(false);
            }
        }
    }

    /* Appel API avec comme paramètre idVisiteur et date */
    async function rechercherRapports(idVisiteur, date) {
        try {
            let response = await api.get(`http://192.168.162.196/restGSB/rapports_a_date?idVisiteur=${idVisiteur}&date=${date}`);
            console.log("Données récupérées depuis l'API : ", response.data);
            setListeRapports(response.data);
            if (response.data.length > 0) {
                setRapportTrouveSuccess(true);
            } else {
                setRapportTrouveSuccess(false);
            }
        } catch (error) {
            console.error("Erreur : ", error);
            setRapportTrouveSuccess(false);
        }
    }

    /* Mise à jour après changement de la date */
    useEffect(() => {
        if (date) chargerRapports();
    }, [date]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-2xl font-bold mb-6">Modifier un rapport</h2>

            {/* Barre de recherche rapports */}
            <label htmlFor="date-input" className="block text-gray-700 text-sm font-bold mb-2">
                Rechercher par date :
            </label>
            <input
                id="date-input"
                type="date"
                className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            {/* Msg rapport trouvé succès ou erreur */}
            {RapportTrouveSuccess === true && <p className="text-green-600 mt-4">Rapports bien trouvés !</p>}
            {RapportTrouveSuccess === false && <p className="text-red-600 mt-4">Aucun rapports trouvés :'( </p>}

            {/*Les rapports trouvés*/}
            {listeRapports.length > 0 && (
                <div className="mt-8 w-full max-w-lg">
                    <h3 className="text-xl font-bold mb-4">Rapports trouvés pour l'ID : {visiteur.id}</h3>
                    <table className="border w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-blue-500 text-white">ID Rapport</th>
                                <th className="border px-4 py-2 bg-blue-500 text-white">Motif</th>
                                <th className="border px-4 py-2 bg-blue-500 text-white">Bilan</th>
                                <th className="border px-4 py-2 bg-blue-500 text-white">Médecin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listeRapports.map((rapport, index) => (
                                <tr
                                    key={`rapport-ligne-${index}`}
                                    className="hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer"
                                    onClick={() => setRapport(rapport)}
                                >
                                    <td className="border px-4 py-2">{rapport.idRapport}</td>
                                    <td className="border px-4 py-2">{rapport.motif}</td>
                                    <td className="border px-4 py-2">{rapport.bilan}</td>
                                    <td className="border px-4 py-2">{rapport.nomMedecin} {rapport.prenomMedecin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ModifierRapport;