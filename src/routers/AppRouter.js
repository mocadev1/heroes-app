import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import LoginScreen from '../components/login/LoginScreen';
import DashboardRoutes from './DashboardRoutes';

const AppRouter = () => {

    const { user } = useContext(AuthContext);
    
    
    return (
        <Router>
            <div>

                {/* <Navbar /> // Eliminado ya que no requerimos el Navbar en el login */}

                <Switch>
                    <PublicRoutes
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ user.logged }
                    />

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
