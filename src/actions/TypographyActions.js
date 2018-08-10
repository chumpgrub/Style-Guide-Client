import axios from 'axios';
import qs from 'qs';
import update from 'immutability-helper';

const url = 'http://style-server.markfurrow.com/api';

export const updateProjectFontFamily = (project, font_type, fonts) => {

    console.log(fonts);
    let {id} = project;
    // let updated_typekit = update(project, {
    //     [font_type]: {$set: fonts}
    // });
    let updated_type = update(project[font_type], {$set: fonts});
    console.log(updated_type);
    console.log(qs.stringify({[font_type]: JSON.stringify(updated_type)}));
    // console.log(qs.stringify({typekit_fonts: updated_typekit}));
    // return '';

    return axios({
        method: 'PUT',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: `${url}/projects/${id}`,
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
