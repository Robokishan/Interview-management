import { Button, Modal } from 'carbon-components-react';
import cx from 'classnames';
import React, { ReactElement, useState } from 'react';

export default function AnotherContent({
    useResponsiveOffset = true,
}): ReactElement {
    const [open, setOpen] = useState(false);
    const classNameFirstColumn = cx({
        'bx--col-lg-13': true,
        'bx--offset-lg-3': useResponsiveOffset,
    });
    return (
        <div className="bx--grid">
            <div className="bx--row">
                <div className={classNameFirstColumn}>
                    <h2 style={{ margin: '0 0 30px' }}>
                        This is Another Content
                    </h2>
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
}
