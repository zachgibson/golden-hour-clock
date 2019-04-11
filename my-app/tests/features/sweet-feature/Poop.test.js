import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Poop } from 'src/features/sweet-feature';

describe('sweet-feature/Poop', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Poop />
    );

    expect(
      renderedComponent.find('.sweet-feature-poop').getElement()
    ).to.exist;
  });
});
