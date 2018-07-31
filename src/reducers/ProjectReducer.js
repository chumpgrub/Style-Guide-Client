const projects = (state = {}, action) => {

    switch (action.type) {
        case 'GET_PROJECT':
            console.log('GET_PROJECT: REDUCER');
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default projects;
