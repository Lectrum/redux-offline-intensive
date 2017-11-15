// Core
import React, { Component } from 'react';
import { object, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Errors, Control } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import { validateLength } from 'instruments/validators';

// Components
import Input from 'components/Input';

export default class Profile extends Component {
    static propTypes = {
        actions:         object.isRequired,
        avatarFetching:  bool.isRequired,
        profile:         object.isRequired,
        profileEditing:  bool.isRequired,
        profileFetching: bool.isRequired
    };

    constructor () {
        super();

        this.editProfile = ::this._editProfile;
        this.getCancelUpdateButton = ::this._getCancelUpdateButton;
        this.getSubmitButton = ::this._getSubmitButton;
        this.handleSubmit = ::this._handleSubmit;
    }

    _getCancelUpdateButton () {
        const { profileEditing, actions } = this.props;

        return profileEditing ? (
            <span
                className = { Styles.cancelUpdate }
                onClick = { () => actions.stopProfileEditing() }>
                cancel update
            </span>
        ) : null;
    }

    _getSubmitButton () {
        const { profileFetching, avatarFetching, profileEditing } = this.props;

        const disabled = profileFetching || avatarFetching;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: disabled
        });

        return profileEditing || disabled ? (
            <button className = { buttonStyle } disabled = { disabled } type = 'submit'>
                {disabled ? 'Working...' : 'Update Profile'}
            </button>
        ) : (
            <button
                className = { buttonStyle }
                disabled = { disabled }
                type = 'submit'
                onClick = { this.editProfile }>
                Edit Profile
            </button>
        );
    }

    _editProfile (event) {
        const {
            actions: { startProfileEditing, stopProfileEditing },
            profileEditing
        } = this.props;

        event.preventDefault();

        profileEditing ? stopProfileEditing() : startProfileEditing();
    }

    _handleSubmit (user) {
        const {
            actions: { startProfileEditing, stopProfileEditing, updateProfile },
            profileEditing
        } = this.props;

        if (profileEditing) {
            updateProfile(user);
            stopProfileEditing();

            return;
        }

        startProfileEditing();
    }

    render () {
        const {
            profile: { firstName, avatar },
            profileFetching,
            profileEditing
        } = this.props;

        const disabled = profileFetching || !profileEditing;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: disabled
        });

        const cancelUpdateButton = this.getCancelUpdateButton();
        const submitButton = this.getSubmitButton();

        return (
            <Form
                className = { Styles.form }
                model = 'forms.user.profile'
                onSubmit = { this.handleSubmit }>
                <h1>Welcome, {firstName}</h1>
                <img src = { avatar } />
                <Control.file
                    disabled = { disabled }
                    model = 'forms.user.profile.avatar'
                />
                <Errors
                    messages = { {
                        valid:
                            'A first name should be at least 1 symbol long'
                    } }
                    model = 'forms.user.profile.firstName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (name) => validateLength(name, 1)
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.profile.firstName'
                    model = 'forms.user.profile.firstName'
                    placeholder = 'First name'
                />
                <Errors
                    messages = { {
                        valid:
                            'A last name should be at least 1 symbol long'
                    } }
                    model = 'forms.user.profile.lastName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (lastName) => validateLength(lastName, 1)
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.profile.lastName'
                    model = 'forms.user.profile.lastName'
                    placeholder = 'Last name'
                />
                {submitButton}
                <i>{cancelUpdateButton}</i>
                <Link to = '/redux/new-password'>Change password →</Link>
            </Form>
        );
    }
}
