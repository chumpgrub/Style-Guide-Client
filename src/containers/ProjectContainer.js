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
    updateProjectColors,
    updateProjectColorOrder,
    updateProjectTitle,
    updateProjectNote,
    updateProjectFontFamily,
    updateProjectImageOrder,
    updateProjectImages
} from "../actions";

import Layout from '../hoc/Layout';
import ProjectTitle from '../components/Project/ProjectTitle';
import ProjectNotes from '../components/Project/ProjectNotes';
import ColorsPreview from '../components/Project/Colors/ColorsPreview';
import ImagesPreview from '../components/Project/Images/ImagesPreview';
import FontFamilies from '../components/Fonts/FontFamilies';
import TypographyPreview from '../components/Project/Typography/TypographyPreview';

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
        this.props.getProject(this.props.match.params.id);
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
        const colors = this.props.project.colors_defs;
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

        // console.log(images);

        let newImages = [
            ...images.slice(0, objIndex),
            {...value},
            ...images.slice(objIndex + 1)
        ];

        // console.log(newImages);

        this.setState({
            images: newImages
        });

        this.props.updateProjectImages(
            this.props.project,
            newImages
        );

        console.log(image);
        console.log(value);
    }

    handleImageOrder = (images) => {
        this.setState({
            images: images
        });
        this.props.updateProjectImageOrder(this.props.project, images);
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
        let colors = this.state.colors || this.props.project.colors_defs || null;
        let {typekit_fonts, google_fonts, web_fonts} = this.props.project;

        let font_families = getFontFamilies(typekit_fonts, google_fonts, web_fonts);

        return (
            <div className="project">
                {editing ?
                    <Link to={'/project/' + project_id }>view</Link>
                    : <Link to={'/project/' + project_id + '/edit'}>edit</Link>
                }
                <ProjectTitle
                    editing={editing}
                    title={project.name}
                    handleTitleChange={this.handleTitleChange}
                />
                <dl className="project-timestamp">
                    <dt>Created:</dt>
                    <dd><Moment format="MMM DD YYYY">{project.created_at}</Moment></dd>
                    <dt>Last Updated:</dt>
                    <dd><Moment format="MMM DD YYYY @ h:MM A">{project.updated_at}</Moment></dd>
                </dl>
                <ProjectNotes
                    editing={editing}
                    notes={project.notes}
                    handleNoteChange={this.handleNoteChange}
                />
                <ColorsPreview
                    editing={editing}
                    colors={colors}
                    handleColorChange={this.handleColorChange}
                    handleColorNew={this.handleColorNew}
                    handleColorOrder={this.handleColorOrder}
                />
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
        updateProjectColors,
        updateProjectColorOrder,
        updateProjectTitle,
        updateProjectNote,
        updateProjectFontFamily,
        updateProjectImageOrder,
        updateProjectImages
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
