// Core
import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import authActions from 'actions/auth';

// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import SignupForm from 'components/Forms/Signup';

class Signup extends Component {
    static propTypes = {
        authFetching: bool.isRequired,
        signup:       func.isRequired
    };

    render () {
        const { authFetching, signup } = this.props;

        return [
            <Spinner key = '0' spin = { authFetching } />,
            <Navigation key = '1' />,
            <Catcher key = '2'>
                <SignupForm authFetching = { authFetching } signup = { signup } />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ auth, ui }) => ({
    authenticated: auth.get('authenticated'),
    authFetching:  ui.get('authFetching')
});

const mapDispatchToProps = (dispatch) => ({
    signup: bindActionCreators(authActions.signup, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
