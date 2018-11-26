import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PasswordForgetPage from "../components/PasswordForget";

Enzyme.configure({ adapter: new Adapter() });

describe("Password forget component", () => {

    test("Password forget component renders without crashing", () => {
        const wrapper = shallow(<PasswordForgetPage />);
        expect(wrapper.exists()).toBe(true);
    })

})
