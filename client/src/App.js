import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/Login';
import Jokes from './components/Jokes';
import Register from './components/Register';

const StyledNav = styled.div`
  display: flex;
  
  a {
    margin: 10px;
    color: darkgreen;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      text-decoration: underline;
    }
  }
`;

function App() {
  return (
    <div className="App">
      <StyledNav className='nav'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </StyledNav>
      <Route exact path='/' render={() => <Jokes />} />
      <Route path='/register' render={() => <Register />} />
      <Route path='/login' render={() => <Login />} />
    </div>
  );
}

export default App;
