import React from 'react';
import ProjectContainer from '../../containers/ProjectContainer';
import ProjectNewContainer from '../../containers/ProjectNewContainer';
import ProjectColorsContainer from '../../containers/ProjectColorsContainer';
import ProjectImagesContainer from '../../containers/ProjectImagesContainer';
import ProjectTypographyContainer from '../../containers/ProjectTypographyContainer';

const Project = (props) => {
    const {view} = props || '';
    switch(view) {
        case 'new':
            return <ProjectNewContainer {...props}/>;
        case 'colors':
            return <ProjectColorsContainer {...props}/>;
        case 'images':
            return <ProjectImagesContainer {...props}/>;
        case 'typography':
            return <ProjectTypographyContainer {...props}/>;
        default:
            return <ProjectContainer {...props}/>;
    }
}

export default Project;
