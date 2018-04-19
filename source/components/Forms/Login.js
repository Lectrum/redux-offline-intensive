// Core
import React, { Component } from 'react';
import { Form, Errors, Control } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateEmail, validateLength } from 'instruments/validators';

// Components
import { Input } from 'components';

export default class LoginForm extends Component {
    _handleSubmit = (user) => {
        this.props.login(user);
    };

    render () {
        const { isAuthFetching } = this.props;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: isAuthFetching,
        });

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isAuthFetching,
        });

        return (
            <Form
                className = { Styles.form }
                model = 'forms.login'
                onSubmit = { this._handleSubmit }>
                <Errors
                    messages = { {
                        valid: 'An email should a have a valid shape',
                    } }
                    model = 'forms.login.email'
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
                    id = 'forms.login.email'
                    model = 'forms.login.email'
                    placeholder = 'Email'
                />
                <Errors
                    messages = { {
                        valid: () =>
                            `A password should be at least 5 symbols long`,
                    } }
                    model = 'forms.login.password'
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
                    id = 'forms.login.password'
                    model = 'forms.login.password'
                    placeholder = 'Password'
                    type = 'password'
                />
                <label>
                    <Control.checkbox
                        id = 'forms.login.remember'
                        model = 'forms.login.remember'
                        type = 'checkbox'
                    />
                    Remember me?
                </label>
                <button
                    className = { buttonStyle }
                    disabled = { isAuthFetching }
                    type = 'submit'>
                    {isAuthFetching ? 'Working...' : 'Log In'}
                </button>
            </Form>
        );
    }
}
