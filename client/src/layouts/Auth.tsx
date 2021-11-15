/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import { Grid, Row } from 'carbon-components-react';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import {
//     // An object of all themes
//     themes,
//     // Direct theme values
//     white,
//     g10,
//     g90,
//     g100,
//     // Specific token values
//     interactive01,
//     interactive02,
//   } from '@carbon/themes';
// import { Col, Container, Row } from 'reactstrap';
// core components
import { routes } from '../routes';

interface Props {}

export default function Auth({}: Props): ReactElement {
    const getRoutes = routeList =>
        routeList.map((prop, key) => {
            if (prop.layout === '/auth') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            return null;
        });

    return (
        <>
            <div
                style={{
                    paddingTop: '100px',
                    // backgroundImage: "url('https://cloud.ibm.com/login/static/cache/2710b-1194401830/img/login_background.jpg')"
                }}
                className="main-content">
                <div className="header bg-gradient-dark py-7 py-lg-8">
                    <Grid>
                        <div className="header-body text-center mb-7">
                            <Row style={{ textAlign: 'center' }}>
                                <div className="bx--col">
                                    <h1 className="text-white">Login</h1>
                                </div>
                            </Row>
                        </div>

                        {/* Page content */}
                        <Grid className="bx--col-md-4 bx--col-lg-6">
                            {/* <Row> */}
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect from="*" to="/auth/login" />
                            </Switch>
                            {/* </Row> */}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
