// Core
import actions from './';

const user = {
    id:        '',
    groupId:   '',
    token:     '',
    created:   0,
    avatar:    '',
    firstName: '',
    lastName:  '',
    email:     ''
};
const message = 'message';

describe('auth actions:', () => {
    test(`'login' action creator should produce a corresponding action`, () => {
        expect(actions.login(user)).toMatchSnapshot();
    });
    test(`'loginSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.loginSuccess()).toMatchSnapshot();
    });
    test(`'loginFail' action creator should produce a corresponding action`, () => {
        expect(actions.loginFail(message)).toMatchSnapshot();
    });
    test(`'signup' action creator should produce a corresponding action`, () => {
        expect(actions.signup(user)).toMatchSnapshot();
    });
    test(`'signupSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.signupSuccess()).toMatchSnapshot();
    });
    test(`'signupFail' action creator should produce a corresponding action`, () => {
        expect(actions.signupFail(message)).toMatchSnapshot();
    });
    test(`'logout' action creator should produce a corresponding action`, () => {
        expect(actions.logout()).toMatchSnapshot();
    });
    test(`'logoutSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.logoutSuccess()).toMatchSnapshot();
    });
    test(`'logoutFail' action creator should produce a corresponding action`, () => {
        expect(actions.logoutFail(message)).toMatchSnapshot();
    });
});
