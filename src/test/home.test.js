import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomePage from "../components/Home.js";

Enzyme.configure({ adapter: new Adapter() });

describe("HomePage component", () => {

    test("Homepage component renders without crashing", () => {
        const wrapper = shallow(<HomePage />);
        expect(wrapper.exists()).toBe(true);
    })

})