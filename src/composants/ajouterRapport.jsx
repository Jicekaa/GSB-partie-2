import { useState } from "react";

export default function AjouterRapport({visiteur}){
    const [medecin, setMedecin] = useState({});
    const [addRapportSuccess, setaddRapportSuccess] = useState();

    function ajouteRapport(e) {
        e.preventDefault() /*évite de charger la page*/

    }

    //
    // Appel à l'API pr ajouter nouveau rapport dans bdd via méthode PUT
    async function ajouterRapportBase(params){
        try {
            const ajoutbdd = api.put(`http://192.168.162.196/restGSB/ajouterRapport`, params);
            console.log("insertion réussie du rapport dans la bdd", ajoutbdd);
            setaddRapportSuccess(true);
        } catch (error) {
            setaddRapportSuccess(false);
            console.error("échec insertion rapport dans la bdd", error);
        }
    }

    return(
        <>
            <h2>Ajouter un rapport à {}</h2><br/>
            <label>Date de visite</label><br/>
            <input type="datetime-local"/>

            <label>Motif</label>
            <input type="text" />

            <label>Bilan</label>
            <input type="text" />



        </>
    )
}