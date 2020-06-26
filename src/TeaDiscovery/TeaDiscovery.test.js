import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TeaDiscovery from './TeaDiscovery';

//This test ensures the TeaDiscovery component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TeaDiscovery />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});