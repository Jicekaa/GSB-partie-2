import { useLocation, useOutletContext } from "react-router-dom";

function Rapports(){
    
    const {visiteur, setVisiteur} = useOutletContext();
    console.log();
    return(
        <>
            <h1>AU RAPPORT</h1>
            
            {/* Juste pour l'exemple */}
            {/* 
            <div>id : {visiteur.id}</div>
            <div>prenom : {visiteur.prenom}</div>
            <div>nom : {visiteur.nom}</div>
            <div>adresse : {visiteur.adresse}</div>
            <div>cp : {visiteur.cp}</div>
            <div>ville : {visiteur.ville}</div>
            */}
            

        </>
    )
}

export default Rapports;