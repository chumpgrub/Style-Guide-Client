import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';
import {formatProjectPayload} from "../lib/utility";

const { REACT_APP_STYLE_SERVER } = process.env;

export const updateProjectColorOrder = (project, colors) => {

    let {id} = project;

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(colors)})
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

export const updateProjectColors = (project, colors) => {

    let {id} = project;
    let updated_colors = update(project.colors_defs, {$set: colors});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(updated_colors)})
    }).then((res) => {
        console.log('ACTION: COLOR DEFINITION UPDATE');
        console.log(res);
        let data = res.data;
        return {
            type: 'GET_PROJECT',
            payload: formatProjectPayload(data)
        }
    }).catch((err) => {
        console.log(err);
    });

}

export const createNewColor = (project, colors) => {

    let {id} = project;
    let updated_colors = update(project.colors_defs, {$set: colors});

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${REACT_APP_STYLE_SERVER}/projects/${id}`,
        crossdomain: true,
        data: qs.stringify({colors_defs: JSON.stringify(updated_colors)})
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

