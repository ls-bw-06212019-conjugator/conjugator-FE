import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';

import { Route } from 'react-router-dom';

import { Auth } from './components';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path='/auth' component={Auth} />
      //More routes to come
    </div>
  );
}

export default App;
