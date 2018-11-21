import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import ViewGroupPage from "../components/ViewGroup";
import Adapter from "enzyme-adapter-react-16";
import sinon from "../../node_modules/sinon/pkg/sinon.js";
import button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

//jest.mock("../../api");

describe("View component", () => {

    test("View page component renders", () => {
        const wrapper = shallow(<ViewGroupPage />);
        expect(wrapper.exists()).toBe(true);
    })

    let outputData = "";
    let storeLog = inputs => (outputData += inputs);
    //Check if Console Contains Shuffled Names for the Giftee
    test("console log contains shuffled list of names", () => {
        console["log"] = jest.fn(storeLog);
        require("../components/ViewGroup.js");
        expect(outputData).toContain("Shuffled Names");
    });

    //Check if Console Contains Gifter and Giftee Names 
    test("console log contains shuffled list of names", () => {
        console["log"] = jest.fn(storeLog);
        require("../components/ViewGroup.js");
        expect(outputData).toContain("Gifter Name");
        expect(outputData).toContain("Giftee Name");
    });

    //Check if X Buttons Appear Based on Group Members
    test('renders buttons dependning on amount of members', () => {
        const wrapper = shallow(<ViewGroupPage />);
        expect(wrapper.find(Button)).toHaveLength(6);
    });

    



})
