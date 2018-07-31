const projects = (state = {}, action) => {

    switch (action.type) {
        case 'GET_PROJECTS':
            console.log(action.payload);
            return {...state, projects: action.payload};
        default:
            return state;
    }
}

export default projects;
