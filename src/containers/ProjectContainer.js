import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    getProject,
    createNewColor,
    updateProjectColors,
    updateProjectColorOrder,
    updateProjectTitle,
    updateProjectNote,
    updateProjectFontFamily,
    updateProjectImageOrder,
    updateProjectImages,
    createNewImage
} from "../actions";

import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectEditNavigation from '../components/Project/ProjectEditNavigation';
import ProjectNotes from '../components/Project/ProjectNotes';
import ColorsPreview from '../components/Project/Colors/ColorsPreview';
import ColorsEdit from '../components/Project/Colors/ColorsEdit';
import ImagesPreview from '../components/Project/Images/ImagesPreview';
import FontFamilies from '../components/Fonts/FontFamilies';
import TypographyPreview from '../components/Project/Typography/TypographyPreview';

const getFontFamilies = (typekit, google, web) => {
    let font_families = [];
    if ( typekit && typekit.length ) {
        font_families.push({
            label: 'TypeKit Fonts',
            options: typekit
        })
    }
    let google_families = [];
    if (google && google.length) {
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
    if ( web && web.length ) {
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

class ProjectContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
            colors: null,
            images: null
        }
    }

    componentWillMount() {
        console.log(this.props);
        if (this.props.match.params.id) {
            this.props.getProject(this.props.match.params.id);
        }
    }

    handleTitleChange = (title) => {
        console.log(title);
        this.props.updateProjectTitle(this.props.project, title);
    }

    handleNoteChange = (note) => {
        console.log(note);
        console.log(this.props.project);
        this.props.updateProjectNote(this.props.project, note);
    }

    handleColorOrder = (colors) => {
        this.setState({
            colors: colors
        });
        this.props.updateProjectColorOrder(this.props.project, colors);
    }

    handleColorNew = () => {
        const colors = this.props.project.colors_defs || [];
        const lastColor = colors.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        const newColor = {
            id: lastColor.id + 1,
            name: '',
            value: ''
        };
        const newColors = [
            ...colors, newColor
        ];
        this.setState({
            colors: newColors
        });
        this.props.createNewColor(this.props.project, newColors)
    }

    newHandleColor = () => {
        let project_id = this.props.match.params.id;
        this.props.history.push(`/project/`+project_id+`/colors`);
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

    handleImageChange = (image, value) => {

        const images = this.props.project.image_defs;
        const objIndex = images.findIndex(obj => obj.id === image.id);

        let newImages = [
            ...images.slice(0, objIndex),
            {...value},
            ...images.slice(objIndex + 1)
        ];

        this.setState({
            images: newImages
        });

        this.props.updateProjectImages(
            this.props.project,
            newImages
        );

    }

    handleImageOrder = (images) => {
        this.setState({
            images: images
        });
        this.props.updateProjectImageOrder(this.props.project, images);
    }

    handleImageNew = () => {
        const images = this.props.project.image_defs;
        const lastImage = images.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        const newImage = {
            id: lastImage.id + 1,
            name: '',
            width: '',
            height: ''
        };

        const newImages = [
            ...images, newImage
        ];

        this.setState({
            images: newImage
        });

        this.props.createNewImage(this.props.project, newImages)
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
        let colors = this.state.colors || project.colors_defs || null;
        let {typekit_fonts, google_fonts, web_fonts} = project;

        console.log(typekit_fonts,google_fonts,web_fonts)

        let font_families = getFontFamilies(typekit_fonts, google_fonts, web_fonts);

        return (
            <React.Fragment>
                <ProjectEditNavigation {...this.props} />
                <div className="project-info">
                    <p>ProjectContainer.js</p>
                    <ProjectHeader
                        project={project}
                        editing={editing}
                        view={view}
                        handleTitleChange={this.handleTitleChange}
                    />
                    <div className="project-content">
                        <ProjectNotes
                            editing={editing}
                            notes={project.notes}
                            handleNoteChange={this.handleNoteChange}
                        />
                        <ColorsPreview
                            colors={colors}
                            editing={editing}
                            newHandleColor={this.newHandleColor}
                        />
                        {view === 'preview' ?
                            <div>
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
                                <ImagesPreview
                                    editing={editing}
                                    images={project.image_defs}
                                    handleImageChange={this.handleImageChange}
                                    handleImageOrder={this.handleImageOrder}
                                    handleImageNew={this.handleImageNew}
                                />
                            </div>
                            : null
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {

        let {project} = this.props;

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
        createNewColor,
        updateProjectColors,
        updateProjectColorOrder,
        updateProjectTitle,
        updateProjectNote,
        updateProjectFontFamily,
        updateProjectImageOrder,
        updateProjectImages,
        createNewImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
