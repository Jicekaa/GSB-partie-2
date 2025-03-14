import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/api";

function FicheMedecin() {
    const [medecin, setMedecin] = useOutletContext(); // Récupère state Medecin
    const [affichage, setAffichage] = useState('fiche'); // Affichage par défaut, fiche par défaut

    /*COMPOSANT IMBRIQUÉ Fiche, qui va prendre comme param le hook Medecin*/
    function Fiche({ leMedecin }) {
        const [updateMedecinSucess, setUpdateMedecinSuccess] = useState(null); // Vérifie si mise à jour réussie ou non

        /*Fonction qui se déclenche lors de la soumission du formulaire*/
        function updatemedecin(e) {
            e.preventDefault(); /*évite de recharger la page*/

            const data = Object.fromEntries(new FormData(e.target)); /*Récupère données du formulaire et les convertit en JSON*/
            data.id = leMedecin.id; /*Ajoute l'ID du médecin dans le JSON*/
            sendUpdateMedecin(data); // Màj
        }

        /*Appel API + Méthode PUT pour mettre à jour le médecin dans la BDD*/
        async function sendUpdateMedecin(params) {
            try {
                const maj = await api.put(`http://192.168.162.196/restGSB/majMedecin`, params);
                console.log('Màj réussie : ', maj.data);
                setUpdateMedecinSuccess(true);
            } catch (erreur) {
                console.error('Erreur lors de la mise à jour');
                setUpdateMedecinSuccess(false);
            }
        }

        if (!leMedecin || Object.keys(leMedecin).length === 0) {
            return <p>Aucun médecin sélectionné.</p>;
        }

        return (
            <>
                <h1>Fiche du Médecin</h1>
                <form onSubmit={updatemedecin}>
                    <label>
                        Nom :<br />
                        <input
                            type="text"
                            name="nom"
                            defaultValue={leMedecin.nom}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Prénom :<br />
                        <input
                            type="text"
                            name="prenom"
                            defaultValue={leMedecin.prenom}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Adresse :<br />
                        <input
                            type="text"
                            name="adresse"
                            defaultValue={leMedecin.adresse}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Téléphone :<br />
                        <input
                            type="text"
                            name="tel"
                            defaultValue={leMedecin.tel}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Spécialité Complémentaire :<br />
                        <input
                            type="text"
                            name="specialite"
                            defaultValue={leMedecin.specialitecomplementaire}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Département :<br />
                        <input
                            type="text"
                            defaultValue={leMedecin.departement}
                        />
                    </label>
                    <br />
                    <br />

                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300" type="submit">Mettre à jour</button>
                </form>
                {updateMedecinSucess && <p>Màj réussie !</p>}
                {updateMedecinSucess === false && <p>Erreur lors de la mise à jour.</p>}
            </>
        );
    }

    /*COMPOSANT IMBRIQUÉ Rapports, qui prend en props idMedecin et récupère rapport dans API*/
    function Rapports({ idMedecin }) {
        const [rapportsMedecin, setRapportsMedecin] = useState([]); // Stockage des rapports du médecin

        useEffect(() => {
            async function rapports() {
                try {
                    const responseRapports = await api.get(`http://192.168.162.196/restGSB/rapports/${idMedecin}`); // Appel API
                    console.log('Rapport du médecin: ', responseRapports.data); // Vérification des données
                    setRapportsMedecin(responseRapports.data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des rapports : ", error);
                }
            }
            if (idMedecin) {
                rapports();
            }
        }, [idMedecin]);

        return (
            <>
                <h1>Rapports du Médecin</h1>
                {rapportsMedecin.length > 0 ? (
                    <ul>
                        {rapportsMedecin.map((rapport) => (
                            <li key={rapport.id} className="border p-4 mb-2">
                                <h2><strong>Motif : </strong>{rapport.motif}</h2>
                                <p><strong>Bilan : </strong>{rapport.bilan}</p>
                                <p><strong>Date : </strong>{new Date(rapport.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun rapport trouvé pour ce médecin.</p>
                )}
            </>
        );
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
                                }`}>
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
                                }`}>
                                Rapports Médecin
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {affichage === 'fiche' ? (
                <Fiche leMedecin={medecin} />
            ) : (
                <Rapports idMedecin={medecin?.id} />
            )}
        </>
    );
}

export default FicheMedecin;
