import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';

//This test ensures the Nav component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});