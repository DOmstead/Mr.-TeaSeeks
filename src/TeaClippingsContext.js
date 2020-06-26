import React from 'react';

const TeaClippingsContext = React.createContext({
  teaClippings: [],
  addTeaClipping: () => {},
  deleteTeaClipping: () => {},
  updateTeaClipping: () => {},
});

export default TeaClippingsContext;
