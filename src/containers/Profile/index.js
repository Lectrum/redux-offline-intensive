// Core
import React, { Component } from 'react';
import { object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import uiActions from 'actions/ui';
import profileActions from 'actions/profile';
import {
    getProfileFetching,
    getProfileEditing,
    getAvatarFetching
} from 'selectors/ui';
import { getProfile } from 'selectors/profile';

// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import ProfileForm from 'components/Forms/Profile';

class Profile extends Component {
    static propTypes = {
        actions:         object.isRequired,
        avatarFetching:  bool.isRequired,
        profile:         object.isRequired,
        profileEditing:  bool.isRequired,
        profileFetching: bool.isRequired
    };

    render () {
        const {
            actions,
            profileFetching,
            avatarFetching,
            profileEditing,
            profile
        } = this.props;

        return [
            <Spinner key = '0' spin = { profileFetching || avatarFetching } />,
            <Navigation key = '1' />,
            <Catcher key = '2'>
                <ProfileForm
                    actions = { actions }
                    avatarFetching = { avatarFetching }
                    profile = { profile }
                    profileEditing = { profileEditing }
                    profileFetching = { profileFetching }
                />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ ui, profile }) => ({
    profileFetching: getProfileFetching(ui),
    profileEditing:  getProfileEditing(ui),
    avatarFetching:  getAvatarFetching(ui),
    profile:         getProfile(profile)
});

const { startProfileEditing, stopProfileEditing } = uiActions;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        { ...profileActions, startProfileEditing, stopProfileEditing },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
