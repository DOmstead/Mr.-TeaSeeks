import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TeaClipping from './TeaClipping';

//This test ensures the TeaClipping component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TeaClipping />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});