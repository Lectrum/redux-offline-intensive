// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { newPasswordSchema } from '../../instruments';
import { book } from '../../navigation/book';

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

        return (
            <Formik
                initialValues = { {
                    oldPassword: '',
                    newPassword: '',
                } }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const newPasswordFormWrapperStyles = cx(Styles.newPasswordFormWrapper, Styles.wrapper, {
                        [Styles.disabledInput]: isFetching,
                    });
                    const oldPasswordStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.oldPassword && errors.oldPassword,
                    });
                    const newPasswordStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.newPassword && errors.newPassword,
                    });

                    const buttonStyle = cx(Styles.loginSubmit, {
                        [Styles.disabledButton]: isFetching,
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
                } }
                validationSchema = { newPasswordSchema }
                onSubmit = { this._submitPassword }
            />
        );
    }
}
