import React from 'react';
import TypeKit from 'react-typekit';
import Header from '../components/Global/Header';

const ProjectLayout = (props) => {
    let projectClass = props.className || '';
    return (
        <React.Fragment>
            <TypeKit kitId="wsw8dkp" />
            <Header/>
            <div className="container">
                <main>
                    <div className={`project ` + projectClass}>
                        {props.children}
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
};

export default ProjectLayout;
