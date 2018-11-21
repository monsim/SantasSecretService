// const sum = require('../components/Landing.js');

// var Landing = require('../components/Landing.js').default;

// test('adds 1 + 2 to equal 3', () => {
//     var model = new Landing();
//     expect(model.sum(1, 2)).toBe(3);
// });

// // this doesn't work - we're trying to test if the component is on the screen
// //expect(Landing.contains(<LandingPage />)).toBe(false);

import React, { Component } from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import LandingPage from "../components/Landing.js";
import sinon from "../../node_modules/sinon/pkg/sinon.js";
import Adapter from "enzyme-adapter-react-16";

import Button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<Landing Buttons />', () => {
    it('simulates click events', () => {
        const mockCallBack = sinon.spy();
        const button = shallow((<Button onClick={mockCallBack}>Login</Button>));
    
        button.find('Button').simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
      });
});