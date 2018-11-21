import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import sinon from 'sinon';
import Button from '@material-ui/core/Button';
import SignInForm from "../components/SignIn.js";
import Adapter from "enzyme-adapter-react-16";


'use strict';

Enzyme.configure({ adapter: new Adapter() });

describe('<Signin Buttons Events/>', () => {
  it('renders one <Button /> components', () => {
    const wrapper = shallow(<SignInForm />);
    expect(wrapper.find(Button))  .toHaveLength(1);
  });
});


describe("<SignIn component>", () => {
  test("Signin page component renders", () => {
    const wrapper = shallow(<SignInForm />);
    expect(wrapper.exists()).toBe(true);
  })
})