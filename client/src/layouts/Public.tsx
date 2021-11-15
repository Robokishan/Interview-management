/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { Container, Card, CardBody } from 'reactstrap';

import { routes } from '../routes';

export default function Public({}: any) {
    const getRoutes = routeList =>
        routeList.map((prop, key) => {
            if (prop.layout === '/public') {
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
            {/* //{' '}
            <Container className="mt-7" fluid>
                //{' '}
                <Card className="bg-secondary shadow border-0">
                    //{' '}
                    <CardBody className="px-lg-5 py-lg-5">
                        // <Switch>{getRoutes(routes)}</Switch>
                        //{' '}
                    </CardBody>
                    //{' '}
                </Card>
                //{' '}
            </Container> */}
        </>
    );
}
