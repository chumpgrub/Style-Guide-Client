import React from 'react';
import TypeKitFonts from './TypeKitFonts';
import GoogleFonts from './GoogleFonts';
import WebSafeFonts from './WebSafeFonts';

const FontFamilies = ({editing, typekit, google, web, handleFontFamilyChange}) => {
    const handleTypeKitChange = (fonts) => {
        let fontData = fonts.map(font => {
            return {
                slug: font.slug,
                name: font.name
            }
        })
        handleFontFamilyChange('typekit_fonts', fontData);
    }
    const handleGoogleChange = (fonts) => {
        console.log(fonts);
        let fontData = fonts.map(font => {
            console.log(font);
            return {
                slug: font.family.replace(/\s+/g, '-').toLowerCase(),
                name: font.family,
                family: font.family
            }
        })
        handleFontFamilyChange('google_fonts', fontData);
    }
    const handleWebFontChange = (fonts) => {
        console.log(fonts);
        handleFontFamilyChange('web_fonts', fonts);
    }
    const fontFamilyPreview = (fonts) => {
        return (
            <ul>
                {
                    fonts.length ? fonts.map(font => (<li>{font.name}</li>)) : (<li>n/a</li>)
                }
            </ul>
        )
    }
    return (
        <section className="definitions definition--font-families">
            <h2 className="definition-title">Font Families</h2>
                <div className="row project-fonts">
                    <div className="col font-source">
                        <h3>Typekit Fonts</h3>
                        {editing ?
                            <TypeKitFonts
                                fonts={typekit}
                                handleChange={handleTypeKitChange}
                            />
                            : fontFamilyPreview(typekit)
                        }
                    </div>
                    <div className="col font-source">
                        <h3>Google Fonts</h3>
                        {editing ?
                            <GoogleFonts
                                fonts={google}
                                handleChange={handleGoogleChange}
                            />
                            : fontFamilyPreview(google)
                        }
                    </div>
                    <div className="col font-source">
                        <h3>Web Safe Fonts</h3>
                        {editing ?
                            <WebSafeFonts
                                fonts={web}
                                handleChange={handleWebFontChange}
                            />
                            : fontFamilyPreview(web)
                        }
                    </div>
                </div>
        </section>
    )
}

export default FontFamilies;