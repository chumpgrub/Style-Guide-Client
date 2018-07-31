import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import Routes from './Routes';
import reducers from './reducers';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlusCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

// import css
import './styles/css/styles.css';

library.add( faBars, faPlusCircle, faTrashAlt, faTimesCircle, faCircleNotch );

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
