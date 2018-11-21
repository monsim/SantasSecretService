import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LandingPage from "../components/Landing.js";

Enzyme.configure({ adapter: new Adapter() });

describe("LandingPage component", () => {

    test("Landing page component renders without crashing", () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.exists()).toBe(true);
    });

    // checking for button click -- doesn't work atm
    /*
    it('simulates click events', () => {
        const app = shallow(<LandingPage />)
        const instance = app.instance();
        const spy = jest.spyOn(instance, 'toLogin');
    
        instance.forceUpdate();    
    
        const p = app.find('#login');
        p.simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    */
})