// Core
import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { Form, Errors } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import { validateEmail, validateLength } from 'instruments/validators';

// Components
import Input from 'components/Input';

export default class LoginForm extends Component {
    static propTypes = {
        authFetching: bool.isRequired,
        login:        func.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
    }

    _handleSubmit (user) {
        this.props.login(user);
    }

    render () {
        const { authFetching } = this.props;

        const disabledInputStyle = cx({
            [Styles.disabledInput]: authFetching
        });

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: authFetching
        });

        return (
            <Form
                className = { Styles.form }
                model = 'forms.login'
                onSubmit = { this.handleSubmit }>
                <Errors
                    messages = { {
                        valid: 'An email should a have a valid shape'
                    } }
                    model = 'forms.login.email'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid }
                />
                <Input
                    disabled = { authFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (email) => !validateEmail(email)
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.login.email'
                    model = 'forms.login.email'
                    placeholder = 'Email'
                />
                <Errors
                    messages = { {
                        valid: () =>
                            `A password should be at least 5 symbols long`
                    } }
                    model = 'forms.login.password'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid }
                />
                <Input
                    disabled = { authFetching }
                    disabledstyle = { disabledInputStyle }
                    errors = { {
                        valid: (password) => validateLength(password, 5)
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.login.password'
                    model = 'forms.login.password'
                    placeholder = 'Password'
                    type = 'password'
                />
                <button
                    className = { buttonStyle }
                    disabled = { authFetching }
                    type = 'submit'>
                    {authFetching ? 'Working...' : 'Log In'}
                </button>
            </Form>
        );
    }
}
