import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import LandingPage from "../components/Landing.js";
import Adapter from "enzyme-adapter-react-16";
import sinon from "../../node_modules/sinon/pkg/sinon.js";
import Button from '../components/Button.jsx';


Enzyme.configure({ adapter: new Adapter() });

describe("Landing component", () => {
	test("Landing page component renders", () => {
		const wrapper = shallow(<LandingPage/>);
		expect(wrapper.exists()).toBe(true);
    })
    
    test('LandingPage renders the text inside it', () => {
        const wrapper = mount(
            <LandingPage/>
        );
        expect(wrapper.text()).toContain('Santa\'s Secret Service');
    });
})

describe('<Landing Buttons />', () => {
    test('renders two <Button /> components', () => {
      const wrapper = shallow(<LandingPage />);
      expect(wrapper.find(Button)).toHaveLength(2);
    });

    test('simulates click events', () => {
        const mockCallBack = sinon.spy();
        const button = shallow((<Button onClick={mockCallBack}>Login</Button>));
    
        button.find('Button').simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
    });
})
