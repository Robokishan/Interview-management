import { Content } from 'carbon-components-react';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideNavWithHeader from '../components/Header';
import { routes } from '../routes';
interface Props {}

export default function Admin({}: Props): ReactElement {
    const style = {
        height: '100%',
    };

    const getRoutes = routeList =>
        routeList.map((prop, key) => {
            if (prop.layout === '/admin') {
                let path = prop.layout + prop.path;
                if (prop.param) path += prop.param;

                return (
                    <Route
                        path={path}
                        component={prop.component}
                        key={`routes-${key}`}
                    />
                );
            }
            return null;
        });
    const getSideBarList = routeList => {
        const sideBarList: any = [];
        routes.forEach(route => {
            if (route.show == true) {
                sideBarList.push(route);
            }
        });
        return sideBarList;
    };

    return (
        <div
            className="container"
            style={{
                padding: '3em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <SideNavWithHeader sideBarList={getSideBarList(routes)} />
            <Content id="main-content" style={style}>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/admin/forms" />
                </Switch>
            </Content>
        </div>
    );
}
