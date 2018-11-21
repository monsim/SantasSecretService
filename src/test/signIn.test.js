import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignInPage from "../components/SignIn.js";

Enzyme.configure({ adapter: new Adapter() });

describe("SignInPage component", () => {

    test("Sign in page component renders without crashing", () => {
        const wrapper = shallow(<SignInPage />);
        expect(wrapper.exists()).toBe(true);
    })

});