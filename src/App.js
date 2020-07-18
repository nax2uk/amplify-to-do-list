
import React, { useState } from 'react';
import { Authenticator } from 'aws-amplify-react';
import ToDoList from './components/ToDoList';
import NavBar from './components/Navbar';
import theme from './utils/theme';


function App() {
  const [user, setUser] = useState(null);
  return !user ?
    <Authenticator theme={theme} />
    :
    <>
      <NavBar />
      <ToDoList />;
    </>

}

export default App;
