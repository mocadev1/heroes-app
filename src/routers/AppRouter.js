import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import LoginScreen from '../components/login/LoginScreen';
import DashboardRoutes from './DashboardRoutes';

const AppRouter = () => {
    return (
        <Router>
            <div>

                {/* <Navbar /> // Eliminado ya que no requerimos el Navbar en el login */}

                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />

                    <Route path="/" component={ DashboardRoutes } />
                </Switch>

            </div>
        </Router>
    )
}

export default AppRouter