// Core
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Composer from './';

configure({ adapter: new Adapter() });

const options = {
    firstName: 'Brad',
    avatar:    'random avatar url'
};

const props = {
    createPost: jest.fn()
};

const message = 'Merry christmas!';
const state = {
    comment:           '',
    avatarBorderColor: '#90949C'
};
const mutatedState = {
    comment:           message,
    avatarBorderColor: '#90949C'
};

const result = mount(<Composer { ...props } />, {
    context: options
});

describe('Composer component:', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Should have 1 \'form\' element', () => {
        expect(result.find('form').length).toBe(1);
    });

    test('Should have 1 \'textarea\' element', () => {
        expect(result.find('textarea').length).toBe(1);
    });

    test('Should have 1 \'input\' element', () => {
        expect(result.find('input').length).toBe(1);
    });

    test('Should have 1 \'img\' element', () => {
        expect(result.find('img').length).toBe(1);
    });

    test('Should have valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('textarea value should empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('Should respond to state change properly', () => {
        result.setState(() => ({
            comment: message
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            comment: ''
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe('');
    });

    test(`component state and textarea value should reflect according changes
      if any text input provided`, () => {
            result.find('textarea').simulate('change', {
                target: {
                    value: message
                }
            });

            expect(result.find('textarea').text()).toBe(message);
            expect(result.state()).toEqual(mutatedState);
        });

    test('component state and textarea value should reflect according changes if the form is submitted', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);
    });

    test('createPost method pased as a prop should be invoked once after the form is submitted', () => {
        expect(props.createPost.mock.calls.length).toBe(1);
    });
});
