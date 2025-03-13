import { useState } from "react";

export default function AjouterRapport({visiteur}){
    const [medecin, setMedecin] = useState({});
    const [addRapportSuccess, setaddRapportSuccess] = useState();

    function ajouteRapport(e) {

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
        
        </>
    )
}