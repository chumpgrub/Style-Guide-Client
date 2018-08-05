import React from 'react';

const ProjectTitle = ({editing, title, handleTitleChange}) => {

    const checkTitleChange = (e) => {
        if (title !== e.target.value) {
            handleTitleChange(e.target.value);
        }
    }

    const titleEdit = () => {
        return (
            <div>
                <input
                    defaultValue={title}
                    onBlur={(e) => checkTitleChange(e)}
                    placeholder="Project Name"
                />
            </div>
        )
    }

    const titlePreview = () => {
        return (
            <div className="title">
                {title}
            </div>
        )
    }

    return (
        <section className="project-title">
            {editing ? titleEdit() : titlePreview()}
        </section>
    )
}

export default ProjectTitle;