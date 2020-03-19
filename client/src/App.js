import React from 'react';
import {Router} from '@reach/router';  
import './App.css';
import Main from './views/Main';
import AuthorDetail from './views/AuthorDetail';
import Update from './views/Update';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <AuthorDetail path="/author/:id" />
        <Update path="author/:id/update" />
      </Router>
    </div>
  );
}

export default App;
