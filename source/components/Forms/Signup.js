// Core
import React, { Component } from 'react';
import { Form, Errors } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateEmail, validateLength } from 'instruments/validators';

// Components
import { Input } from 'components';

export default class SignupForm extends Component {
    _handleSubmit = (user) => {
        this.props.signup(user);
    };

    render () {
        const { isAuthFetching } = this.props;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: isAuthFetching,
        });

        const buttonStyle = cx(Styles.signupSubmit, {
            [Styles.disabledButton]: isAuthFetching,
        });

        return (
            <Form
                className = { Styles.form }
                model = 'forms.signup'
                onSubmit = { this._handleSubmit }>
                <Errors
                    messages = { {
                        valid:
                            'Your first name should be at least 1 symbol long',
                    } }
                    model = 'forms.signup.firstName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { isAuthFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (firstName) => validateLength(firstName, 1),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.signup.firstName'
                    model = 'forms.signup.firstName'
                    placeholder = 'First name'
                    type = 'text'
                />
                <Errors
                    messages = { {
                        valid:
                            'Your last name should be at least 1 symbol long',
                    } }
                    model = 'forms.signup.lastName'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { isAuthFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (lastName) => validateLength(lastName, 1),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.signup.lastName'
                    model = 'forms.signup.lastName'
                    placeholder = 'Last name'
                    type = 'text'
                />
                <Errors
                    messages = { {
                        valid: 'Please provide a valid email',
                    } }
                    model = 'forms.signup.email'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { isAuthFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (email) => !validateEmail(email),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.signup.email'
                    model = 'forms.signup.email'
                    placeholder = 'Email'
                    type = 'text'
                />
                <Errors
                    messages = { {
                        valid: `A password should be at least 5 symbols long`,
                    } }
                    model = 'forms.signup.password'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { isAuthFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (password) => validateLength(password, 5),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.signup.password'
                    model = 'forms.signup.password'
                    placeholder = 'Password'
                    type = 'password'
                />
                <Errors
                    messages = { {
                        valid: `An invite key should be 12 symbols long`,
                    } }
                    model = 'forms.signup.invite'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Input
                    disabled = { isAuthFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (invite) => validateLength(invite, 12, 12),
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.signup.invite'
                    model = 'forms.signup.invite'
                    placeholder = 'Invite key'
                    type = 'password'
                />
                <button
                    className = { buttonStyle }
                    disabled = { isAuthFetching }
                    type = 'submit'>
                    {isAuthFetching ? 'Working...' : 'Create Account'}
                </button>
            </Form>
        );
    }
}
