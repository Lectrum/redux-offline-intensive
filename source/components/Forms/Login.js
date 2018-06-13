// Core
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateEmail, validateLength } from '../../instruments/validators';

// Components
import { Input } from '../../components';

export default class LoginForm extends Component {
    static defaultProps = {
        // State
        isFetching: false,

        // Actions
        loginAsync: () => {},
    };

    _submitLoginForm = (credentials) => {
        this.props.loginAsync(credentials);
    };

    render () {
        const { isFetching } = this.props;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isFetching,
        });

        const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered);

        return (
            <Form
                className = { Styles.form }
                model = 'forms.login'
                onSubmit = { this._submitLoginForm }>
                <div className = { centeredWrapperStyle }>
                    <div>
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.login.email'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.login.email'
                            placeholder = 'Почта'
                            validators = { {
                                valid: (email) => validateEmail(email),
                            } }
                        />
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.login.password'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.login.password'
                            placeholder = 'Пароль'
                            type = 'password'
                            validators = { {
                                valid: (password) => !validateLength(password, 5),
                            } }
                        />
                        <label className = { Styles.rememberMe }>
                            <Control.checkbox
                                id = 'forms.login.remember'
                                model = 'forms.login.remember'
                                type = 'checkbox'
                            />
                            Запомнить меня
                        </label>
                        <button
                            className = { buttonStyle }
                            disabled = { isFetching }
                            type = 'submit'>
                            {isFetching ? 'Загрузка...' : 'Войти'}
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}
