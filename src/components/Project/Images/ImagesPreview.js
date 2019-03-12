import React, {Component} from 'react';
import ImageDef from './ImageDef';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {getNextAvailableId} from '../../../lib/utility'

import update from 'immutability-helper';

const NewImage = ({handleImageNew}) => {
    return (
        <div className="d-flex add-image">
            <button className="btn btn-secondary" onClick={handleImageNew}>Add Definition</button>
        </div>
    )
}

const SortableList = SortableContainer(({images, handleDefChange, handleImageDelete, handleImageCopy}) => {
    return (
        <div className="row flex-wrap project-images">
            {
                images.map((image, index) => {
                    return (
                        <ImageDef
                            key={image.id}
                            index={index}
                            image={image}
                            handleDefChange={handleDefChange}
                            handleImageDelete={handleImageDelete}
                            handleImageCopy={handleImageCopy}
                        />
                    )
                })
            }
        </div>
    )
})

class ImagesPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }

    handleDefChange = (def) => {
        let {id} = def;
        let previousDefs = this.state.images || [];

        let updatedDefs = [];

        if (previousDefs.length && id) {

            let objIndex = previousDefs.findIndex(obj => obj.id === id)
            let previousDef = previousDefs.find(previousDef => previousDef.id == id)

            // If definition exists currently.
            if ( typeof previousDef !== 'undefined' ) {
                previousDef = Object.assign({}, previousDef, {...def})
            } else {
                objIndex = 0;
                previousDef = {...def}
            }

            updatedDefs = update(previousDefs, {
                [objIndex]: {$set: previousDef}
            })

        } else {

            updatedDefs = update(previousDefs, {
                $push: def
            })

        }

        this.setState({ images: updatedDefs })
        this.props.handleImageChange(updatedDefs)
    }

    handleImageNew = () => {
        let previousImages = this.state.images || [];
        let nextID = 1;

        if ( previousImages.length > 0 ) {
            nextID = getNextAvailableId(previousImages)
        }

        let newImageProps = Object.assign({}, {id: nextID}, {newDef: true}, {editing: true})

        let updatedImages = [
            ...previousImages,
            {...newImageProps}
        ]

        console.log(updatedImages)

        this.setState({
            images: updatedImages
        })
        // this.props.handleImageNew();
    }

    handleImageDelete = (image) => {

        let {id} = image
        let previousDefs = this.state.images
        let objIndex = previousDefs.findIndex(obj => obj.id === id)
        let updatedDefs = update(previousDefs, { $splice: [[objIndex, 1]] })

        this.setState({ images: updatedDefs })
        this.props.handleImageChange(updatedDefs);

        // let result = window.confirm('Delete this image?');
        // if ( result ) {
        //     const {id} = image;
        //     const {images} = this.props;
        //     const objIndex = images.findIndex(obj => obj.id === id);
        //     const updatedImages = [
        //         ...images.slice(0, objIndex),
        //         ...images.slice(objIndex + 1),
        //     ];
        //
        //     this.setState({
        //         images: updatedImages
        //     })
        //
        //     this.props.handleImageChange(updatedImages);
        // }
    }

    handleImageCopy = (def) => {

        let previousDefs = this.state.images
        let defIndex = previousDefs.findIndex(obj => obj.id === def.id)
        let maxId = Math.max.apply(Math, previousDefs.map(function(obj) { return obj.id; }))
        let defCopy = Object.assign({}, def, {id: parseInt(maxId) + 1}, {name: def.name + ' - Copy'})
        let updatedDefs = []

        // If previousDefs contains only one item or we're copying the last item.
        if (previousDefs.length === 1 || previousDefs.length === (defIndex + 1)) {
            updatedDefs = update(previousDefs, {$push: [defCopy]})
        } else {
            defIndex++
            updatedDefs = [
                ...previousDefs.slice(0, defIndex),
                defCopy,
                ...previousDefs.slice(defIndex)
            ]
        }

        this.setState({
            images: updatedDefs
        })

        this.props.handleImageChange(updatedDefs);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let updatedOrder = arrayMove(this.state.images, oldIndex, newIndex)
        this.setState({ images: updatedOrder })
        this.props.handleImageChange([...updatedOrder])
    }

    render() {

        let {images} = this.state;

        return (
            <section className="definitions definitions--images">
                <h2 className="definition-title">Images</h2>
                {
                    images &&
                    <SortableList
                        axis="y"
                        distance={50}
                        images={images}
                        handleDefChange={this.handleDefChange}
                        handleImageDelete={this.handleImageDelete}
                        handleImageCopy={this.handleImageCopy}
                        onSortEnd={this.onSortEnd}
                    />
                }
                <NewImage handleImageNew={this.handleImageNew} />
            </section>
        )
    }
}

export default ImagesPreview;