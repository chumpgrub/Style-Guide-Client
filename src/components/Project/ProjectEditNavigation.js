import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// https://stackoverflow.com/questions/41131450/active-link-with-react-router

const ProjectEditNavigation = ({editing, match}) => {
    const project_id = match.params.id;
    return (
        <React.Fragment>
            {editing ?
                <div className="project-nav">
                    {/*<div><Link to={'/project/' + project_id}>Preview</Link></div>*/}
                    {/*<div>*/}
                        <NavLink to={'/project/' +project_id + '/edit'}
                              activeClassName="active">
                            <FontAwesomeIcon icon={['fas', 'home']} />
                            <span>General</span>
                        </NavLink>
                        <NavLink to={'/project/' + project_id + '/colors'}
                              activeClassName="active">
                            <FontAwesomeIcon icon={['fas', 'eye-dropper']} />
                            <span>Colors</span>
                        </NavLink>
                        <NavLink to={'/project/' + project_id + '/images'}
                              activeClassName="active">
                            <FontAwesomeIcon icon={['far', 'images']} />
                            <span>Images</span>
                        </NavLink>
                        <NavLink to={'/project/' + project_id + '/typography'}
                              activeClassName="active">
                            <FontAwesomeIcon icon={['fas', 'font']} />
                            <span>Typography</span>
                        </NavLink>
                    {/*</div>*/}
                </div>
                : <Link to={'/project/' + project_id + '/edit'}>Edit</Link>
            }
        </React.Fragment>
    )
}

export default ProjectEditNavigation;