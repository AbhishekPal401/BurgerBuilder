import React from 'react';

import {configure,shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

import NavigationItems from './NavigationItems';

import NavigationItem from './NavigationItem/Navigationitem';

describe("<navifationItems/>",()=>{
    it("should render two navigationItems if not authenticated",()=>{
        const wrapper=shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});