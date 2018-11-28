import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ViewGroupPage from "../components/ViewGroup.js";

Enzyme.configure({ adapter: new Adapter() });

describe("View component", () => {

    test("View page component renders", () => {
        const wrapper = shallow(<ViewGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })
 
    let outputData = "";
    let storeLog = inputs => (outputData += inputs);
    //Check if Console Contains Shuffled Names for the Giftee
    // test("console log contains shuffled list of names", () => {
    //     console["log"] = jest.fn(storeLog);
    //     require("../components/ViewGroup.js");
    //     expect(outputData).toContain("Shuffled Names");
    // });
 })