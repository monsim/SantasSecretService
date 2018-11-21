import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AccountPage from "../components/Account.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Account page component", () => {

    test("Account page component renders without crashing", () => {
        const wrapper = shallow(<AccountPage />);
        expect(wrapper.exists()).toBe(true);
    })

})
