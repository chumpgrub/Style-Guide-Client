import React, {Component} from 'react';
import Select from 'react-select';
import TextareaAutosize from 'react-autosize-textarea';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getNextAvailableId} from '../../../lib/utility'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import TypographyDef from './TypographyDef';

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

const TypographyDefinition = ({font}) => {
    const styles = {
        fontSize: font.size.trim() + 'px',
        lineHeight: font.lineheight / font.size
    }
    return (
        <div className="col col--full typography-definition">
            <div style={styles}>
                {font.device}: {font.name}/{font.family} - {font.size.trim()}px/{font.lineheight}px
            </div>
        </div>
    )
}

const TypographyEdit = ({elem, families, colors, handleDefChange}) => {
    return (
        <div className="col col--full typography-definition">
            <div className="type type--edit">
                <FontAwesomeIcon icon={['fas', 'bars']}/>
                <h3>{elem.name}</h3>
                <div className="defs">
                    <TextareaAutosize
                        rows={1}
                        onBlur={(e) => handleDefChange('note', elem, e)}
                        placeholder="Details, here..."
                    />
                </div>
                <div className="defs defs--global">
                    <h4>Global</h4>
                    <div className="def def--font-family">
                        <label>Font Family</label>
                        <Select
                            getOptionValue={(option) => option.slug}
                            getOptionLabel={(option) => option.name}
                            styles={{menu: (base) => ({...base, zIndex: 100})}}
                            options={families}
                            backspaceRemovesValue
                            // value={this.state.value}
                            onChange={(e) => handleDefChange('family', elem, e)}
                        />
                    </div>
                    <div className="def def--font-color">
                        <label>Font Color</label>
                        <Select
                            getOptionValue={(option) => option.value}
                            getOptionLabel={(option) => option.name}
                            components={{Option: CustomOption}}
                            styles={{menu: (base) => ({...base, zIndex: 100})}}
                            options={colors}
                            backspaceRemovesValue
                            // value={this.state.value}
                            onChange={(e) => handleDefChange('color', elem, e)}
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
                            <div className={`form-element form-element--half`}>
                                <input
                                    type="text"
                                    name="name"
                                />
                                <label htmlFor="name">Size</label>
                            </div>
                            <div className={`form-element form-element--half`}>
                                <input
                                    type="text"
                                    name="name"
                                />
                                <label htmlFor="name">Line Height</label>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {elem.name} - Tablet
                    </TabPanel>
                    <TabPanel>
                        {elem.name} - Mobile
                    </TabPanel>
                </Tabs>
                <div className="form-row form-row--actions">
                    <button>Done</button>
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

const AddTypographyDefinitions = () => {
    return(
        <div className="col">Add some definitions</div>
    )
}

class TypographyPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            defs: null
        }
    }

    handleDefChange = (def) => {
        console.log('TypographyPreview::handleDefChange')
        console.log(def);
        // 
        const previousDefs = this.state.defs || [];
        console.log('--> previousDefs')
        console.log(previousDefs)
        const updatedDefs = [
            ...previousDefs,
            {...def}
        ]
        console.log(updatedDefs)
        this.setState({
            defs: updatedDefs
        })
        this.props.handleTypographyChange(updatedDefs)
    }

    handleNewDef = () => {
        const previousDef = this.state.defs || [];
        let nextID = 1;
        if ( previousDef.length > 0 ) {
            nextID = getNextAvailableId(previousDef)
        }

        const updatedDef = [
            ...previousDef,
            {
                id: nextID,
                newDef : true
            }
        ]
        this.setState({
            defs: updatedDef
        })
    }

    renderPreview() {
        let {fonts} = this.props;
        return (
            <div className="row project-typography">
                {fonts ? fonts.map((font) => {
                    return (
                        <TypographyDefinition key={font.id} font={font}/>
                    )
                }) : ''}
            </div>
        )
    }

    renderEdit() {

        const {defs} = this.state;
        const {families, colors} = this.props;

        return (
            <React.Fragment>
                <div className="row project-typography">
                    {defs && defs.map( (def, index) =>
                        <TypographyDef
                            key={index}
                            {...def}
                            colors={colors}
                            families={families}
                            handleDefChange={this.handleDefChange}
                        />
                    ) }
                </div>
                <div className="d-flex add-typography">
                    <button onClick={() => this.handleNewDef()}>Add Definition</button>
                </div>
            </React.Fragment>
        )
    }

    render() {
        let {editing} = this.props;
        return (
            <section className="definitions definition--typography">
                <h2 className="definition-title">Typography</h2>
                {editing ? this.renderEdit() : this.renderPreview()}
            </section>
        )
    }
}

export default TypographyPreview;