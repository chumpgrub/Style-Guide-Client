import axios from 'axios';

const url = 'http://style-server.markfurrow.com/api';

export const getProjects = () => {

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
