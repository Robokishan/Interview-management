/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient, Provider as UrqlProvider } from 'urql';
// import Public from './layouts/Public';
import Registration from './components/Registration';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import './main.scss';
import Protectedroute from './utils/Auth/Protected';

const client = createClient({
    url: 'http://localhost:5050/graphql',
    fetchOptions: {
        credentials: 'include',
    },
});

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <UrqlProvider value={client}>
                <ToastContainer hideProgressBar />
                {/* for testing uncomment this line */}
                <Route path="/admin" component={AdminLayout} />
                {/* for testing comment this line */}
                {/* <Protectedroute path="/admin" component={AdminLayout} /> */}
                <Route
                    path="/auth"
                    render={props => <AuthLayout {...props} />}
                />
                {/* <Route path="/public" render={(props) => <Public {...props} />} /> */}
                <Route
                    path="/"
                    exact
                    render={props => <Registration {...props} />}
                />
                {/* <Redirect exact path="/" to="/admin/forms" /> */}
            </UrqlProvider>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);
