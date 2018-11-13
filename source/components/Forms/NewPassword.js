// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { newPassword } from '../../bus/forms/shapes';
import { book } from '../../routes/book';

export class NewPasswordForm extends Component {
    static defaultProps = {
        // State
        isFetching: false,

        // Actions
        updatePasswordAsync: () => {},
    };

    _submitPassword = (passwordData) => {
        const { updatePasswordAsync } = this.props;

        updatePasswordAsync(passwordData);
    };

    _getFormMarkup = (formikProps) => {
        const { isFetching } = this.props;
        const { isValid, touched, errors } = formikProps;

        const newPasswordFormWrapperStyles = cx(
            Styles.newPasswordFormWrapper,
            Styles.wrapper,
            {
                [ Styles.disabledInput ]: isFetching,
            },
        );
        const oldPasswordStyle = cx({
            [ Styles.invalidInput ]:
                !isValid && touched.oldPassword && errors.oldPassword,
        });
        const newPasswordStyle = cx({
            [ Styles.invalidInput ]:
                !isValid && touched.newPassword && errors.newPassword,
        });

        const buttonStyle = cx(Styles.loginSubmit, {
            [ Styles.disabledButton ]: isFetching,
        });
        const buttonMessage = isFetching ? 'Загрузка...' : 'Сменить пароль';

        return (
            <Form className = { Styles.form }>
                <div className = { newPasswordFormWrapperStyles }>
                    <div>
                        <Field
                            className = { oldPasswordStyle }
                            disabled = { isFetching }
                            name = 'oldPassword'
                            placeholder = 'Старый пароль'
                            type = 'password'
                        />
                        <Field
                            className = { newPasswordStyle }
                            disabled = { isFetching }
                            name = 'newPassword'
                            placeholder = 'Новый пароль'
                            type = 'password'
                        />
                        <button
                            className = { buttonStyle }
                            disabled = { isFetching }
                            type = 'submit'
                            onClick = { this._changePassword }>
                            {buttonMessage}
                        </button>
                    </div>
                    <Link to = { book.profile }>← назад</Link>
                </div>
            </Form>
        );
    };

    render() {
        return (
            <Formik
                initialValues = { newPassword.shape }
                render = { this._getFormMarkup }
                validationSchema = { newPassword.schema }
                onSubmit = { this._submitPassword }
            />
        );
    }
}
