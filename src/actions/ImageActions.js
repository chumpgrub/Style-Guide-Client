import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';
import {formatProjectPayload} from "../lib/utility";

const { REACT_APP_STYLE_SERVER } = process.env;

export const updateProjectImages = (project, images) => {

    let {id} = project;
    let updated_images = update(project.image_defs, {$set: images});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({image_defs: JSON.stringify(updated_images)})
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

export const updateProjectImageOrder = (project, images) => {

    let {id} = project;

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({image_defs: JSON.stringify(images)})
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

export const createNewImage = (project, images) => {

    let {id} = project;
    let updated_images = update(project.image_defs, {$set: images});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({image_defs: JSON.stringify(updated_images)})
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
