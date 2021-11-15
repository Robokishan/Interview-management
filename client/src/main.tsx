/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/plugins/nucleo/css/nucleo.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './assets/scss/argon-dashboard-react.scss';
// import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { Provider } from 'react-redux';
import { createClient, Provider as UrqlProvider } from 'urql';
// import { store } from './store';
import Protectedroute from './utils/Auth/Protected';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
// import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.scss';
// import Public from './layouts/Public';
import Registration from './components/Registration';

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
                <Route path="/admin" component={AdminLayout} />
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
