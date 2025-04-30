import { useNavigate } from "react-router-dom";

function Logout() {
    
    const navigate = useNavigate();
    const deconnexion = () => {
        sessionStorage.clear("");
        navigate("/"),{state : null};
    }
    

    return (
        <button onClick={deconnexion} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Déconnexion
        </button>
    );
}

export default Logout;