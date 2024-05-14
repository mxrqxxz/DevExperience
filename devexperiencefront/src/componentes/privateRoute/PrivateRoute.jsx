// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ component: Element, ...rest }) => {
    const { authToken } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                authToken ? (
                    <Element {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
