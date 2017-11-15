// Core
import React from 'react';
import Counter from './';
import dom from 'react-test-renderer';

const renderTree = dom.create(<Counter count = { 3 } />).toJSON();

test('Counter component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
