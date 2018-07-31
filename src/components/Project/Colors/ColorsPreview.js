import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import hexRgb from 'hex-rgb';

const getRGB = (value) => {

    // Test for 6 or 3 digit hex value.
    let isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);

    if (isOk) {
        let hex = value.replace(/^#/, '');
        return hexRgb(hex);
    }

    return '';
}

const NewColor = ({handleColorNew}) => {
    return (
        <div className="col color color--new" onClick={handleColorNew}>
            <div className="color__inner"><FontAwesomeIcon icon={['far', 'times-circle']} size="2x"/></div>
        </div>
    )
}

const ColorSwatch = SortableElement(({editing, color, id, handleColorNameChange, handleColorChange, handleColorDelete}) => {

    const styles = {background: color.value};
    const rgb = getRGB(color.value);

    const shouldColorUpdate = (key, color, event) => {

        let newData = event.target.value;
        let oldData = color[key];

        if (newData !== oldData) {
            switch(key) {
                case 'name':
                    handleColorNameChange(color, newData);
                    break;
                case 'value':
                    handleColorChange(color, newData);
                    break;
            }
        }
    }

    const edit = () => {
        return (
            <div className="color color--edit">
                <div className="form-row">
                    <div className={`form-element form-element--full color-name ${color.name ? 'focus' : ''}`}>
                        <input type="text"
                               name="name"
                               defaultValue={color.name}
                               onBlur={(e) => shouldColorUpdate('name', color, e)}
                        />
                        <label htmlFor="name">Color Name</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className={`form-element form-element--full color-hex ${color.value ? 'focus' : ''}`}>
                        <input type="text"
                               name="value"
                               defaultValue={color.value}
                               onBlur={(e) => shouldColorUpdate('value', color, e)}
                        />
                        <label htmlFor="value">Color Value</label>
                    </div>
                </div>
            </div>
        )
    }

    const preview = () => {
        const nameToVariable = (name) => {
            if (name.length) {
                return '($' + name.trim().toLowerCase().replace(/\W+/g, '-') + ')';
            }
        }
        return (
            <div>
                <div className="color-name">{color.name}</div>
                <div className="color-hex">{color.value}</div>
                <div className="color-hex color-var">{nameToVariable(color.name)}</div>
            </div>
        )
    }

    const edtingState = editing ? 'editing' : 'preview';

    return (
        <div className={'col color color--preview ' + edtingState}>
            <div className="color__inner">
                <div className="color-swatch" style={styles}></div>
                <div>
                    {editing ? edit() : preview()}
                </div>
                <div className="color-rgb">
                    {/*{rgb.red},{rgb.green},{rgb.blue}*/}
                </div>
                {editing && <FontAwesomeIcon onClick={() => handleColorDelete(color)} icon={['far', 'trash-alt']}/>}
            </div>
        </div>
    )
});

// ColorSwatch.defaultProps = {
//     id:
//     name:
//     value:
// }

const SortableList = SortableContainer(({colors, editing, handleColorNameChange, handleColorChange, handleColorDelete, handleColorNew}) => {
    return (
        <div className="row row--gutter-30 project-colors">
            {
                colors.map((color, index) => {
                    return (
                        <ColorSwatch
                            key={color.id}
                            index={index}
                            editing={editing}
                            color={color}
                            disabled={!editing}
                            handleColorNameChange={handleColorNameChange}
                            handleColorChange={handleColorChange}
                            handleColorNew={handleColorNew}
                            handleColorDelete={handleColorDelete}
                        />
                    )
                })
            }
            { editing ? <NewColor handleColorNew={handleColorNew} /> : null }
        </div>
    )
});

class ColorsPreview extends Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        let updatedOrder = arrayMove(this.props.colors, oldIndex, newIndex);
        this.props.handleColorOrder([...updatedOrder]);
    }

    handleColorNameChange = (color, value) => {
        this.props.handleColorNameChange(color, value);
    }

    handleColorChange = (color, value) => {
        this.props.handleColorChange(color, value);
    }

    handleColorDelete = (color) => {
        console.log('DELETING COLOR');
        console.log(color);
        const {id} = color;
        const {colors} = this.props;
        const objIndex = colors.findIndex(obj => obj.id === id);
        const updatedColors = [
            ...colors.slice(0, objIndex),
            ...colors.slice(objIndex + 1),
        ];
        this.props.handleColorOrder(updatedColors);
    }

    handleColorNew = () => {
        this.props.handleColorNew();
    }

    render() {

        let {editing, colors} = this.props;

        return (
            <section className="definitions definitions--colors">
                <h2 className="definition-title">Color Palette</h2>
                {
                    colors ?
                    <SortableList
                        axis="xy"
                        distance={50}
                        editing={editing}
                        colors={colors}
                        handleColorNameChange={this.handleColorNameChange}
                        handleColorChange={this.handleColorChange}
                        handleColorDelete={this.handleColorDelete}
                        handleColorNew={this.handleColorNew}
                        onSortEnd={this.onSortEnd}
                    /> : null
                }
            </section>
        )
    }
}

export default ColorsPreview;