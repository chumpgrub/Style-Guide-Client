import React from 'react';
import {SortableHandle, SortableElement} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TypeAttributes from './TypeAttributes';

const DragHandle = SortableHandle(() =>
    <FontAwesomeIcon icon={['fas', 'bars']}/>
)

const TypographyDefPreview = SortableElement((props) => {
    return (
        <div className="col col--full typography-definition">
            <div className="type type--preview">
                <DragHandle/>
                <div className="type__data">
                    {props.name && <h3>{props.name}</h3>}
                    {props.note && <p>{props.note}</p>}
                    <TypeAttributes {...props}/>
                </div>
                <div className="preview-actions">
                    <button className="btn btn-sm btn-primary" onClick={props.handleEditToggle}>Edit</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={props.handleCopy}>
                        Copy
                        <FontAwesomeIcon
                            icon={['far', 'copy']}
                        />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={props.handleDelete}>
                        Delete
                        <FontAwesomeIcon
                            icon={['far', 'trash-alt']}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
})

export default TypographyDefPreview;