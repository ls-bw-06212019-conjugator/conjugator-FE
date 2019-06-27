import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';

import { Route } from 'react-router-dom';

import { Auth, Conjugator, Dashboard, Settings } from './components';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Conjugator} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/settings' component={Settings} />
      <Route path='/auth' component={Auth} />
      {/* <Route path='/profile' component={Profile} /> */}
    </div>
  );
}

export default App;
