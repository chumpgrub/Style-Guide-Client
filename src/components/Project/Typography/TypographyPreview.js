import React, {Component} from 'react';

import TypeKitFonts from '../../Fonts/TypeKitFonts';
import GoogleFonts from '../../Fonts/GoogleFonts';
import WebSafeFonts from '../../Fonts/WebSafeFonts';

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

class TypographyPreview extends Component {

    renderPreview() {
        let {fonts} = this.props;
        return (
            <div>
                {fonts ? fonts.map((font) => {
                    return (
                        <TypographyDefinition key={font.id} font={font}/>
                    )
                }) : ''}
            </div>
        )
    }

    renderEdit() {
        return (
            <div className="col col--full font-sources">
                {/*<div className="row">*/}
                    {/*<div className="col font-source">*/}
                        {/*<h3>Typekit Fonts</h3>*/}
                        {/*<TypeKitFonts fonts={[]}/>*/}
                    {/*</div>*/}
                    {/*<div className="col font-source">*/}
                        {/*<h3>Google Fonts</h3>*/}
                        {/*<GoogleFonts fonts={[]}/>*/}
                    {/*</div>*/}
                    {/*<div className="col font-source">*/}
                        {/*<h3>Web Safe Fonts</h3>*/}
                        {/*<WebSafeFonts fonts={[]}/>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }

    render() {
        let {editing} = this.props;
        return (
            <section className="definitions definition--typography">
                <h2 className="definition-title">Typography</h2>
                <div className="row project-typography">
                    {editing ? this.renderEdit() : this.renderPreview()}
                </div>
            </section>
        )
    }
}

const FontsPreview = ({fonts}) => {
    return (
        <section className="definitions definition--typography">
            <h2 className="definition-title">Typography</h2>
            <div className="row project-typography">
                {fonts ? fonts.map((font) => {
                    return (
                        <TypographyDefinition key={font.id} font={font}/>
                    )
                }) : ''}
            </div>
        </section>
    )
}

export default TypographyPreview;