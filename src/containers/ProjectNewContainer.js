import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    createProject,
    resetIsNewProp
} from "../actions";
import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';

const Loading = () => (
    <div>
        <FontAwesomeIcon icon={['fas', 'circle-notch']} size='2x' spin />
    </div>
)

class ProjectNewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
            colors: null,
            images: null
        }
    }

    handleTitleChange = (title) => {
        console.log(title);
        this.props.updateProjectTitle(this.props.project, title);
    }

    handleNewProject = (projectName) => {
        console.log('HANDLING NEW PROJECT: '+projectName)
        this.props.createProject(projectName)
    }

    handleNoteChange = (note) => {
        console.log(note);
        console.log(this.props.project);
        this.props.updateProjectNote(this.props.project, note);
    }

    renderProject(project) {

        let {editing, view} = this.props;

        return (
            <React.Fragment>
                {/*<ProjectEditNavigation {...this.props} />*/}
                <div className="project-info">
                    <p>ProjectNewContainer.js</p>
                    <ProjectHeader
                        project={project}
                        editing={editing}
                        view={view}
                        handleTitleChange={this.handleTitleChange}
                        handleNewProject={this.handleNewProject}
                    />
                </div>
            </React.Fragment>
        )
    }

    render() {

        let {project,isNew} = this.props;

        if (isNew) {
            this.props.resetIsNewProp();
            return (
                <Redirect to={`/project/${project.id}/edit`}/>
            )
        } else {
            return (
                <ProjectLayout className="project--new">
                    { this.renderProject(project) }
                </ProjectLayout>
            )
        }

    }

}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        project: state.project,
        isNew: state.project.isNew
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createProject,
        resetIsNewProp
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNewContainer);
