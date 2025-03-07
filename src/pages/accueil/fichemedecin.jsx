import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function FicheMedecin() {
    const [medecin, setMedecin] = useOutletContext(); // Récupère state Medecin
    const [affichage, setAffichage] = useState('fiche'); // Affichage par défaut, fiche par défaut

    /*Composant imbriquée Fiche, qui va prendre comme param le hook Medecin*/
    function Fiche({ leMedecin }) {

        const [updateMedecinSucess, setUpdateMedecinSuccess] = useState(null); //check si màj réussi ou non


        /*Fonction qui se déclenche lors de la soumission form*/
        /*appel API avc données saisies pr màj le médecins ds la bdd*/
        function updatemedecin(e) {
            e.preventDefault() /*évite de charger la page*/

            const data = Object.fromEntries(new FormData(e.target)); /*récup données form & convertir json*/
            data.id = medecin.id; /*add id du médecin dans json*/
            sendUpdateMedecin(data); //màj

        }

        /*Appel API + Méthode PUT pour màj le médecin dans la BDD*/
        async function sendUpdateMedecin(params) {
            try {
                const maj = await axios.put(`http://192.168.162.196/restGSB/majMedecin`, params);
                console.log('Màj réussie : ', maj.data);
                setUpdateMedecinSuccess(true);
            } catch (erreur) {
                console.error('erreur lors de la màj')
                setUpdateMedecinSuccess(false);
            }
        }

        return (
            <>
                <h1>Fiche du Médecin</h1>
                {/*Formulaire*/}
                <h1>Médecin</h1>
                <form onSubmit={updatemedecin}>
                    <label>
                        Nom :<br />
                        <input
                            type="text"
                            name="nom"
                            defaultValue={medecin.nom}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Prénom :<br />
                        <input
                            type="text"
                            name="prenom"
                            defaultValue={medecin.prenom}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Adresse :<br />
                        <input
                            type="text"
                            name="adresse"
                            defaultValue={medecin.adresse}  
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Téléphone :<br />
                        <input
                            type="text"
                            name="tel"
                            defaultValue={medecin.tel}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Spécialité Complémentaire :<br />
                        <input
                            type="text"
                            name="specialite"
                            defaultValue={medecin.specialitecomplementaire}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Département :<br />
                        <input
                            type="text"
                            defaultValue={medecin.departement}
                        />
                    </label>
                    <br />
                    <br />

                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300" type="submit">Mettre à jour</button>
                </form>
                {updateMedecinSucess && <p>Màj réussie !</p>}
                {updateMedecinSucess === false && <p>Erreur lors de la màj.</p>}
            </>


        )
    }


    /*Composant imbriquée Rapports Medecin, qui prend en props idMedecin et récup rapport dans API*/
    function Rapports({ idMedecin }) {
        
        /*utilisation hook useEffect : appel à l'api via méthode GET*/
        /*dès le refresh du composant*/
        /*URL API : `http://@IP-du-serveur-bdd/restGSB/rapports/idMedecin` exemple idMedecin => 4 */

        const [rapportsMedecin, setRapportsMedecin] = useState([]); //Stockage des rapports deu médecin

        useEffect(() => {
            async function rapports() {
                /*à compléter*/
                const 
            }
            rapports();
        }, [idMedecin])

        return (
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
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${affichage === 'fiche'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-blue-100 text-blue-600'
                                    }`} >
                                Fiche Médecin
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setAffichage('rapports')}
                                className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${affichage === 'rapports'
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
                affichage === 'fiche' ?
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
