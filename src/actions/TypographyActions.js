import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';
import {formatProjectPayload} from "../lib/utility";

const { REACT_APP_STYLE_SERVER } = process.env;

export const updateProjectFontFamily = (project, font_type, fonts) => {

    let {id} = project;
    let updated_type = update(project[font_type], {$set: fonts});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({[font_type]: JSON.stringify(updated_type)})
    }).then((res) => {
        let data = res.data;
        return {
            type: 'GET_PROJECT',
            payload: Object.assign({},
                {...data},
                {image_defs: JSON.parse(data.image_defs)},
                {colors_defs: JSON.parse(data.colors_defs)},
                {font_defs: JSON.parse(data.font_defs)},
                {web_fonts: JSON.parse(data.web_fonts)},
                {typekit_fonts: JSON.parse(data.typekit_fonts)},
                {google_fonts: JSON.parse(data.google_fonts)}
            )
        }
    }).catch((err) => {
        console.log(err);
    });
}


export const updateProjectTypography = (project, typography) => {

    let {id} = project;
    let updated_typography = update(project.font_defs, {$set: typography});
    console.log('TypographyActions:updateProjectTypography')
    console.log(updated_typography);

    // return {
    //     type: 'GET_PROJECT',
    //     payload: {}
    // }

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({font_defs: JSON.stringify(updated_typography)})
    }).then((res) => {
        let data = res.data;
        return {
            type: 'GET_PROJECT',
            payload: formatProjectPayload(data)
        }
    }).catch((err) => {
        console.log(err);
    });
}
