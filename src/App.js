import React from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import { Auth } from './components';

function App() {
  return (
    <div className="App">
      <Route path='/auth' component={Auth} />
    </div>
  );
}

export default App;
