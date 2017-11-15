// Core
import React from 'react';
import { string } from 'prop-types';
import { Control } from 'react-redux-form';

const Input = (props) => (
    <Control
        { ...props }
        mapProps = { {
            className: ({
                fieldValue: { submitFailed, touched, errors: { valid }}
            }) =>
                !valid
                    ? props.disabledstyle
                    : submitFailed || touched && valid
                        ? props.errorstyle
                        : props.disabledstyle
        } }
    />
);

Input.propTypes = {
    disabledstyle: string.isRequired,
    errorstyle:    string.isRequired
};

export default Input;
