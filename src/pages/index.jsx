import { useRef, useState } from "react";
import ErreurLogin from "../composants/erreurlogin";
import { useNavigate } from "react-router-dom";
import api from "../api/api";



function Index(){

    const form = useRef(null);
    const [erreurlogin, setErreurLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const navigateTo = useNavigate();

    function handleSubmit(event) {
        event.preventDefault() /*évite de charger la page*/

        // On récup et on stocke les valeurs des champs de saisie
        const formData = new FormData(event.currentTarget);
        const login = formData.get("login");
        const mdp = formData.get("mdp");
        //console.log(login) //test qui récupère bien ce qu'il y a dans les champs
        //console.log(mdp)


        //appel à la fct
        getUser(login, mdp).then((response)=> {
            
            if (response.data != null) {
                //fonction navigate qui redirige vers ma page accueil
                navigateTo('/Accueil', {
                    state: response.data
                });
                console.log("Connexion réussie : ", response.data);
            } else {
                console.log("login / mdp pas bon chef");
                setErreurLogin(true); //si erreur de saisie //fonctionne pas
                                     //affiche bannière erreurlogin
            }

        })
        .catch((error) => { 
            console.error("Erreur de connexion : ", error); //fonctionne
        });
    }


    //retourne une promesse ou affiche erreur
    //note pour moi : cette fonction se met en dehors de la fonction du dessus
    async function getUser(leLogin, leMdp) {
        try {
            const response = await api.get('/connexion', {
                params:{
                    login : leLogin,
                    mdp : leMdp
                },
            });
            return "Connexion à l'api",response;
        }
        catch (error) {
            console.log("Erreur connexion API");
        }
    }

    return (
        <>
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
                <img src="src/image-GSB-1.png" className="w-1/6 mb-4"/>
                <h1 className="text-3xl font-bold mb-4">Identifiez-vous</h1>
                
                {/*Login*/}
                <div className="flex flex-col mb-4">
                    <label className="text-gray-500 font-bold mb-2">Login :</label>
                    <input type="text" name="login" className="border rounded px-4 py-2" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Identifiant"/>
                </div>

                {/*Mot de passe*/}
                <div className="flex flex-col mb-4">
                    <label className="text-gray-500 font-bold mb-2">Password :</label>
                    <input type="password" name="mdp" className="border rounded px-4 py-2" value={mdp} onChange={(e) => setMdp(e.target.value)} placeholder="Mot de passe"/>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded">Connexion</button>
                
                {/*Bannière d'erreur de login*/}
                <div>
                    <ErreurLogin visible={erreurlogin}/> {/*fonctionne bien*/}
                </div>
            
            </form>
        </>
    )

    
}

export default Index;