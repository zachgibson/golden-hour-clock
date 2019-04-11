import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/sweet-feature/DefaultPage';

describe('sweet-feature/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      sweetFeature: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.sweet-feature-default-page').getElement()
    ).to.exist;
  });
});
