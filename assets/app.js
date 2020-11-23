import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import {HashRouter,Switch,Route,withRouter, Redirect} from "react-router-dom";
import VehiculesPage from './js/pages/VehiculesPage';
import VehiculePage from './js/pages/VehiculePage';
import UsersPage from './js/pages/UsersPage'

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import LoginPage from './js/pages/LoginPage';
import authAPI from './js/services/authAPI';
import PrivateRoute from './js/components/PrivateRoute';

authAPI.setup();


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );
    const NavbarWithRouter = withRouter(Navbar);
    return (
        <HashRouter>
            <NavbarWithRouter 
            isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}     
            />

            <main className="container pt-5">
                <Switch>
                    <Route path="/login" 
                        render={props => (
                        <LoginPage onLogin={setIsAuthenticated} {...props}/>
                        )}
                    />

                    <PrivateRoute 
                        path="/vehicules/:id" 
                        isAuthenticated={isAuthenticated} 
                        component={VehiculePage}
                    />

                    <PrivateRoute 
                        path="/vehicules" 
                        isAuthenticated={isAuthenticated} 
                        component={VehiculesPage}
                    />

                    <PrivateRoute 
                        path="/users" 
                        isAuthenticated={isAuthenticated} 
                        component={UsersPage}
                    />
                    
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>

        </HashRouter>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
