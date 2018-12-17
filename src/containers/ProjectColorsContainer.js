import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'react-moment';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    getProject,
    updateProjectTitle,
    updateProjectNote,
    updateProjectColorOrder,
    updateProjectColors,
    createNewColor
} from "../actions";

import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectEditNavigation from '../components/Project/ProjectEditNavigation';
import ColorsPreview from '../components/Project/Colors/ColorsPreview';
import ColorsEdit from '../components/Project/Colors/ColorsEdit';

const Loading = () => (
    <div>
        <FontAwesomeIcon icon={['fas', 'circle-notch']} size='2x' spin />
    </div>
)

class ProjectColorsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
            colors: null,
        }
    }

    componentWillMount() {
        this.props.getProject(this.props.match.params.id);
    }

    handleTitleChange = (title) => {
        console.log(title);
        this.props.updateProjectTitle(this.props.project, title);
    }

    handleColorOrder = (colors) => {
        this.setState({
            colors: colors
        });
        this.props.updateProjectColorOrder(this.props.project, colors);
    }

    handleColorNew = () => {
        const colors = this.props.project.colors_defs || [];
        let newColor = {};

        if ( _.isEmpty( colors ) ) {
            newColor = {
                id: 1,
                name: '',
                value: ''
            };
        } else {
            const lastColor = colors.reduce((prev, current) => (prev.id > current.id) ? prev : current);
            newColor = {
                id: lastColor.id + 1,
                name: '',
                value: ''
            };
        }
        const newColors = [
            ...colors, newColor
        ];
        this.setState({
            colors: newColors
        });
        this.props.createNewColor(this.props.project, newColors)
    }

    handleColorChange = (color, value) => {

        const colors = this.props.project.colors_defs;
        const objIndex = colors.findIndex(obj => obj.id === color.id);

        let newColors = [
            ...colors.slice(0, objIndex),
            {...value},
            ...colors.slice(objIndex + 1)
        ];

        this.setState({
            colors: newColors
        });

        this.props.updateProjectColors(
            this.props.project,
            newColors
        );
    }

    renderProject(project) {

        let project_id = this.props.match.params.id;
        let editing = this.props.editing;
        let view = this.props.view;
        let colors = this.state.colors || this.props.project.colors_defs || null;

        return (
            <React.Fragment>
                <ProjectEditNavigation {...this.props} />
                <div className="project-info">
                    <ProjectHeader
                        project={project}
                        editing={editing}
                        view={view}
                        handleTitleChange={this.handleTitleChange}
                    />
                    <div className="project-content">
                        <ColorsEdit
                            editing={editing}
                            colors={colors}
                            handleColorChange={this.handleColorChange}
                            handleColorNew={this.handleColorNew}
                            handleColorOrder={this.handleColorOrder}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {

        console.log(this.props);
        let {project} = this.props;

        return (
            <ProjectLayout>
                {/*<Link className="back" to="/">&lsaquo; Back to all Projects</Link>*/}
                { ! _.isEmpty(project) ? this.renderProject(project) : <Loading/> }
            </ProjectLayout>
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
        updateProjectTitle,
        updateProjectNote,
        updateProjectColorOrder,
        updateProjectColors,
        createNewColor
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectColorsContainer);
