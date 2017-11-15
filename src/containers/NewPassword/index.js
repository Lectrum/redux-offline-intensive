// Core
import React, { Component } from 'react';
import { object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import profileActions from 'actions/profile';
import uiActions from 'actions/ui';
import { getProfileFetching, getPasswordEditing } from 'selectors/ui';

// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import NewPasswordForm from 'components/Forms/NewPassword';

class Profile extends Component {
    static propTypes = {
        actions:         object.isRequired,
        passwordEditing: bool.isRequired,
        profileFetching: bool.isRequired
    };

    render () {
        const { actions, profileFetching, passwordEditing } = this.props;

        return [
            <Spinner key = '0' spin = { profileFetching } />,
            <Navigation key = '1' />,
            <Catcher key = '2'>
                <NewPasswordForm
                    actions = { actions }
                    passwordEditing = { passwordEditing }
                    profileFetching = { profileFetching }
                />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ ui }) => ({
    profileFetching: getProfileFetching(ui),
    passwordEditing: getPasswordEditing(ui)
});

const { startPasswordEditing, stopPasswordEditing } = uiActions;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        { ...profileActions, startPasswordEditing, stopPasswordEditing },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
