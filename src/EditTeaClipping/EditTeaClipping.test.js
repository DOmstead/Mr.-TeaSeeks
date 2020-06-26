import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditTeaClipping from './EditTeaClipping';

//This test ensures the EditTeaClipping component is able to render without crashing.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditTeaClipping />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});