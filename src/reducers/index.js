import {combineReducers} from 'redux';
import projects from './ProjectsReducer';
import project from './ProjectReducer';
import fonts from './FontsReducer';
import colors from './ColorsReducer';
import images from './ImagesReducer';

const rootReducer = combineReducers({
    projects,
    project,
    fonts,
    colors,
    images
});

export default rootReducer;
