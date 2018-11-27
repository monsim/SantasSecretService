import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import ViewGroupPage from "../components/ViewGroup";
import Adapter from "enzyme-adapter-react-16";
import sinon from "../../node_modules/sinon/pkg/sinon.js";

Enzyme.configure({ adapter: new Adapter() });

//jest.mock("../../api");

describe("View component", () => {

    test("View page component renders", () => {
        const wrapper = shallow(<ViewGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })

})
