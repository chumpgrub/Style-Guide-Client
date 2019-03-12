import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SortableHandle, SortableElement} from 'react-sortable-hoc';
import TextareaAutosize from 'react-autosize-textarea';


const DragHandle = SortableHandle(() =>
    <FontAwesomeIcon icon={['fas', 'bars']}/>
)

class ImageDef extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.props.image
        }
    }

    handleEditToggle = () => {
        this.setState({editing: !this.state.editing})
    }

    handleFieldBlur = (e, name) => {
        const {value} = e.target
        this.setState({
            [name] : value
        })
    }

    handleSave = () => {
        // Return editing state to false.
        this.setState({editing: false})
        this.setState({newDef: false})

        const def = Object.assign({},
            this.state,
            {editing: false},
            {newDef: false}
        );

        window.scroll({
            top: ReactDOM.findDOMNode(this).offsetTop,
            left: 0,
            behavior: 'smooth'
        })

        // Handle Definition Change.
        this.props.handleDefChange(def)
    }

    handleCancel = () => {
        const {newDef} = this.state;
        const currentState = Object.assign({}, this.state, {editing: false});
        const currentProps = Object.assign({}, this.props.image, {editing: false});

        console.log(currentState, currentProps)

        // New definition and no change detected.
        if ( newDef && _.isEqual( currentState, currentProps ) ) {

            this.props.handleImageDelete(currentState)

        // Not new definition and no change detected.
        } else if ( !newDef && _.isEqual( currentState, currentProps ) ) {

            this.setState({editing: false})

        // New definition with values added.
        } else if ( newDef && !_.isEqual( currentState, currentProps ) ) {

            let result = window.confirm('Are you sure you\'d like to proceed without saving your changes?');
            if ( result ) {
                this.props.handleImageDelete(currentState)
            }

        // Changes in existing definition, but not saved.
        } else {

            let result = window.confirm('Are you sure you\'d like to proceed without saving your changes?');
            if ( result ) {
                // Revert definition to original values.
                this.setState({...currentProps})
            }
        }
    }

    handleDelete = () => {
        let result = window.confirm('Delete this definition?');
        if ( result ) {
            // Handle Definition Delete.
            this.props.handleImageDelete(this.state)
        }
    }

    handleCopy = () => {
        // Handle Definition Copy.
        this.props.handleImageCopy(this.state)
    }

    renderPreview = () => {
        const {name, width, height, notes} = this.state
        return (
            <div className="image image--preview">
                <DragHandle/>
                <div className="image__info">
                    <h3>{name} <span>({width} x {height})</span></h3>
                    <div className="image__notes">{notes}</div>
                </div>
                <div className="preview-actions">
                    <button className="btn btn-sm btn-primary"
                            onClick={this.handleEditToggle}
                    >Edit</button>
                    <button className="btn btn-sm btn-outline-secondary"
                            onClick={this.handleCopy}
                    >Copy
                        <FontAwesomeIcon
                            icon={['far', 'copy']}
                        />
                    </button>
                    <button className="btn btn-sm btn-outline-danger"
                            onClick={this.handleDelete}
                    >Delete
                        <FontAwesomeIcon
                            icon={['far', 'trash-alt']}
                        />
                    </button>
                </div>
            </div>
        )
    }

    renderEdit = () => {
        const {name, notes, width, height, text, background} = this.state
        return (
            <div className="image image--edit">
                <div className="form-row">
                    <div className={`form-element form-element--full ${name ? 'focus' : ''}`}>
                        <input
                            type="text"
                            defaultValue={name}
                            onBlur={(e) => this.handleFieldBlur(e, 'name')}
                        />
                        <label>Image Name</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className={`form-element form-element--full ${notes ? 'focus' : ''}`}>
                        <TextareaAutosize
                            className="form-control"
                            rows={1}
                            defaultValue={notes}
                            onBlur={(e) => this.handleFieldBlur(e, 'notes')}
                        />
                        <label>Image Notes</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className={`form-element form-element--half ${width ? 'focus' : ''}`}>
                        <input
                            type="text"
                            defaultValue={width}
                            onBlur={(e) => this.handleFieldBlur(e, 'width')}
                        />
                        <label>Width</label>
                    </div>
                    <div className={`form-element form-element--half ${height ? 'focus' : ''}`}>
                        <input
                            type="text"
                            defaultValue={height}
                            onBlur={(e) => this.handleFieldBlur(e, 'height')}
                        />
                        <label>Height</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className={`form-element form-element--half ${background ? 'focus' : ''}`}>
                        <input
                            type="text"
                            defaultValue={background}
                            onBlur={(e) => this.handleFieldBlur(e, 'background')}
                        />
                        <label>Background Color</label>
                    </div>
                    <div className={`form-element form-element--half ${text ? 'focus' : ''}`}>
                        <input
                            type="text"
                            defaultValue={text}
                            onBlur={(e) => this.handleFieldBlur(e, 'text')}
                        />
                        <label>Text Color</label>
                    </div>
                </div>
                <div className="form-row form-row--actions">
                    <button className="btn btn-sm btn-outline-secondary"
                            onClick={this.handleCancel}
                    >Cancel</button>
                    <button className="btn btn-sm btn-primary"
                            onClick={this.handleSave}
                    >Save</button>
                </div>
            </div>
        )
    }

    render() {
        const {editing} = this.state
        console.log(this.state)
        return(
            <div className="col-12 col--image col--image--full">
                {editing ? this.renderEdit() : this.renderPreview()}
            </div>
        )
    }
}

export default SortableElement((props) => (<ImageDef {...props} />));

ImageDef.defaultProps = {
    editing: false,
    name: '',
    notes: '',
    text: '',
    width: '',
    height: '',
    background: ''
}
