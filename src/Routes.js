import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Projects}/>
            <Route path="/project/new" exact render={(props) => {
                return (
                    <Project view="new" {...props} />
                )
            }}/>
            <Route path="/project/:id" exact render={({match}) => {
                return (
                    <Project view="preview" editing={false} match={match}/>
                )
            }}/>
            <Route path="/project/:id/edit" exact render={(props) => {
                return (
                    <Project view="edit" editing={true} {...props}/>
                )
            }}/>
            <Route path="/project/:id/colors" exact render={(props) => {
                return (
                    <Project view="colors" editing={true} {...props}/>
                )
            }}/>
            <Route path="/project/:id/images" exact render={({match}) => {
                return (
                    <Project view="images" editing={true} match={match}/>
                )
            }}/>
            <Route path="/project/:id/typography" exact render={({match}) => {
                return (
                    <Project view="typography" editing={true} match={match}/>
                )
            }}/>
        </Switch>
    )
}

export default Routes;
