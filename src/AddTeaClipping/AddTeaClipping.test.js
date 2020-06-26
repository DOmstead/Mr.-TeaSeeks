import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddTeaClipping from './AddTeaClipping';

//This test ensures the AddTeaClipping component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddTeaClipping />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});