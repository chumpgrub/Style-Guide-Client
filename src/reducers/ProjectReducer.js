const project = (state = {}, action) => {

    switch (action.type) {
        case 'GET_PROJECT':
            console.log('GET_PROJECT: REDUCER');
            return {...state, ...action.payload};
        case 'NEW_PROJECT':
            console.log('NEW_PROJECT: REDUCER');
            return {...state, ...action.payload};
        case 'RESET_IS_NEW':
            console.log('RESET_IS_NEW: REDUCER');
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default project;
