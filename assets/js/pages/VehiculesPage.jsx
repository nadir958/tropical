import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import vehiculeAPI from '../services/vehiculeAPI';
import VehiculesAPI from "../services/vehiculeAPI";

const VehiculesPage = props => {

    const [vehicules, setVehicules] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [search,setSearch] = useState("");

    //permet de recuperer les vehicules
    const fetchVehicules = async () =>{
        try {
            const data = await VehiculesAPI.findAll()
            setVehicules(data);
        } catch (error) {
            console.log(error.response)
        }
    }

    //au chargement du composant chercher les customers
    useEffect(()=>{fetchVehicules();}, [])

    //permet de supprimer les vehicules
    const handleDelete = async id => {
        const originalVehicules = [...vehicules];

        setVehicules(vehicules.filter(vehicule => vehicule.id !== id));
        try {
            await vehiculeAPI.delete(id)
        } catch (error) {
            setVehicules(originalVehicules);
        }
    };

    //gestion du changement du page
    const handlePageChange = (page) =>{setCurrentPage(page);};

    //gestion de la recherche
    const handleSearch = ({currentTarget}) =>{
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 5;
    
    //filtrage des vehicules en fonction de la recherche
    const filteredVehicules = vehicules.filter(
        v=>
            v.nom.toLowerCase().includes(search.toLowerCase())||
            v.type.toLowerCase().includes(search.toLowerCase())
    );
    
    //pagination des données
    const paginatedVehicules = Pagination.getData(
        filteredVehicules,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>Liste des vehicules</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Type</th>
                        <th className="text-center">Nombre de places</th>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>En vedette</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedVehicules.map(vehicule => (
                        <tr key={vehicule.id}>
                            <td>{vehicule.id}</td>
                            <td>{vehicule.nom}</td>
                            <td>{vehicule.type}</td>
                            <td className="text-center">
                                <span className="badge badge-success">{vehicule.nombreplace}</span>
                            </td>
                            <td>{vehicule.description}</td>
                            <td>{vehicule.photo}</td>
                            <td>{vehicule.envedette}</td>
                            <td>
                                <button className="btn btn-sm btn-warning mr-1">Modifier</button>
                                <button
                                    onClick={() => handleDelete(vehicule.id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Supprimer
                             </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            {itemsPerPage < filteredVehicules.length && (
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                length={filteredVehicules.length} onPageChanged={handlePageChange}/>
            )}
        </>
    );
};

export default VehiculesPage;