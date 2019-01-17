import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProjectTitle extends Component {

    constructor(props) {
        super(props);
    }

    checkTitleChange = (e) => {

        if (this.props.title !== e.target.value) {
            this.props.handleTitleChange(e.target.value);
        }
    }

    titleEdit = (title) => {
        return (
            <div>
                <input
                    defaultValue={title}
                    onBlur={(e) => this.checkTitleChange(e)}
                    placeholder="Project Name"
                />
            </div>
        )
    }

    titlePreview = (title) => {
        return (
            <div className="title">
                {title}
            </div>
        )
    }

    newProject = (e) => {
        e.preventDefault();
        let projectName = this.refs.projectName.value;
        if (projectName) {
            this.props.handleNewProject(projectName);
        }
    }

    titleNewProject = () => {
        return (
            <form onSubmit={(e) => this.newProject(e)}>
                <input
                    defaultValue=""
                    placeholder="Project Name"
                    ref="projectName"
                />
                <button className="button">Create Project</button>
                <Link className="button button--secondary" to="/">Cancel</Link>
            </form>
        )
    }

    renderTitleType = () => {
        const {title, editing, view} = this.props;

        if (editing && view === 'edit') {
            return this.titleEdit(title);
        } else if (view === 'new') {
            return this.titleNewProject()
        } else {
            return this.titlePreview(title)
        }
    }

    render() {
        return (
            <section className="project-title">
                {this.renderTitleType()}
            </section>
        )
    }
}

const OldProjectTitle = ({view, editing, title, handleTitleChange, handleNewProject}) => {

    const checkTitleChange = (e) => {
        if (title !== e.target.value) {
            handleTitleChange(e.target.value);
        }
    }

    const titleEdit = () => {
        return (
            <div>
                <input
                    defaultValue={title}
                    onBlur={(e) => checkTitleChange(e)}
                    placeholder="Project Name"
                />
            </div>
        )
    }

    const titlePreview = () => {
        return (
            <div className="title">
                {title}
            </div>
        )
    }

    const titleNewProject = () => {
        return (
            <form onSubmit={(e) => newProject(e)}>
                <input
                    defaultValue=""
                    placeholder="Project Name"
                    ref="projectName"
                />
                <button className="button">Create Project</button>
            </form>
        )
    }

    const newProject = (e) => {
        e.preventDefault();
        console.log(e);
    }

    const ProjectTitleType = () => {
        if (editing && view === 'edit') {
            return titleEdit();
        } else if (view === 'new') {
            return titleNewProject()
        } else {
            return titlePreview()
        }
    }

    return (
        <section className="project-title">
            <ProjectTitleType/>
        </section>
    )
}

export default ProjectTitle;