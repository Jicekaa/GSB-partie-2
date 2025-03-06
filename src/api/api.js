import axios from 'axios';


const api = axios.create({
    
    baseURL : 'http://192.168.162.196/restGSB'
    //baseURL :'http://192.168.1.144/restGSB' //à la maison
    //baseURL : 'http://192.168.136.196/restGSB' //avec la co du tél
});


export default api;

