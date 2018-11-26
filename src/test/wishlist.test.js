import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WishlistPage from "../components/wishlist.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Wishlist page component", () => {

    test("Wishlist page component renders without crashing", () => {
        const wrapper = shallow(<WishlistPage />);
        expect(wrapper.exists()).toBe(true);
    })

});