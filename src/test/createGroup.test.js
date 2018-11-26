import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateGroupPage from "../components/CreateGroup.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Create group page component", () => {

    test("Create group page component renders without crashing", () => {
        const wrapper = shallow(<CreateGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })

});