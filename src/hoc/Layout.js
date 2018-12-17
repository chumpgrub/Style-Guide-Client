import React from 'react';
import TypeKit from 'react-typekit';
import Header from '../components/Global/Header';

const Layout = (props) => {
    return (
        <div>
            <TypeKit kitId="wsw8dkp" />
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
