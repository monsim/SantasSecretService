import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ViewGroupPage from "../components/ViewGroup.js";

Enzyme.configure({ adapter: new Adapter() });

describe("View group page component", () => {

    test("View group page component renders without crashing", () => {
        const wrapper = shallow(<ViewGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })

})