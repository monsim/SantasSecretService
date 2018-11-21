import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignOutPage from "../components/SignOut.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Sign out page component", () => {

    test("Sign out page component renders without crashing", () => {
        const wrapper = shallow(<SignOutPage />);
        expect(wrapper.exists()).toBe(true);
    })

});