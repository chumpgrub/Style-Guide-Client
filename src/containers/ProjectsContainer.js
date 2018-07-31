import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import {getProjects} from '../actions';

import Layout from '../hoc/Layout';

class ProjectsContainer extends Component {

    constructor(props) {
        super(props);
        this.renderProjects = this.renderProjects.bind(this);
        this.state = {
            response: ''
        };
    }

    componentWillMount() {
        this.props.getProjects();
    }

    renderProjects(projects) {
        return projects.map(project => {
            return (
                <div key={project.id} className="project">
                    <Link to={'/project/'+project.id}>{project.name}</Link>
                    <div className="project__actions">
                        <Link to={'/project/'+project.id+'/edit'}>Edit {project.name}</Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.data);
        let {projects} = this.props.data;
        return(
            <Layout>
                <div className="project-list">
                    {projects ? this.renderProjects(projects) : <p>empty</p>}
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProjects
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
