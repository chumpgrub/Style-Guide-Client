import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'react-moment';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    getProject,
    createNewColor,
    updateProjectColorName,
    updateProjectColor,
    updateProjectColorOrder
} from "../actions";

import Layout from '../hoc/Layout';
import ProjectNotes from '../components/Project/ProjectNotes';
import ColorsPreview from '../components/Project/Colors/ColorsPreview';
import ImagesPreview from '../components/Project/Images/ImagesPreview';
import TypographyPreview from '../components/Project/Typography/TypographyPreview';

const Loading = () => (
    <div>
        <FontAwesomeIcon icon={['fas', 'circle-notch']} size='2x' spin />
    </div>
)

class ProjectContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
            colors: null
        }
    }

    componentWillMount() {
        this.props.getProject(this.props.match.params.id);
    }

    handleNoteChange = (note) => {
        console.log(note);
    }

    handleColorOrder = (colors) => {
        this.setState({
            colors: colors
        });
        this.props.updateProjectColorOrder(this.props.project, colors);
    }

    handleColorNew = () => {
        const colors = this.props.project.colors_defs;
        const lastColor = colors.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        const newColor = {
            id: lastColor.id + 1,
            name: '',
            value: '#'
        };
        const newColors = [
            ...colors, newColor
        ];
        this.setState({
            colors: newColors
        });
        this.props.createNewColor(this.props.project, newColor)
    }

    handleColorNameChange = (color, name) => {
        const colors = this.props.project.colors_defs;
        const objIndex = colors.findIndex(obj => obj.id === color.id);

        let newColors = [
            ...colors.slice(0, objIndex),
            {...color, name: name},
            ...colors.slice(objIndex + 1)
        ];

        this.setState({
            colors: newColors
        });

        this.props.updateProjectColorName(
            this.props.project,
            Object.assign({}, {...color}, {name: name})
        );
    }

    handleColorChange = (color, value) => {
        const colors = this.props.project.colors_defs;
        const objIndex = colors.findIndex(obj => obj.id === color.id);

        let newColors = [
            ...colors.slice(0, objIndex),
            {...color, value: value},
            ...colors.slice(objIndex + 1)
        ];

        this.setState({
            colors: newColors
        });

        this.props.updateProjectColor(
            this.props.project,
            Object.assign({}, {...color}, {value: value})
        );
    }

    renderProject(project) {

        let project_id = this.props.match.params.id;
        let editing = this.props.editing;
        let colors = this.state.colors || this.props.project.colors_defs || null;

        return (
            <div>
                <h1 className="project-title">{project.name}</h1>
                <dl className="project-timestamp">
                    <dt>Created:</dt>
                    <dd><Moment format="MMM DD YYYY">{project.created_at}</Moment></dd>
                    <dt>Last Updated:</dt>
                    <dd><Moment format="MMM DD YYYY @ h:MM A">{project.updated_at}</Moment></dd>
                </dl>
                {editing ?
                    <Link to={'/project/' + project_id }>view</Link>
                    : <Link to={'/project/' + project_id + '/edit'}>edit</Link>
                }
                <ProjectNotes
                    editing={editing}
                    notes={project.notes}
                    handleNoteChange={this.handleNoteChange}
                />
                <ColorsPreview
                    editing={editing}
                    colors={colors}
                    handleColorNameChange={this.handleColorNameChange}
                    handleColorChange={this.handleColorChange}
                    handleColorNew={this.handleColorNew}
                    handleColorOrder={this.handleColorOrder}
                />
                <TypographyPreview
                    editing={editing}
                    fonts={project.font_defs}
                />
                <ImagesPreview
                    editing={editing}
                    images={project.image_defs}
                />
            </div>
        )
    }

    render() {

        console.log(this.props);
        let {project} = this.props;

        return (
            <Layout>
                <Link className="back" to="/">&lsaquo; Back to all Projects</Link>
                { ! _.isEmpty(project) ? this.renderProject(project) : <Loading/> }
            </Layout>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        project: state.project
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProject,
        createNewColor,
        updateProjectColor,
        updateProjectColorName,
        updateProjectColorOrder
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
