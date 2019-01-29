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
    if (projects) {
        let nextId = projects.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id);
        return nextId + 1;
    }
}

