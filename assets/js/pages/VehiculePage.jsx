import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
import vehiculeAPI from '../services/vehiculeAPI';

const VehiculePage = (props) => {
    const {id = "new"} = props.match.params;
    const [loading, setLoading] = useState(false);

    const [vehicule, setVehicule] = useState({
        nom: "",
        type:"",
        nombreplace:"",
        description:"",
        photo:"",
        envedette:""
    });

    const [errors, setErrors] = useState({
        nom: "",
        type:"",
        nombreplace:"",
        description:"",
        photo:""
    });

    const [editing, setEditing] = useState(false);
    
    // Récuperation u vehicule en fonction de l'identifiant
    const fetchVehicule = async id => {
        try {
            const {type, description, envedette, nom, nombreplace, photo} = await vehiculeAPI.find(id);
            setVehicule({nom,type,nombreplace,description,photo,envedette});
            setLoading(false);
        } catch (error) {
            toast.error("impossible de charger la vehicule");
            history.replace("/vehicules");
        }
    };

    //chargement de la vehicule si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(()=>{
        if(id !== "new") {
            setLoading(true);
            setEditing(true);
            fetchVehicule(id)
        }
    }, [])
    
    //gestion des changement des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setVehicule({ ...vehicule, [name]: value });
    };

    //gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        event.preventDefault();

        try {
            if(editing){
                await vehiculeAPI.update(id, vehicule);
                toast.success("la vehicule a été modifiée avec succées");
            }else{
                await vehiculeAPI.create(vehicule);
                props.history.replace("/vehicules");
                toast.success("vehicule a été ajoutée avec succées");
            }
            
            setErrors({});
        } catch ({ response }) {
            const { violations } = response.data;
                if(violations){
                    const apiErrors = {};
                    violations.forEach(({ propertyPath, message }) => {
                        apiErrors[propertyPath] = message;
                    });
                    setErrors(apiErrors);
                    toast.error("Des erreurs dans votre formulaire");
                }
            }
        };
    
    return ( 
    <>
        {(!editing && <h1>Création d'une Vehicule</h1>) || 
            (<h1>Modification d'une Vehicule</h1>
            )}
        {loading && <FormContentLoader/> }
        {!loading && <form onSubmit={handleSubmit}>
            <Field name="nom" label="nom de la vehicule" placeholder="nom de la vehicule" value={vehicule.nom} onChange={handleChange} error={errors.nom}/>
            <Field name="type" label="type" placeholder="type de la vehicule" value={vehicule.type} onChange={handleChange} error={errors.type}/>
            <Field name="nombreplace" label="nombre de places" placeholder="nombre de places" type="number" value={vehicule.nombreplace} onChange={handleChange} error={errors.nombreplace}/>
            <Field name="description" label="Description" placeholder="description" value={vehicule.description} onChange={handleChange} error={errors.description}/>
            <Field name="photo" label="Photo"  value={vehicule.photo} onChange={handleChange} error={errors.photo}/>
            <Field name="envedette" label="en vedette" type="checkbox" value={vehicule.envedette} onChange={handleChange}/>
            
            <div className="form-group">
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/vehicules" className="btn btn-link">Retour à la liste</Link>
            </div>
        </form>}
    </>  
    );
}
 
export default VehiculePage;