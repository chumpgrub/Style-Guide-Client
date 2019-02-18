import React, {Component} from 'react';
import update from 'immutability-helper';
import Select from 'react-select';
import TextareaAutosize from 'react-autosize-textarea';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import TyopgraphyDefPreview from './TypographyDefPreview';

const CustomOption = (props) => {
    let styles = props.getStyles('option', props);
    let swatch_styles = {
        backgroundColor: props.value,
    }
    return (
        <div className="custom-option" ref={props.innerRef} {...props.innerProps} style={styles}>
            <span style={swatch_styles}></span>
            {props.children}
        </div>
    )
}

class TypographyDef extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.def
        }
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

        // Handle Definition Change.
        this.props.handleDefChange(def)
    }

    handleDefChange = (field) => (e) => {

        const newValue = e.target.value;
        const previousDef = this.state;
        const device = field.split('-')[0];
        const deviceField = field.split('-')[1];

        let updatedDef = [];

        console.log('TypographyDef::handleDefChange')
        console.log(previousDef)

        switch (device) {
            case 'desktop':
            case 'tablet':
            case 'mobile':
                updatedDef = update(previousDef, {
                    devices: {
                        [device]: {
                            [deviceField]: {
                                $set: newValue
                            }
                        }
                    }
                })
                break;
            case 'all':
                updatedDef = update(previousDef, {
                    [deviceField]: {$set: newValue},
                    devices: {
                        mobile: {
                            [deviceField]: {
                                $apply: () => {
                                    console.log(newValue)
                                    const prevValue = previousDef.devices.mobile[deviceField];
                                    console.log(prevValue)
                                    return (typeof prevValue !== 'undefined') ? prevValue : newValue;
                                }
                            }
                        },
                        tablet: {
                            [deviceField]: {
                                $set: newValue
                            }
                        },
                        desktop: {
                            [deviceField]: {
                                $set: newValue
                            }
                        },
                    }
                })
                break;
            default:
                updatedDef = update(previousDef, {
                    [field]: {$set: newValue}
                })
                break;
        }
        console.log('updatedDef')
        console.log(updatedDef)
        this.setState({
            ...updatedDef
        })
    }

    handleFamilyDefChange = (e) => {
        const newValue = e;
        const previousDef = this.state;
        const updatedDef = update(previousDef, {
            family: {$set: newValue}
        })
        this.setState({
            ...updatedDef
        })
    }

    handleColorDefChange = (e) => {
        const newValue = e;
        const previousDef = this.state;
        const updatedDef = update(previousDef, {
            color: {$set: newValue}
        })
        this.setState({
            ...updatedDef
        })
    }

    handleEditToggle = () => {
        this.setState({editing: true})
    }

    renderEdit() {
        const {name, note, letterspacing, weight} = this.state;
        console.log('TypographyDef::renderEdit')
        console.log(this.state)
        const {family} = this.state || '';
        const {color} = this.state || '';
        const {families, colors} = this.props;
        const {desktop, tablet, mobile} = this.state.devices;

        return (
            <div className="col col--full typography-definition">
                <div className="type type--edit">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={name}
                            placeholder="Font Element"
                            onBlur={this.handleDefChange('name')}
                        />
                    </div>
                    <div className="form-group">
                        <TextareaAutosize
                            className="form-control"
                            rows={1}
                            onBlur={this.handleDefChange('note')}
                            defaultValue={note}
                            placeholder="Details, here..."
                        />
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label>Font Family</label>
                            <Select
                                getOptionValue={(option) => option.slug}
                                getOptionLabel={(option) => option.name}
                                styles={{menu: (base) => ({...base, zIndex: 100})}}
                                options={families}
                                backspaceRemovesValue
                                value={family}
                                onChange={(e) => this.handleFamilyDefChange(e)}
                            />
                        </div>
                        <div className="col">
                            <label>Font Color</label>
                            <Select
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.name}
                                components={{Option: CustomOption}}
                                styles={{menu: (base) => ({...base, zIndex: 100})}}
                                options={colors}
                                defaultValue={colors[0]}
                                backspaceRemovesValue
                                value={color}
                                onChange={(e) => this.handleColorDefChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={weight}
                                placeholder="Font Weight"
                                onBlur={this.handleDefChange('all-weight')}
                            />
                        </div>
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={letterspacing}
                                placeholder="Letter Spacing"
                                onBlur={this.handleDefChange('all-letterspacing')}
                            />
                        </div>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab><FontAwesomeIcon icon={['fa', 'desktop']}/></Tab>
                            <Tab><FontAwesomeIcon icon={['fa', 'tablet-alt']}/></Tab>
                            <Tab><FontAwesomeIcon icon={['fa', 'mobile-alt']}/></Tab>
                        </TabList>
                        <TabPanel>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${desktop.size ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={desktop.size}
                                        onBlur={this.handleDefChange('desktop-size')}
                                    />
                                    <label htmlFor="name">Size</label>
                                </div>
                                <div className={`form-element form-element--half ${desktop.lineheight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={desktop.lineheight}
                                        onBlur={this.handleDefChange('desktop-lineheight')}
                                    />
                                    <label htmlFor="name">Line Height</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${desktop.weight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={desktop.weight}
                                        onBlur={this.handleDefChange('desktop-weight')}
                                    />
                                    <label htmlFor="name">Weight</label>
                                </div>
                                <div className={`form-element form-element--half ${desktop.letterspacing ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={desktop.letterspacing}
                                        onBlur={this.handleDefChange('desktop-letterspacing')}
                                    />
                                    <label htmlFor="name">Letter Spacing</label>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${tablet.size ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={tablet.size}
                                        onBlur={this.handleDefChange('tablet-size')}
                                    />
                                    <label htmlFor="name">Size</label>
                                </div>
                                <div className={`form-element form-element--half ${tablet.lineheight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={tablet.lineheight}
                                        onBlur={this.handleDefChange('tablet-lineheight')}
                                    />
                                    <label htmlFor="name">Line Height</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${tablet.weight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={tablet.weight}
                                        onBlur={this.handleDefChange('tablet-weight')}
                                    />
                                    <label htmlFor="name">Weight</label>
                                </div>
                                <div className={`form-element form-element--half ${tablet.letterspacing ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={tablet.letterspacing}
                                        onBlur={this.handleDefChange('tablet-letterspacing')}
                                    />
                                    <label htmlFor="name">Letter Spacing</label>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${mobile.size ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={mobile.size}
                                        onBlur={this.handleDefChange('mobile-size')}
                                    />
                                    <label htmlFor="name">Size</label>
                                </div>
                                <div className={`form-element form-element--half ${mobile.lineheight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={mobile.lineheight}
                                        onBlur={this.handleDefChange('mobile-lineheight')}
                                    />
                                    <label htmlFor="name">Line Height</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className={`form-element form-element--half ${mobile.weight ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={mobile.weight}
                                        onBlur={this.handleDefChange('mobile-weight')}
                                    />
                                    <label htmlFor="name">Weight</label>
                                </div>
                                <div className={`form-element form-element--half ${mobile.letterspacing ? 'focus' : ''}`}>
                                    <input
                                        type="text"
                                        defaultValue={mobile.letterspacing}
                                        onBlur={this.handleDefChange('mobile-letterspacing')}
                                    />
                                    <label htmlFor="name">Letter Spacing</label>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <div className="form-row form-row--actions">
                        <button onClick={this.handleSave}>Save</button>
                        <FontAwesomeIcon
                            icon={['far', 'copy']}
                        />
                        <FontAwesomeIcon
                            icon={['far', 'trash-alt']}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderPreview() {
        const def = this.state;
        console.log('TypographyDef:renderPreview');
        console.log(def);
        return (
            <TyopgraphyDefPreview {...def} handleEditToggle={this.handleEditToggle}/>
        )
    }

    render() {
        console.log(this.props)
        // todo: I don't think the newDef prop needs to exist any longer.
        const {editing, newDef} = this.state;
        return (
            <React.Fragment>
                {editing || newDef ? this.renderEdit() : this.renderPreview()}
            </React.Fragment>
        )
    }
}

export default TypographyDef;

TypographyDef.defaultProps = {
    editing: true,
    newDef : false,
    id: null,
    device: 'desktop',
    name: null,
    note: null,
    color: {
        name: null,
        value: null
    },
    family: {
        name: null,
        slug: null
    },
    weight: null,
    letterspacing: null,
    styles: null,
    underline: null,
    lineheight: null,
    devices: {
        desktop: {
            size: '11111',
            margin: null
        },
        tablet: {
            size: null,
            margin: null
        },
        mobile: {
            size: null,
            margin: null
        }
    }
}

