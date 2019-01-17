import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ColorSwatchNew = ({handleNewColor}) => {
    return (
        <div className="color color--preview edit">
            <div className="color__inner" onClick={handleNewColor}>
                <div className="color-swatch">
                    <FontAwesomeIcon icon={['fas', 'plus']} size="1x"/>
                </div>
            </div>
        </div>
    )
}

const ColorSwatch = ({color, editing}) => {

    const styles = {background: color.value};
    const editClass = editing ? 'editing' : 'preview';

    const nameToVariable = (name) => {
        if (name && name.length) {
            return '$' + name.trim().toLowerCase().replace(/\W+/g, '-');
        }
    }

    return (
        <div className={`color color--preview `+editClass}>
            <div className="color__inner">
                <div className="color-data color-data--swatch" style={styles}></div>
                <div className="color-data--name">{color.name}</div>
                <div className="color-data--hex">{color.value}</div>
                {editing ?
                    <div className="color-data--var">{nameToVariable(color.name)}</div> : null
                }
            </div>
            <div className="tools"><span></span><span></span><span></span></div>
        </div>
    )
};

const ColorsPreview = ({colors, editing, newHandleColor}) => {

    return (
        <section className="definitions definitions--colors preview">
            <h2 className="definition-title">Color Palette</h2>
            <div className="swatches">
                {
                    colors ?
                        colors.map((color, index) => {
                            return (
                                <ColorSwatch
                                    key={color.id}
                                    index={index}
                                    color={color}
                                    editing={editing}
                                />
                            )
                        })
                        : <div>ADD SOME COLORS!!!</div>
                }
                {editing ? <ColorSwatchNew handleNewColor={newHandleColor}/>: null}
            </div>
        </section>
    )
}

export default ColorsPreview;