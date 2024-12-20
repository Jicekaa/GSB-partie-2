import { useLocation, useOutletContext } from "react-router-dom";

function Rapports(){
    
    const {visiteur, setVisiteur} = useOutletContext();
    console.log();
    return(
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100">
                <h1>AU RAPPORT</h1>
            </div>
            
            
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