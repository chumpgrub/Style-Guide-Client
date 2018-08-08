import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';

// const url = 'https://styleguide-backend.local/api';
const url = 'http://style-server.markfurrow.com/api';

export function getProjects() {
    return axios.get(`${url}/projects`, {crossdomain: true}).then((res) => {
        let data = res.data;
        console.log(res);
        return {
            type: 'GET_PROJECTS',
            payload: data
        }
    }).catch((err) => {
        console.log(err);
    });
}

/**
 * Get Single Project Data By ID.
 * @param id
 * @returns {Promise<{type: string, payload: any}>}
 * @todo See if there's a better way to parse string to JSON...
 */
export function getProject(id) {

    return axios.get(`${url}/projects/${id}`, {crossdomain: true}).then((res) => {
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

export function updateProjectColorOrder(project, colors) {

    let {id} = project;

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(colors)})
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

export function updateProjectColors(project, colors) {

    let {id} = project;
    let updated_colors = update(project.colors_defs, {$set: colors});

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(updated_colors)})
    }).then((res) => {
        console.log('ACTION: COLOR DEFINITION UPDATE');
        console.log(res);
        let data = res.data;
        return {
            type: 'GET_PROJECT',
            // type: 'UPDATE_COLOR',
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


    return {
        type: 'UPDATE_COLOR',
        payload: {}
    }
}

export function createNewColor(project, color) {

    let {id} = project;
    let updated_colors = update(project.colors_defs, {
        $push: [color]
    });

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(updated_colors)})
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

export function updateProjectTitle(project, title) {

    let {id} = project;
    let updated_title = update(project.name, {$set: title});
    console.log(project.name);
    console.log(updated_title);

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
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

export function updateProjectNote(project, notes) {

    let {id} = project;
    let updated_notes = update(project.notes, {$set: notes});

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
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

export function updateProjectImages(project, images) {

    let {id} = project;
    let updated_images = update(project.image_defs, {$set: images});

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({image_defs: JSON.stringify(updated_images)})
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

export function updateProjectImageOrder(project, images) {

    let {id} = project;

    return axios({
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: `${url}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({image_defs: JSON.stringify(images)})
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
