// Core
import { combineForms } from 'react-redux-form';

export default combineForms(
    {
        login: {
            email:    '',
            password: ''
        },
        signup: {
            firstName: '',
            lastName:  '',
            email:     '',
            password:  '',
            invite:    ''
        },
        user: {
            profile: {
                firstName: '',
                lastName:  '',
                avatar:    []
            },
            password: {
                oldPassword: '',
                newPassword: ''
            }
        }
    },
    'forms'
);
