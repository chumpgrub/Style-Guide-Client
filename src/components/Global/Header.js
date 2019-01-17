import React from 'react';
import {Link} from 'react-router-dom';
import orbitLogo from '../../images/orbit-logo-white.png';

const Header = () => {
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <img src={orbitLogo} alt="Orbit Media Studios"/>
                </Link>
                <div className="header__actions">
                    <Link className="button button--white" to="/project/new">New Project</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
