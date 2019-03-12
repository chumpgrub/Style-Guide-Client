import React from 'react';
import TypeAttributes from './TypeAttributes'

const TypographyPreview = (props) => {

    let globalStyles = {
        fontFamily: `"${props.family.slug}"`,
        fontWeight: props.devices.desktop.weight,
        fontSize: props.devices.desktop.size,
        letterSpacing: props.devices.desktop.letterspacing,
        lineHeight: props.devices.desktop.lineheight,
    }

    const {devices} = props
    const devicesObj = new Map()
    devicesObj.set('desktop', devices.desktop)
    devicesObj.set('tablet', devices.tablet)
    devicesObj.set('mobile', devices.mobile)

    const preview = []
    return (
        <div className="typography-definition">
            <div className="type">
                <div className="type__element" style={globalStyles}>{props.name}</div>
                {/*<div className="type__font-family">{props.family.name}</div>*/}
                <div className="d-none type__sample">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
                    abcdefghijklmnopqrstuvwxyz<br/>
                    1234567890(,.;:?!$&amp;*)
                </div>
                <TypeAttributes {...props} />
                {(() => {
                    for (const [key, device] of devicesObj.entries()) {
                        let localStyles = {
                            fontWeight: device.weight,
                            fontSize: device.size,
                            letterSpacing: device.letterspacing,
                            lineHeight: device.lineheight
                        }
                        preview.push(
                            <div key={key} style={localStyles} className={`type--` + key}>
                            </div>
                        )
                    }
                    return preview
                })()}
            </div>
        </div>
    )
}

export default TypographyPreview;