import React from 'react';
import {Link} from 'react-router-dom';
//import Header from '../components/Header/Header';

const Header = () => <header>My Header</header>;

const Layout = (props) => {
    return (
        <div className="container">
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
