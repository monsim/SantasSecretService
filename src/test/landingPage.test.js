import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import sinon from 'sinon';
import Button from '@material-ui/core/Button';
import LandingPage from "../components/Landing.js";
import Adapter from "enzyme-adapter-react-16";

'use strict';

Enzyme.configure({ adapter: new Adapter() });

describe("<Landing component>", () => {
  test("Landing page component renders", () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.exists()).toBe(true);
  })
})

test('LandingPage renders the text inside it', () => {
  const wrapper = mount(
      <LandingPage/>
  );
  expect(wrapper.text()).toContain('Santa\'s Secret Service');
});

describe('<Landing Buttons Events/>', () => {
  it('renders two <Button /> components', () => {
    const button = shallow(<LandingPage />);
    expect(button.find(Button)).toHaveLength(2);
  });

  it('simulates click events', () => {
    const mockCallBack = sinon.spy();
    const button = shallow((<Button onClick={mockCallBack}>Login</Button>));

    button.find('Button').simulate('click');
    expect(mockCallBack).toHaveProperty('callCount', 1);
  });
});


// var Landing = require('../components/Landing.js').default;
// test("test func", function () {
//   var model = new Landing();
//   expect(model.sum(2, 2)).toBe(4);
// });