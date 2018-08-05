import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import update from 'immutability-helper';

const Image = SortableElement(({editing, image, handleImageChange}) => {
    return (
        <div className="col col--full col--image">
            {
                editing ?
                    <ImageEdit
                        image={image}
                        handleImageChange={handleImageChange}
                    /> : image.name
            }
        </div>
    )
})

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
        </div>
    )
}

const SortableList = SortableContainer(({images, editing, handleImageChange}) => {
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
        </div>
    )
})

class ImagesPreview extends Component {

    constructor(props) {
        super(props);
    }

    handleImageChange = (image, value) => {
        this.props.handleImageChange(image, value);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let updatedOrder = arrayMove(this.props.images, oldIndex, newIndex);
        this.props.handleImageOrder([...updatedOrder]);
    }

    renderEdit(images) {
        return (
            <div>
                {images ? images.map(image => <ImageEdit key={image.id} image={image}/>) : null}
            </div>
        )
    }

    renderPreview(images) {

    }

    render() {
        let {editing, images} = this.props;

        return (
            <section className="definitions definitions--images">
                <h2 className="definition-title">Images</h2>
                {
                    images ?
                    <SortableList
                        axis="y"
                        distance={50}
                        editing={editing}
                        images={images}
                        handleImageChange={this.handleImageChange}
                        onSortEnd={this.onSortEnd}
                    /> : null
                }
            </section>
        )
    }
}

export default ImagesPreview;