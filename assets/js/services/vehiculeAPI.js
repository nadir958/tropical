import axios from "axios";

function findAll(){
    return axios
        .get("http://localhost:3000/api/vehicules")
        .then(response => response.data['hydra:member']);
}

function find(id){
    return axios
    .get("http://localhost:3000/api/vehicules/"+id)
    .then(response => response.data);
}

function deleteVehicule(id){
    return axios
        .delete("http://localhost:3000/api/vehicules/" + id);
}

function update (id, vehicule){
    return axios.put(
        "http://localhost:3000/api/vehicules/"+id,vehicule
    );
}

function create(vehicule){
    return axios.post(
        "http://localhost:3000/api/vehicules",vehicule
    );
}

export default{
    findAll: findAll,
    find,
    update,
    create,
    delete: deleteVehicule
}