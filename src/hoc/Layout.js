import React, {Fragment} from 'react';
import Header from '../components/Global/Header';

const Layout = (props) => {
    return (
        <Fragment>
            <Header/>
            <div className="container">
                <main>
                    {props.children}
                </main>
            </div>
        </Fragment>
    );
};

export default Layout;
