import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import { AuthContext } from '../auth/AuthContext';

import LoginScreen from '../components/login/LoginScreen';
import DashboardRoutes from './DashboardRoutes';

const AppRouter = () => {

    const { user } = useContext(AuthContext);
    
    
    return (
        <Router>
            <div>

                {/* <Navbar /> // Eliminado ya que no requerimos el Navbar en el login */}

                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />

                    <PrivateRoutes
                        path="/"
                        component={ DashboardRoutes } 
                        isAuthenticated={ user.logged }
                    />
                </Switch>

            </div>
        </Router>
    )
}

export default AppRouter
