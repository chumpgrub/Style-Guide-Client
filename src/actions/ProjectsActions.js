import axios from 'axios';

const { REACT_APP_STYLE_SERVER } = process.env;

export const getProjects = () => {

    return axios.get(`${REACT_APP_STYLE_SERVER}/projects`, {crossdomain: true}).then((res) => {
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
