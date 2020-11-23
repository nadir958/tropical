import React, { useState } from 'react';
import Field from '../components/forms/Field';
import authAPI from '../services/authAPI';

const LoginPage = ({ onLogin, history }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;

        setCredentials({ ...credentials, [name]: value });
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await authAPI.authenticate(credentials);
            setError("");
            onLogin("true");
            history.replace("/vehicules");

        } catch (error) {
            setError("login incorrect");
        }
    };

    return (
        <>
            <h1>Conexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field 
                    label="addresse email" 
                    name="username" 
                    value={credentials.username} 
                    onChange={handleChange}
                    placeholder="adress email de connexion"
                    error={error}
                />
                <Field 
                    label="Mot de passe" 
                    name="password" 
                    value={credentials.password} 
                    onChange={handleChange}
                    type="password"
                    error=""
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        connexion
                    </button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;