// Core
import React from 'react';
import { Control } from 'react-redux-form';

export const Input = (props) => {
    const { disabledStyle, invalidStyle, ...restProps } = props;

    return (
        <Control.text
            { ...restProps }
            mapProps = {{
                className: (input) => {
                    if (props.disabled) {
                        return disabledStyle;
                    }
                    if (input.fieldValue.touched && !input.fieldValue.valid) {
                        return invalidStyle;
                    }
                },
            }}
        />
    );
};
