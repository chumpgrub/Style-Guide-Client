import React from 'react';
import Header from '../components/Global/Header';

const Layout = (props) => {
    return (
        <div>
            <Header {...props} />
            <div className="container">
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
