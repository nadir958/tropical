import React from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAPI from '../services/authAPI';

const Navbar = ({ isAuthenticated, onLogout, history }) => {
    
    const handleLogout = () => {
        authAPI.logout();
        onLogout(false);
        toast.info('Vous êtes désormais déconnecté');
        history.push("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Tropical</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/vehicules">Vehicules</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Utilisateurs</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (<>
                        <li className="nav-item">
                            <a href="/register" className="nav-link">
                                Inscription 
                        </a>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="btn btn-warning">
                                Connexion
                        </NavLink>
                        </li>
                    </>)) || (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Déconnexion
                        </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;