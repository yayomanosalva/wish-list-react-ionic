import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
     component: React.ComponentType<any>;
     path: string;
     exact?: boolean;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
     const { isAuthenticated } = useAuth();

     return (
          <Route
               {...rest}
               render={(props) =>
                    isAuthenticated ? (
                         <Component {...props} />
                    ) : (
                         <Redirect to="/login" />
                    )
               }
          />
     );
};

export default ProtectedRoute;
