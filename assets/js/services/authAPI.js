import axios from "axios";
import jwtDecode from "jwt-decode";


// Déconnexion (suppression du token du localStorage et sur axios)
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requet HTTP d'authentification et storage du token dans le storage et sur axios
 * @param {object} credentials 
 */

function authenticate(credentials){

    return axios
        .post("http://localhost:3000/api/login_check", credentials)
        .then(response=> response.data.token)
        .then(token => {
            //je stocke le token dans mon localStorage
            window.localStorage.setItem("authToken", token);
            //on prévient axios qu'on a maintenant un header par default sur 
            //toutes nos futures requetes http
            setAxiosToken(token);
        })    
}
 /**
  * positionne le token JWT sur axios
  * @param {string} token le token JWT
  */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;

}

/**
 * Mise en place lors de chargement de l'application
 */
function setup(){
    // voir si on a un token 
    const token = window.localStorage.getItem("authToken");
    // si le token est encore valide donner le token a axios
    if(token){
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
        }
    }
}

/**
 * permet de savoir si on est authentifié ou pas
 */
function isAuthenticated(){
     // voir si on a un token 
     const token = window.localStorage.getItem("authToken");
     // si le token est encore valide donner le token a axios
     if(token){
         const {exp: expiration} = jwtDecode(token);
         if (expiration * 1000 > new Date().getTime()){
             return true;
         }
         return false;
     }
     return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};