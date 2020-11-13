import axios from "axios";

function findAll(){
    return axios
        .get("http://localhost:3000/api/vehicules")
        .then(response => response.data['hydra:member']);
}

function deleteVehicule(id){
    return axios
        .delete("http://localhost:3000/api/vehicules/" + id)
}
export default{
    findAll: findAll,
    delete: deleteVehicule
}