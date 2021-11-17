import { Content } from 'carbon-components-react';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideNavWithHeader from '../components/Header';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { routes } from '../routes';
import storage from '../utils/storage/storage';
interface Props {}

export default function Admin({}: Props): ReactElement {
    const style = {
        height: '100%',
        width: '100%',
    };
    const { height, width } = useWindowDimensions();

    const getRoutes = routeList => {
        const user = storage.getUser();
        const routes = routeList.map((prop, key) => {
            if (prop.comp === `/${user.type}` && prop.layout === '/admin') {
                let path = prop.layout + prop.comp + prop.path;

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
        return routes;
    };
    const getSideBarList = routeList => {
        const sideBarList: any = [];
        routes.forEach(route => {
            const user = storage.getUser();
            if (
                route.show == true &&
                route.comp === `/${user.type}` &&
                route.layout === '/admin'
            ) {
                sideBarList.push(route);
            }
        });
        return sideBarList;
    };

    const user = storage.getUser();
    return (
        <div
            className="container"
            style={{
                paddingTop: '3em',
                paddingLeft: width ? (width <= 672 ? '0' : '3em') : '3em', //just to make it responsive todo: make it more efficient remove it from react
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <SideNavWithHeader
                headerName={user.name}
                headerTailName={`[${user.type}]`}
                isRail={width ? (width <= 672 ? false : true) : false}
                sideBarList={getSideBarList(routes)}
            />
            <Content id="main-content" style={style}>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/admin/forms" />
                </Switch>
            </Content>
        </div>
    );
}
