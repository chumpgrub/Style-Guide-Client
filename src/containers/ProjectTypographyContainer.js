import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    getProject,
    updateProjectTitle,
    updateProjectFontFamily,
    updateProjectTypography
} from "../actions";

import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectEditNavigation from '../components/Project/ProjectEditNavigation';
import FontFamilies from '../components/Fonts/FontFamilies';
import TypographyPreview from '../components/Project/Typography/TypographyPreview';

const getFontFamilies = (typekit, google, web) => {
    let font_families = [];
    if ( typekit != null && typekit.length ) {
        font_families.push({
            label: 'TypeKit Fonts',
            options: typekit
        })
    }
    let google_families = [];
    if ( google != null && google.length ) {
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
    if ( web != null && web.length ) {
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
        this.props.updateProjectFontFamily(project, font_type, fonts);
    }

    handleTypographyChange = (typography) => {
        let {project} = this.props;
        this.props.updateProjectTypography(project, typography);
    }

    renderProject(project) {

        const {editing, view} = this.props;
        const colors = this.state.colors || this.props.project.colors_defs || null;
        const typekit = (this.props.project.typekit_fonts === null ) ? [] : this.props.project.typekit_fonts;
        const google = (this.props.project.google_fonts === null ) ? [] : this.props.project.google_fonts;
        const web = (this.props.project.web_fonts === null ) ? [] : this.props.project.web_fonts;
        const font_families = getFontFamilies(typekit, google, web);

        return (
            <div className="row">
                <ProjectEditNavigation {...this.props} />
                <div className="col project-info">
                    <ProjectHeader
                        project={project}
                        editing={editing}
                        view={view}
                        handleTitleChange={this.handleTitleChange}
                    />
                    <div className="project-content">
                        <FontFamilies
                            editing={editing}
                            typekit={typekit}
                            google={google}
                            web={web}
                            handleFontFamilyChange={this.handleFontFamilyChange}
                        />
                        <TypographyPreview
                            editing={editing}
                            fonts={project.font_defs}
                            families={font_families}
                            colors={colors}
                            handleTypographyChange={this.handleTypographyChange}
                        />
                    </div>
                </div>
            </div>
        )
    }

    render() {

        let {project} = this.props;

        console.log('ProjectTypographyContainer::render()')
        console.log(project)

        return (
            <ProjectLayout>
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
        updateProjectFontFamily,
        updateProjectTypography
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTypographyContainer);
