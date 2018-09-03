import React, {Component} from 'react';
import Select from 'react-select';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TypograhyElements = [
    {
        selector: 'h1',
        name: 'Headline 1'
    },
    {
        selector: 'h2',
        name: 'Headline 2'
    },
    {
        selector: 'h3',
        name: 'Headline 3'
    },
    {
        selector: 'h4',
        name: 'Headline 4'
    },
    {
        selector: 'h5',
        name: 'Headline 5'
    },
    {
        selector: 'h6',
        name: 'Headline 6'
    },
    {
        selector: 'body',
        name: 'Body'
    }
];

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
    console.log(font);
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

const TypographyEdit = ({elem, families, colors}) => {
    return (
        <div className="col col--full typography-definition">
            <div className="type type--edit">
                <h3>{elem.name}</h3>
                <div className="defs defs--global">
                    <h4>Global</h4>
                    <div className="def def--font-family">
                        <label>Font Family</label>
                        <Select
                            getOptionValue={(option) => option.slug}
                            getOptionLabel={(option) => option.name}
                            styles={{ menu: (base) => ({ ...base, zIndex: 100 }) }}
                            options={families}
                            backspaceRemovesValue
                            // value={this.state.value}
                            // onChange={this.onChange}
                        />
                    </div>
                    <div className="def def--font-color">
                        <label>Font Color</label>
                        <Select
                            getOptionValue={(option) => option.value}
                            getOptionLabel={(option) => option.name}
                            components={{ Option: CustomOption }}
                            styles={{ menu: (base) => ({ ...base, zIndex: 100 }) }}
                            options={colors}
                            backspaceRemovesValue
                            // value={this.state.value}
                            // onChange={this.onChange}
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
            </div>
        </div>
    )
}

class TypographyPreview extends Component {

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
        let {families, colors} = this.props;
        return (
            <div className="row project-typography">
                {TypograhyElements.map((elem, index) => {
                    return (
                        <TypographyEdit
                            key={index}
                            elem={elem}
                            families={families}
                            colors={colors}
                        />
                    )
                })}
            </div>
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