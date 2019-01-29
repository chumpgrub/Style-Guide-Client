import React from 'react';

const TypographyDefPreview = (props) => {
    console.log('TypographyDefPreview');
    console.log(props);
    return (
        <div className="col col--full typography-definition"
            onClick={props.handleEditToggle}>
            <div className="type type--preview">
                {props.name && props.name}
                {(props.name && props.family.name) && `/` + props.family.name}
                {(props.name || props.family.name) && ` - ` + props.size}
                {/*{props.name}/{props.family.name} - {props.size}px/{props.lineheight}px*/}
            </div>
        </div>
    )
}

export default TypographyDefPreview;