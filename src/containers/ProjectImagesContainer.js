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
    updateProjectImageOrder,
    updateProjectImages,
    createNewImage
} from "../actions";

import ProjectLayout from '../hoc/ProjectLayout';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectEditNavigation from '../components/Project/ProjectEditNavigation';
import ImagesPreview from '../components/Project/Images/ImagesPreview';

const Loading = () => (
    <div>
        <FontAwesomeIcon icon={['fas', 'circle-notch']} size='2x' spin />
    </div>
)

class ProjectImagesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editing: false,
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

    handleImageChange = (images) => {
        let {project} = this.props;
        this.props.updateProjectImages(project, images);
    }

    // Delete
    handleImageDelete = (image) => {
        console.log('delete ------')
        console.log(image)
    }

    // Delete
    handleImageOrder = (images) => {
        this.setState({
            images: images
        });
        this.props.updateProjectImageOrder(this.props.project, images);
    }

    // Delete
    handleImageNew = () => {
        const images = this.props.project.image_defs || [];
        let newImage = {};

        if (_.isEmpty(images)) {

            newImage = {
                id: 1,
                name: '',
                width: '',
                height: ''
            }

        } else {

            const lastImage = images.reduce((prev, current) => (prev.id > current.id) ? prev : current);

            newImage = {
                id: lastImage.id + 1,
                name: '',
                width: '',
                height: ''
            };
        }

        const newImages = [
            ...images, newImage
        ];

        this.setState({
            images: newImage
        });

        this.props.createNewImage(this.props.project, newImages)
    }

    renderProject(project) {

        let editing = this.props.editing;
        let view = this.props.view;

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
                        <ImagesPreview
                            editing={editing}
                            images={project.image_defs}
                            handleImageChange={this.handleImageChange}
                        />
                    </div>
                </div>
            </div>
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
        updateProjectTitle,
        updateProjectImageOrder,
        updateProjectImages,
        createNewImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectImagesContainer);
