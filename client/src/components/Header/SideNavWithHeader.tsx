import {
    Button,
    Content,
    Header,
    HeaderContainer,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderMenu,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderName,
    HeaderNavigation,
    HeaderSideNavItems,
    Modal,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SkipToContent,
} from 'carbon-components-react';
import React, { useState } from 'react';
import cx from 'classnames';
import { Link, LinkProps as RRLinkProps } from 'react-router-dom';
import { routes, RouteType } from '../../routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react';
const StoryContent = ({ useResponsiveOffset = true }) => {
    const [open, setOpen] = useState(false);
    const classNameFirstColumn = cx({
        'bx--col-lg-13': true,
        'bx--offset-lg-3': useResponsiveOffset,
    });
    const content = (
        <div className="bx--grid">
            <div className="bx--row">
                <div className={classNameFirstColumn}>
                    <h2 style={{ margin: '0 0 30px' }}>Purpose and function</h2>
                    <p>
                        The shell is perhaps the most crucial piece of any UI
                        built with
                        <a href="www.carbondesignsystem.com"> Carbon</a>. It
                        contains the shared navigation framework for the entire
                        design system and ties the products in IBM’s portfolio
                        together in a cohesive and elegant way. The shell is the
                        home of the topmost navigation, where users can quickly
                        and dependably gain their bearings and move between
                        pages.
                        <br />
                        <br />
                        The shell was designed with maximum flexibility built
                        in, to serve the needs of a broad range of products and
                        users. Adopting the shell ensures compliance with IBM
                        design standards, simplifies development efforts, and
                        provides great user experiences. All IBM products built
                        with Carbon are required to use the shell’s header.
                        <br />
                        <br />
                        To better understand the purpose and function of the UI
                        shell, consider the “shell” of MacOS, which contains the
                        Apple menu, top-level navigation, and universal,
                        OS-level controls at the top of the screen, as well as a
                        universal dock along the bottom or side of the screen.
                        The Carbon UI shell is roughly analogous in function to
                        these parts of the Mac UI. For example, the app switcher
                        portion of the shell can be compared to the dock in
                        MacOS.
                    </p>
                    <h2 style={{ margin: '30px 0' }}>
                        Header responsive behavior
                    </h2>
                    <p>
                        As a header scales down to fit smaller screen sizes,
                        headers with persistent side nav menus should have the
                        side nav collapse into “hamburger” menu. See the example
                        to better understand responsive behavior of the header.
                    </p>
                    <h2 style={{ margin: '30px 0' }}>Secondary navigation</h2>
                    <p>
                        The side-nav contains secondary navigation and fits
                        below the header. It can be configured to be either
                        fixed-width or flexible, with only one level of nested
                        items allowed. Both links and category lists can be used
                        in the side-nav and may be mixed together. There are
                        several configurations of the side-nav, but only one
                        configuration should be used per product section. If
                        tabs are needed on a page when using a side-nav, then
                        the tabs are secondary in hierarchy to the side-nav.
                    </p>
                    <Button onClick={() => setOpen(true)}>Launch modal</Button>
                    <Modal
                        modalHeading="Add a custom domain"
                        modalLabel="Account resources"
                        primaryButtonText="Add"
                        secondaryButtonText="Cancel"
                        open={open}
                        onRequestClose={() => setOpen(false)}>
                        <p style={{ marginBottom: '1rem' }}>
                            Custom domains direct requests for your apps in this
                            Cloud Foundry organization to a URL that you own. A
                            custom domain can be a shared domain, a shared
                            subdomain, or a shared domain and host.
                        </p>
                    </Modal>
                </div>
            </div>
        </div>
    );
    const style: any = {
        height: '100%',
    };
    if (useResponsiveOffset) {
        style.margin = '0';
        style.width = '100%';
    }
    return (
        <Content id="main-content" style={style}>
            {content}
        </Content>
    );
};
const Fade16 = () => (
    <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true">
        <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
    </svg>
);

interface Props {
    sideBarList: RouteType[];
}

export default function SideNavWithHeader({
    sideBarList,
}: Props): React.ReactElement {
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
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <>
                    <Header aria-label="Campus Placement app">
                        <SkipToContent />
                        <HeaderMenuButton
                            aria-label="Open menu"
                            onClick={onClickSideNavExpand}
                            isActive={isSideNavExpanded}
                        />
                        <HeaderName href="#" prefix="Campus">
                            Placement
                        </HeaderName>
                        <SideNav
                            aria-label="Side navigation"
                            expanded={isSideNavExpanded}>
                            <SideNavItems>
                                {sideBarList.map((route, index) => (
                                    <SideNavLink<RRLinkProps>
                                        renderIcon={Fade16}
                                        element={Link}
                                        to={route.layout + route.path}>
                                        {route.name}
                                    </SideNavLink>
                                ))}
                            </SideNavItems>
                        </SideNav>
                    </Header>
                </>
            )}
        />
    );
}
