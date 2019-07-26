import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Jokes from './components/Jokes';
import Register from './components/Register';;

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={() => <Jokes />} />
      <Route path='/register' render={() => <Register />} />
      <Route path='/login' render={() => <Login />} />
    </div>
  );
}

export default App;
