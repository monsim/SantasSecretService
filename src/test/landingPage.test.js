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
import SignInPage from "../components/SignIn.js";
import Adapter from "enzyme-adapter-react-16";

import Button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

// Check if toLogin is called
describe('<Landing Buttons />', () => {
    it('calls the toLogin method', () => {
        // const mockCallBack = sinon.spy();
        // const wrapper = shallow(<LandingPage />)
        const login = jest.fn(LandingPage.toLogin)
        const button = shallow((<Button onClick={login}>Login</Button>))
        button.find('Button').simulate('click');
        expect(login).toHaveBeenCalled()
    });
});

// Check if toSignUp is called
describe('<Landing Buttons />', () => {
    it('simulates click events', () => {
        // const mockCallBack = sinon.spy();
        // const wrapper = shallow(<LandingPage />)
        const signUp = jest.fn(LandingPage.toSignUp)
        const button = shallow((<Button onClick={signUp}>Login</Button>))
        button.find('Button').simulate('click');
        expect(signUp).toHaveBeenCalled()
    });
});