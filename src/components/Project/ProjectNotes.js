import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const ProjectNotes = ({editing, notes, handleNoteChange}) => {
    const notePreview = () => {
        return (
            <div className="project-notes">
            {notes.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
            })}
            </div>
        )
    }
    const noteEdit = () => {
        return (
            <TextareaAutosize
                rows={1}
                defaultValue={notes}
                onBlur={(e) => checkNoteChange(e)}
                placeholder="Provide project information, here..."
            />
        )
    }
    const checkNoteChange = (e) => {
        if (notes !== e.target.value) {
            handleNoteChange(e.target.value);
        }
    }
    return (
        <section className="definitions definitions--notes">
            <h2 className="definition-title">Notes</h2>
            {editing ? noteEdit() : notePreview() }
        </section>
    )
}

export default ProjectNotes;