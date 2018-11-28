import React from 'react';
import { mount } from 'enzyme';
import LandingPage from '../components/Landing.js';
import Enzyme, { shallow } from "enzyme";
// import LandingPage from "../components/Landing.js";
import Adapter from "enzyme-adapter-react-16";

import hushHush from '../../public/hushhush.png';
import Button from '@material-ui/core/Button';

import sinon from 'sinon';

describe("Landing component", () => {
    test("Landing page component renders", () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.exists()).toBe(true);
    });
    test('LandingPage renders the text inside it', () => {
        const wrapper = mount(
            <LandingPage />
        );
        expect(wrapper.text()).toContain('Santa\'s Secret Service');
    });
    test("renders a hush hush", () => {
        const logo = shallow(<LandingPage />);
        expect(logo.find("img").prop("src")).toContain(hushHush);
    });
    it('renders two <Button /> components', () => {
        const button = shallow(<LandingPage />);
        expect(button.find(Button)).toHaveLength(2);
      });
    
      it('simulates click events', () => {
        const mockCallBack = sinon.spy();
        const button = shallow((<Button onClick={mockCallBack}>Login</Button>));
    
        button.find('Button').simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
      });
    // it('simulates click events', () => {
    //     const mockCallBack = sinon.spy();
    //     const wrapper = mount(<LandingPage />);

    //     console.log("hereeeeEEEE:")
    //     console.log(wrapper.find(Button).first().debug());
    //     console.log("END")

    //     // (wrapper.find(Button).first().node.props.value).toEqual('loginButton');

    //     // console.log(wrapper.debug())
    //     wrapper.find(Button).first().simulate('click');
    //     // wrapper.find(Button).simulate('click');
    //     // expect(wrapper).toContain(Button);
    //     // expect(mockCallBack).toHaveProperty('callCount', 1);



    //     /*
    //         console.log(wrapper.debug())
    //     wrapper.find(Button).simulate('click');
    //     expect(wrapper).toContain(Button);
    //     */
    // });

    // it('simulates click events part two', () => {
    //     jest.spyOn(LandingPage.instance, 'toLogin');
        
    //     const wrapper = mount(<LandingPage {...props}/>,{context:{router: new 
    //         Router(), history: new History()}});
            
    //     console.log(wrapper.find(Button).first().debug());
    //     wrapper.find(Button).first().simulate('click');
    //     expect(LandingPage.toLogin).toHaveBeenCalled();

    //     //wrapper.update()
    //     //wrapper.instance().forceUpdate()
    // });
})


describe('<Landing Buttons Events/>', () => {
    
  });


Enzyme.configure({ adapter: new Adapter() });

