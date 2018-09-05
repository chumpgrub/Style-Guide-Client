import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import update from 'immutability-helper';

const NewImage = ({handleImageNew}) => {
    return (
        <div className="col col--full col--image" onClick={handleImageNew}>
            <div className="image image--new"><FontAwesomeIcon icon={['far', 'times-circle']} size="2x"/></div>
        </div>
    )
}

const Image = SortableElement(({editing, image, handleImageChange}) => {
    const editingClass = editing ? '--full' : '';
    return (
        <div className={`col col`+ editingClass +` col--image`}>
            {
                editing ?
                    <ImageEdit
                        image={image}
                        handleImageChange={handleImageChange}
                    /> : <ImagePreview image={image} />
            }
        </div>
    )
});

const ImagePreview = ({image}) => {
    return(
        <div className="image image--preview">
            <h3>{image.name}</h3>
            <div className="image__dimensions">{image.width} x {image.height}</div>
        </div>
    )
}

const ImageEdit = ({image, handleImageChange}) => {

    const shouldImageUpdate = (key, image, event) => {

        let newValue = event.target.value;
        let oldValue = image[key];

        if (newValue !== oldValue) {

            // Update image data.
            let newImage = update(image, {
                [key]: {$set: newValue}
            });

            handleImageChange(image, newImage);
        }

    }

    const handleImageDelete = (image) => {
        console.log(image);
    }

    return (
        <div className="image image--edit">
            <FontAwesomeIcon icon={['fas', 'bars']}/>
            <div className="form-row">
                <div className={`form-element form-element--full ${image.name ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="name"
                        defaultValue={image.name}
                        onBlur={(e) => shouldImageUpdate('name', image, e)}
                    />
                    <label htmlFor="name">Image Name</label>
                </div>
            </div>
            <div className="form-row">
                <div className={`form-element form-element--half ${image.width ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="width"
                        defaultValue={image.width}
                        onBlur={(e) => shouldImageUpdate('width', image, e)}
                    />
                    <label htmlFor="width">Width</label>
                </div>
                <div className={`form-element form-element--half ${image.height ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="height"
                        defaultValue={image.height}
                        onBlur={(e) => shouldImageUpdate('height', image, e)}
                    />
                    <label htmlFor="width">Height</label>
                </div>
            </div>
            <div className="form-row">
                <div className={`form-element form-element--half ${image.background ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="background"
                        defaultValue={image.background}
                        onBlur={(e) => shouldImageUpdate('background', image, e)}
                    />
                    <label htmlFor="background">Background Color</label>
                </div>
                <div className={`form-element form-element--half ${image.text ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="text"
                        defaultValue={image.text}
                        onBlur={(e) => shouldImageUpdate('text', image, e)}
                    />
                    <label htmlFor="color">Text Color</label>
                </div>
            </div>
            <div className="form-row form-row--actions">
                <FontAwesomeIcon
                    onClick={() => handleImageDelete(image)}
                    icon={['far', 'copy']}
                />
                <FontAwesomeIcon
                    onClick={() => handleImageDelete(image)}
                    icon={['far', 'trash-alt']}
                />
            </div>
        </div>
    )
}

const SortableList = SortableContainer(({images, editing, handleImageChange, handleImageNew}) => {
    return (
        <div className="row row-gutter-10 flex-column project-images">
            {
                images.map((image, index) => {
                    return (
                        <Image
                            key={image.id}
                            index={index}
                            editing={editing}
                            image={image}
                            disabled={!editing}
                            handleImageChange={handleImageChange}
                        />
                    )
                })
            }
            { editing ? <NewImage handleImageNew={handleImageNew} /> : null }
        </div>
    )
})

class ImagesPreview extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleImageChange = (image, value) => {
        this.props.handleImageChange(image, value);
    }

    handleImageNew = () => {
        this.props.handleImageNew();
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let updatedOrder = arrayMove(this.props.images, oldIndex, newIndex);
        this.props.handleImageOrder([...updatedOrder]);
    }

    render() {

        let {editing, images} = this.props;

        return (
            <section className="definitions definitions--images">
                <h2 className="definition-title">Images</h2>
                {
                    images ?
                    <SortableList
                        axis="xy"
                        distance={50}
                        editing={editing}
                        images={images}
                        handleImageChange={this.handleImageChange}
                        handleImageNew={this.handleImageNew}
                        onSortEnd={this.onSortEnd}
                    /> : null
                }
            </section>
        )
    }
}

export default ImagesPreview;