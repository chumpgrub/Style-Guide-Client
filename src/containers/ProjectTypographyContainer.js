import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    getProject,
    updateProjectTitle,
    updateProjectFontFamily
} from "../actions";

import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectEditNavigation from '../components/Project/ProjectEditNavigation';
import FontFamilies from '../components/Fonts/FontFamilies';
import TypographyPreview from '../components/Project/Typography/TypographyPreview';
import Project from "../components/Project/Project";

const getFontFamilies = (typekit, google, web) => {
    let font_families = [];
    if ( typekit.length ) {
        font_families.push({
            label: 'TypeKit Fonts',
            options: typekit
        })
    }
    let google_families = [];
    if (google.length) {
        google_families = google.map(font => {
            return {
                slug: font.name,
                name: font.name
            }
        })
        font_families.push({
            label: 'Google Fonts',
            options: google_families
        })
    }
    if ( web.length ) {
        font_families.push({
            label: 'Web Safe Fonts',
            options: web
        })
    }
    return font_families;
}

const Loading = () => (
    <div>
        <FontAwesomeIcon icon={['fas', 'circle-notch']} size='2x' spin />
    </div>
)

class ProjectTypographyContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false
        }
    }

    componentWillMount() {
        this.props.getProject(this.props.match.params.id);
    }

    handleTitleChange = (title) => {
        console.log(title);
        this.props.updateProjectTitle(this.props.project, title);
    }

    handleFontFamilyChange = (font_type, fonts) => {
        let {project} = this.props;
        console.log(project);
        console.log(fonts);
        this.props.updateProjectFontFamily(project, font_type, fonts);
    }

    renderProject(project) {

        let project_id = this.props.match.params.id;
        let editing = this.props.editing;
        let view = this.props.view;
        let colors = this.state.colors || this.props.project.colors_defs || null;
        let {typekit_fonts, google_fonts, web_fonts} = this.props.project;
        let font_families = getFontFamilies(typekit_fonts, google_fonts, web_fonts);

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
                        <FontFamilies
                            editing={editing}
                            typekit={typekit_fonts}
                            google={google_fonts}
                            web={web_fonts}
                            handleFontFamilyChange={this.handleFontFamilyChange}
                        />
                        <TypographyPreview
                            editing={editing}
                            fonts={project.font_defs}
                            families={font_families}
                            colors={colors}
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
        updateProjectFontFamily
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTypographyContainer);
