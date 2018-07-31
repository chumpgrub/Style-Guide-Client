import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Image = SortableElement(({editing, image, id}) => {
    return (
        <div className="col col--full col--image">
            {editing ? <ImageEdit image={image}/> : image.name}
        </div>
    )
})

const ImageEdit = ({image}) => {
    console.log(image);
    return (
        <div className="image image--edit">
            <FontAwesomeIcon icon={['fas', 'bars']}/>
            <div className="form-row">
                <div className={`form-element form-element--full ${image.name ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="name"
                        defaultValue={image.name}
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
                    />
                    <label htmlFor="width">Width</label>
                </div>
                <div className={`form-element form-element--half ${image.height ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="height"
                        defaultValue={image.height}
                    />
                    <label htmlFor="width">Height</label>
                </div>
            </div>
            <div className="form-row">
                <div className={`form-element form-element--half ${image.background ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="background"
                    />
                    <label htmlFor="background">Background Color</label>
                </div>
                <div className={`form-element form-element--half ${image.color ? 'focus' : ''}`}>
                    <input
                        type="text"
                        name="color"
                    />
                    <label htmlFor="color">Text Color</label>
                </div>
            </div>
        </div>
    )
}

const SortableList = SortableContainer(({images, editing}) => {
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
                    /> : null
                }
            </section>
        )
    }
}

// const ImagesPreview = ({images}) => {
//     return (
//         <div className="definitions definitions--images">
//             <h2 className="definition-title">Images</h2>
//             {images ? images.map((image) => {
//                 return (
//                     <Image key={image.id} image={image}/>
//                 )
//             }) : ''}
//         </div>
//     )
// }

export default ImagesPreview;