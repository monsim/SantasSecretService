
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignUpPage from "../components/SignUp.js";

Enzyme.configure({ adapter: new Adapter() });

describe("SignUpPage component", () => {

    test("Sign up page component renders without crashing", () => {
        const wrapper = shallow(<SignUpPage />);
        expect(wrapper.exists()).toBe(true);
    })

})