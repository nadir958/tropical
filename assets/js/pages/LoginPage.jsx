import React,{useState} from 'react';
import authAPI from '../services/authAPI';

const LoginPage = ({onLogin, history}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({...credentials, [name]: value});
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
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="@ email de connexion"
                        id="username"
                        name="username"
                        className={"form-control" + (error && " is-invalid")} 
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Mot de passee"
                        name="password"
                        id="password"
                        className="form-control" />
                </div>
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