import React from 'react';
import {capitalize} from '../../../lib/utility';

const TypeAttributes = (props) => {

    const devices = props.devices;
    const swatchStyles = {
        width: 15,
        height: 15,
        borderRadius: 8,
        display: 'block',
        background: props.color.value
    }

    return (
        <div className="type__attributes">
            <div className="atts atts--general">
                <h6>General</h6>
                <ul>
                    <li><span>Font: </span>{props.family.name}</li>
                    <li className="atts__color">
                        <span>Color: </span>
                        <span className="swatch"
                              style={swatchStyles}
                        ></span>
                        {props.color.value}
                    </li>
                    <li><span>Letter Spacing: </span>{props.letterspacing}</li>
                    <li><span>Line Height: </span>{props.lineheight}</li>
                    <li><span>Weight: </span>{props.weight}</li>
                    <li><span>Margin: </span>{props.margin}</li>
                </ul>
            </div>
            <AttributesByDevice {...devices}/>
        </div>
    )
}

const AttributesByDevice = (devices) => {
    return (
        Object.keys(devices).map((key, index) => {
            const device = devices[key];
            return (
                <div key={index} className={`atts atts--${key}`}>
                    <h6 key={index}>{capitalize(key)}</h6>
                    <ul>
                        <li><span>Size: </span>{device.size}</li>
                        <li><span>Line Height: </span>{device.lineheight}</li>
                        <li><span>Weight: </span>{device.weight}</li>
                        <li><span>Margin: </span>{device.margin}</li>
                    </ul>
                </div>
            )
        })
    )
}



export default TypeAttributes;