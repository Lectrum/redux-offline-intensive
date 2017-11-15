// Core
import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import authActions from 'actions/auth';
import { getAuthenticated } from 'selectors/auth';
import { getAuthFetching } from 'selectors/ui';

// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import LoginForm from 'components/Forms/Login';

class Login extends Component {
    static propTypes = {
        authFetching: bool.isRequired,
        login:        func.isRequired
    };

    render () {
        const { authFetching, login } = this.props;

        return [
            <Spinner key = '0' spin = { authFetching } />,
            <Navigation key = '1' />,
            <Catcher key = '2'>
                <LoginForm authFetching = { authFetching } login = { login } />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ auth, ui }) => ({
    authenticated: getAuthenticated(auth),
    authFetching:  getAuthFetching(ui)
});

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(authActions.login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
