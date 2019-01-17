import React, {Fragment} from 'react';
import Header from '../components/Global/Header';

const ProjectLayout = (props) => {
    let projectClass = props.className || '';
    return (
        <Fragment>
            <Header/>
            <div className="container">
                <main>
                    <div className={`project ` + projectClass}>
                        {props.children}
                    </div>
                </main>
            </div>
        </Fragment>
    );
};

export default ProjectLayout;
