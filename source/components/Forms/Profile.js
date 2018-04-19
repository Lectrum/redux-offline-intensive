// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Errors, Control } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateLength } from 'instruments/validators';
import { book } from 'navigation/book';

// Components
import { Input } from 'components';

export default class Profile extends Component {
    _getCancelUpdateButton = () => {
        const { isProfileEditing, setProfileEditingState } = this.props;

        return isProfileEditing ? (
            <span
                className = { Styles.cancelUpdate }
                onClick = { () => setProfileEditingState(false) }>
                cancel update
            </span>
        ) : null;
    };

    _getSubmitButton = () => {
        const {
            isProfileFetching,
            isAvatarFetching,
            isProfileEditing,
        } = this.props;

        const disabled = isProfileFetching || isAvatarFetching;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: disabled,
        });

        return isProfileEditing || disabled ? (
            <button className = { buttonStyle } disabled = { disabled } type = 'submit'>
                {disabled ? 'Working...' : 'Update Profile'}
            </button>
        ) : (
            <button
                className = { buttonStyle }
                disabled = { disabled }
                type = 'submit'
                onClick = { this._editProfile }>
                Edit Profile
            </button>
        );
    };

    _editProfile = (event) => {
        event.preventDefault();

        const { setProfileEditingState, isProfileEditing } = this.props;

        isProfileEditing
            ? setProfileEditingState(false)
            : setProfileEditingState(true);
    };

    _handleSubmit = (user) => {
        const {
            setProfileEditingState,
            updateProfile,
            isProfileEditing,
        } = this.props;

        if (isProfileEditing) {
            updateProfile(user);
            setProfileEditingState(false);

            return;
        }

        setProfileEditingState(true);
    };

    render () {
        const { profile, isProfileFetching, isProfileEditing } = this.props;

        const disabled = isProfileFetching || !isProfileEditing;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: disabled,
        });

        const cancelUpdateButton = this._getCancelUpdateButton();
        const submitButton = this._getSubmitButton();

        return (
            <Form
                className = { Styles.form }
                model = 'forms.user.profile'
                onSubmit = { this._handleSubmit }>
                <h1>Welcome, {profile.get('firstName')}</h1>
                <img src = { profile.get('avatar') } />
                <Control.file
                    disabled = { disabled }
                    model = 'forms.user.profile.avatar'
                />
                <Errors
                    messages = { {
                        valid: 'A first name should be at least 1 symbol long',
                    } }
                    model = 'forms.user.profile.firstName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (name) => validateLength(name, 1),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.profile.firstName'
                    model = 'forms.user.profile.firstName'
                    placeholder = 'First name'
                />
                <Errors
                    messages = { {
                        valid: 'A last name should be at least 1 symbol long',
                    } }
                    model = 'forms.user.profile.lastName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (lastName) => validateLength(lastName, 1),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.profile.lastName'
                    model = 'forms.user.profile.lastName'
                    placeholder = 'Last name'
                />
                {submitButton}
                <i>{cancelUpdateButton}</i>
                <Link to = { book.newPassword }>change password →</Link>
            </Form>
        );
    }
}
