import React from 'react';
import ReactDOM from "react-dom";
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import {HashRouter,Switch,Route} from "react-router-dom";
import VehiculesPage from './js/pages/VehiculesPage';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';



console.log('Hello World');

const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <main className="container pt-5">
                <Switch>
                    <Route path="/vehicules" component={VehiculesPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>

        </HashRouter>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
