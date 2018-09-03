import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';

const { REACT_APP_STYLE_SERVER } = process.env;

/**
 * Get Single Project Data By ID.
 * @param id
 * @returns {Promise<{type: string, payload: any}>}
 * @todo See if there's a better way to parse string to JSON...
 */
export const getProject = (id) => {

    return axios.get(
        `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        {crossdomain: true}
    ).then((res) => {
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

export const updateProjectTitle = (project, title) => {

    let {id} = project;
    let updated_title = update(project.name, {$set: title});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({name: updated_title})
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

export const updateProjectNote = (project, notes) => {

    let {id} = project;
    let updated_notes = update(project.notes, {$set: notes});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({notes: updated_notes})
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
