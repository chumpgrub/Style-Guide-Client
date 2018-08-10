import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';

const url = 'http://style-server.markfurrow.com/api';

export const updateProjectImages = (project, images) => {

    let {id} = project;
    let updated_images = update(project.image_defs, {$set: images});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
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

export const updateProjectImageOrder = (project, images) => {

    let {id} = project;

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
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
