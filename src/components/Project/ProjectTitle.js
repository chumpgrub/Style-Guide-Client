import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProjectTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {...props}
    }

    checkTitleChange = (e) => {
        if (this.props.title !== e.target.value) {
            this.props.handleTitleChange(e.target.value);
        }
    }

    titleEdit = () => {
        let {title} = this.state
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

    titlePreview = () => {
        let {title} = this.state
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
                <div className="form-group">
                    <input
                        className="form-control"
                        defaultValue=""
                        placeholder="Project Name"
                        ref="projectName"
                    />
                </div>
                <button className="btn btn-primary">Create Project</button>
                <Link className="btn btn-secondary" to="/">Cancel</Link>
            </form>
        )
    }

    renderTitleType = () => {
        const {title, editing, view} = this.state;

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

export default ProjectTitle;