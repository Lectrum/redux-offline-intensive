// Core
import React from 'react';
import { Control } from 'react-redux-form';

const Input = (props) => (
    <Control
        { ...props }
        mapProps = { {
            className: ({
                fieldValue: { submitFailed, touched, errors: { valid }},
            }) =>
                !valid
                    ? props.disabledstyle
                    : submitFailed || touched && valid
                        ? props.errorstyle
                        : props.disabledstyle,
        } }
    />
);

export default Input;
