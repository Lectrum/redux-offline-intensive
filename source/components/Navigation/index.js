// Coret
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { book } from 'navigation/book';

export default class Navigation extends Component {
    _getNavigation = () => {
        const { isAuthenticated, profile } = this.props;

        return isAuthenticated ?
            <>
                <NavLink activeClassName = { Styles.active } to = { book.profile }>
                    <img src = { profile.get('avatar') } />
                    {profile.get('firstName')}
                </NavLink>
                <NavLink activeClassName = { Styles.active } to = { book.feed }>
                    Feed
                </NavLink>
                <button onClick = { this._logout }>Log Out</button>
            </>
            :
            <>
                <NavLink activeClassName = { Styles.active } to = { book.login }>
                    Log In
                </NavLink>
                <NavLink activeClassName = { Styles.active } to = { book.signUp }>
                    Sign Up
                </NavLink>
            </>
        ;
    };

    _logout = () => {
        this.props.logout();
    };

    render () {
        const { isOnline } = this.props;
        const navigation = this._getNavigation();
        const statusStyle = cx(Styles.status, {
            [Styles.online]:  isOnline,
            [Styles.offline]: !isOnline,
        });

        return (
            <section className = { Styles.navigation }>
                <div className = { statusStyle }>
                    <div>{isOnline ? 'Online' : 'Offline'}</div>
                    <span />
                </div>
                {navigation}
            </section>
        );
    }
}
