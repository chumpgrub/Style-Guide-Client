import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Projects}/>
            <Route path="/project/new" exact component={() => {
                return (
                    <Project editing={true} />
                )
            }}/>
            <Route path="/project/:id" exact render={({match}) => {
                return (
                    <Project editing={false} match={match}/>
                )
            }}/>
            <Route path="/project/:id/edit" exact render={({match}) => {
                return (
                    <Project editing={true} match={match}/>
                )
            }}/>
        </Switch>
    )
}

export default Routes;
