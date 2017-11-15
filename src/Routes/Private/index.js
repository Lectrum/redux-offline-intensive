// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Instruments
import pages from 'Routes/pages';

// Containers
import Feed from 'containers/Feed';
import Profile from 'containers/Profile';
import NewPassword from 'containers/NewPassword';

export default class Private extends Component {
    render () {
        return (
            <Switch>
                <Route component = { Feed } path = { pages.feed } />
                <Route component = { Profile } path = { pages.profile } />
                <Route component = { NewPassword } path = { pages['new-passowrd'] } />
                <Redirect to = { pages.feed } />
            </Switch>
        );
    }
}
