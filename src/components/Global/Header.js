import React from 'react';
import {Link} from 'react-router-dom';
import orbitLogo from '../../images/orbit-logo-white.png';

const Header = () => {
    return(
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    <Link className="col" to="/">
                        <img src={orbitLogo} alt="Orbit Media Studios"/>
                    </Link>
                    <div className="col d-flex flex-grow-1 justify-content-end align-items-center header__actions">
                        <Link className="btn btn-primary" to="/project/new">New Project</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
