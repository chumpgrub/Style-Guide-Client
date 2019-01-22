import React, {Fragment} from 'react';
import Header from '../components/Global/Header';

const ProjectLayout = (props) => {
    return (
        <Fragment>
            <Header/>
            <div className="container-fluid">
                <main className={props.className}>
                    {props.children}
                </main>
            </div>
        </Fragment>
    );
};

export default ProjectLayout;
