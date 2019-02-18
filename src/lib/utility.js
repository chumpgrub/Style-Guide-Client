// export function isE

export const formatProjectPayload = (data) => {
    return Object.assign({},
        {...data},
        {image_defs: JSON.parse(data.image_defs)},
        {colors_defs: JSON.parse(data.colors_defs)},
        {font_defs: JSON.parse(data.font_defs)},
        {web_fonts: JSON.parse(data.web_fonts)},
        {typekit_fonts: JSON.parse(data.typekit_fonts)},
        {google_fonts: JSON.parse(data.google_fonts)}
    )
}

export const getNextAvailableId = (projects) => {
    console.log('getNextAvailableId()')
    console.log(projects)
    if (projects.length > 1) {
        let nextId = projects.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id);
        return nextId + 1;
    } else if (projects.length == 1) {
        return projects[0].id + 1;
    } else {
        return 1;
    }
}

export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

