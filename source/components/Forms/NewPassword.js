// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Errors } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateLength } from 'instruments/validators';
import { book } from 'navigation/book';

// Components
import { Input } from 'components';

export default class Profile extends Component {
    _getCancelUpdateButton = () => {
        const { isPasswordEditing, setPasswordEditingState } = this.props;

        return isPasswordEditing ? (
            <span
                className = { Styles.cancelUpdate }
                onClick = { () => setPasswordEditingState(false) }>
                cancel update
            </span>
        ) : null;
    };

    _getSubmitButton = () => {
        const { isProfileFetching, isPasswordEditing } = this.props;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isProfileFetching,
        });

        return isPasswordEditing ? (
            <button
                className = { buttonStyle }
                disabled = { isProfileFetching }
                type = 'submit'>
                {isProfileFetching ? 'Working...' : 'Update Password'}
            </button>
        ) : (
            <button
                className = { buttonStyle }
                disabled = { isProfileFetching }
                type = 'submit'
                onClick = { this._changePassword }>
                Change Password
            </button>
        );
    };

    _changePassword = (event) => {
        const { setPasswordEditingState, isPasswordEditing } = this.props;

        event.preventDefault();

        isPasswordEditing
            ? setPasswordEditingState(false)
            : setPasswordEditingState(true);
    };

    _handleSubmit = (user) => {
        const {
            setPasswordEditingState,
            updateProfile,
            isPasswordEditing,
        } = this.props;

        if (isPasswordEditing) {
            updateProfile(user);
            setPasswordEditingState(false);

            return;
        }

        setPasswordEditingState(true);
    };

    render () {
        const { isProfileFetching, isPasswordEditing } = this.props;

        const disabled = isProfileFetching || !isPasswordEditing;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: disabled,
        });

        const submitButton = this._getSubmitButton();
        const cancelUpdateButton = this._getCancelUpdateButton();

        return (
            <Form
                className = { Styles.form }
                key = '1'
                model = 'forms.user.password'
                onSubmit = { this._handleSubmit }>
                <Errors
                    messages = { {
                        valid: () =>
                            `A password should be at least 5 symbols long`,
                    } }
                    model = 'forms.user.password.oldPassword'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (password) => validateLength(password, 5),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.password.oldPassword'
                    model = 'forms.user.password.oldPassword'
                    placeholder = 'Old password'
                    type = 'password'
                />
                <Errors
                    messages = { {
                        valid: () =>
                            `A password should be at least 5 symbols long`,
                    } }
                    model = 'forms.user.password.newPassword'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { disabled }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (password) => validateLength(password, 5),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.user.password.newPassword'
                    model = 'forms.user.password.newPassword'
                    placeholder = 'New password'
                    type = 'password'
                />
                {submitButton}
                <i>{cancelUpdateButton}</i>
                <Link to = { book.profile }>← back</Link>
            </Form>
        );
    }
}
