import axios from 'axios';


const api = axios.create({
    
    baseURL : 'http://192.168.198.196/restGSB'
});


export default api;

