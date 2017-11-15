// Core
import actions from './';

describe('ui actions:', () => {
    test(`'initialize' action creator should produce a corresponding action`, () => {
        expect(actions.initialize()).toMatchSnapshot();
    });
    test(`'startFetchingAuth' action creator should produce a corresponding action`, () => {
        expect(actions.startFetchingAuth()).toMatchSnapshot();
    });
    test(`'stopFetchingAuth' action creator should produce a corresponding action`, () => {
        expect(actions.stopFetchingAuth()).toMatchSnapshot();
    });
    test(`'startFetchingFeed' action creator should produce a corresponding action`, () => {
        expect(actions.startFetchingFeed()).toMatchSnapshot();
    });
    test(`'stopFetchingFeed' action creator should produce a corresponding action`, () => {
        expect(actions.stopFetchingFeed()).toMatchSnapshot();
    });
    test(`'startFetchingProfile' action creator should produce a corresponding action`, () => {
        expect(actions.startFetchingProfile()).toMatchSnapshot();
    });
    test(`'stopFetchingProfile' action creator should produce a corresponding action`, () => {
        expect(actions.stopFetchingProfile()).toMatchSnapshot();
    });
    test(`'startFetchingAvatar' action creator should produce a corresponding action`, () => {
        expect(actions.startFetchingAvatar()).toMatchSnapshot();
    });
    test(`'stopFetchingAvatar' action creator should produce a corresponding action`, () => {
        expect(actions.stopFetchingAvatar()).toMatchSnapshot();
    });
    test(`'startProfileEditing' action creator should produce a corresponding action`, () => {
        expect(actions.startProfileEditing()).toMatchSnapshot();
    });
    test(`'stopProfileEditing' action creator should produce a corresponding action`, () => {
        expect(actions.stopProfileEditing()).toMatchSnapshot();
    });
    test(`'startPasswordEditing' action creator should produce a corresponding action`, () => {
        expect(actions.startPasswordEditing()).toMatchSnapshot();
    });
    test(`'stopPasswordEditing' action creator should produce a corresponding action`, () => {
        expect(actions.stopPasswordEditing()).toMatchSnapshot();
    });
});
