import React from 'react';
import Moment from 'react-moment';

import ProjectTitle from './ProjectTitle';

const ProjectHeader = (props) => {

    const {project, editing, view} = props;
    const title = ('new' === view ) ? '' : project.name;

    console.log(view);

    const TimeStamp = () => {
        if ( 'new' !== view ) {
            return (
                <dl className="project-timestamp">
                    <dt>Created:</dt>
                    <dd><Moment format="MMM DD YYYY">{project.created_at}</Moment></dd>
                    <dt>Last Updated:</dt>
                    <dd><Moment format="MMM DD YYYY @ h:MM A">{project.updated_at}</Moment></dd>
                </dl>
            )
        } else {
            return null;
        }
    }

    return (
        <div className="project-header">
            <ProjectTitle
                editing={editing}
                view={view}
                title={title}
                handleTitleChange={props.handleTitleChange}
                handleNewProject={props.handleNewProject}
            />
            <TimeStamp/>
        </div>
    )
}

export default ProjectHeader;

