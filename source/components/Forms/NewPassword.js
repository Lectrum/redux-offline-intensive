// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { validateLength } from '../../instruments/validators';
import { book } from '../../navigation/book';

// Components
import { Input } from '../../components';

export default class NewPassword extends Component {
    static defaultProps = {
        // State
        isFetching: false,

        // Actions
        updatePasswordAsync: () => {},
    };

    _submitPassword = (newPassword) => {
        const { updatePasswordAsync } = this.props;

        updatePasswordAsync(newPassword);
    };

    render () {
        const { isFetching } = this.props;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isFetching,
        });

        const newPasswordFormWrapperStyles = cx(
            Styles.newPasswordFormWrapper,
            Styles.wrapper,
        );

        return (
            <Form
                className = { Styles.form }
                model = 'forms.user.password'
                onSubmit = { this._submitPassword }>
                <div className = { newPasswordFormWrapperStyles }>
                    <div>
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.user.password.oldPassword'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.user.password.oldPassword'
                            placeholder = 'Старый пароль'
                            type = 'password'
                            validators = { {
                                valid: (password) => !validateLength(password, 5),
                            } }
                        />
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.user.password.newPassword'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.user.password.newPassword'
                            placeholder = 'Новый пароль'
                            type = 'password'
                            validators = { {
                                valid: (password) => !validateLength(password, 5),
                            } }
                        />
                        <button
                            className = { buttonStyle }
                            disabled = { isFetching }
                            type = 'submit'
                            onClick = { this._changePassword }>
                            {isFetching ? 'Загрузка...' : 'Сменить пароль'}
                        </button>
                    </div>
                    <Link to = { book.profile }>← назад</Link>
                </div>
            </Form>
        );
    }
}
