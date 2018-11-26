import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import JoinGroupPage from "../components/JoinGroup.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Join group page component", () => {

    test("Join group page component renders without crashing", () => {
        const wrapper = shallow(<JoinGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })

});