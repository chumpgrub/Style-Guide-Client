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
            editing: false,
            device: 'desktop',
            newDef: this.props.newDef,
            def: {...this.props.def}
        }
    }

    handleSave = () => {
        const {def} = this.state;
        // Handle Definition Change.
        this.props.handleDefChange(def);
        // Return editing state to false.
        this.setState({editing: false})
        this.setState({newDef: false})
    }

    handleDefChange = (field) => (e) => {
        const newValue = e.target.value;
        const previousDef = this.state.def;
        const device = field.split('-')[0];
        const deviceField = field.split('-')[1];
        let updatedDef = [];
        switch (device) {
            case 'desktop':
            case 'tablet':
            case 'mobile':
                updatedDef = update(previousDef, {
                    [device]: {
                        [deviceField]: {
                            $set: newValue
                        }
                    }
                })
                break;
            default:
                updatedDef = update(previousDef, {
                    [field]: {$set: newValue}
                })
                break;
        }
        this.setState({
            def: updatedDef
        })
    }

    handleFamilyDefChange = (e) => {
        const newValue = e;
        const previousDef = this.state.def;
        const updatedDef = update(previousDef, {
            ['family']: {$set: newValue}
        })
        this.setState({
            def: updatedDef
        })
    }

    handleColorDefChange = (e) => {
        const newValue = e;
        const previousDef = this.state.def;
        const updatedDef = update(previousDef, {
            ['color']: {$set: newValue}
        })
        this.setState({
            def: updatedDef
        })
    }

    handleEditToggle = () => {
        this.setState({editing: true})
    }

    renderEdit() {
        const {def} = this.state;
        const family = def.family || '';
        const color = def.color || '';
        const {families, colors} = this.props;
        const {desktop, tablet, mobile} = def;

        return (
            <div className="col col--full typography-definition">
                <div className="type type--edit">
                    <FontAwesomeIcon icon={['fas', 'bars']}/>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={def.name}
                            placeholder="Font Element"
                            onBlur={this.handleDefChange('name')}
                        />
                    </div>
                    <div className="form-group">
                        <TextareaAutosize
                            className="form-control"
                            rows={1}
                            onBlur={this.handleDefChange('note')}
                            defaultValue={def.note}
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
        const {def} = this.state;
        console.log('TypographyDef:renderPreview');
        console.log(def);
        return (
            <TyopgraphyDefPreview {...def} handleEditToggle={this.handleEditToggle}/>
        )
    }

    render() {
        console.log(this.props)
        const {editing, newDef} = this.state;
        console.log(editing || newDef);
        return (
            <React.Fragment>
                {editing || newDef ? this.renderEdit() : this.renderPreview()}
            </React.Fragment>
        )
    }
}

TypographyDef.defaultProps = {
    editing: true,
    device: 'desktop',
    def: {
        id: null,
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

export default TypographyDef;