/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../storage/storage';

function CheckAuthentication() {
    // Checks Authentication from stored localstorage
    const token = storage.getUser();
    // if (token !== null && token !== '') {
    if (token !== null) {
        return true;
    }

    return false;
}

const Protectedroute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (CheckAuthentication()) {
                return <Component {...props} />;
            }

            return <Redirect to="/auth/login" />;
        }}
    />
);

export default Protectedroute;
