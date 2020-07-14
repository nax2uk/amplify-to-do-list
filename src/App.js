
import React, { useState, useEffect, useCallback } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import theme from './utils/theme';
import { Auth, Hub } from 'aws-amplify';


function App() {
  const [user, setUser] = useState(null);

  const getUserData = useCallback(() => {
    const retrieveData = async () => {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser(user) : setUser(null);
    }
    retrieveData();

  }, []);
  const handleSignOut = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.error("Error signing out user");
    }
  }

  const handleAuth = useCallback(({ payload }) => {
    switch (payload.event) {
      case "signIn": console.log("signed in"); getUserData(); break;
      case "signUp": console.log("signed up"); break;
      case "signOut": console.log("signed out"); setUser(null); break;
      default: return;
    }

  }, [getUserData]);


  useEffect(() => {
    getUserData();
    Hub.listen('auth', handleAuth);
    return () => Hub.remove('auth', handleAuth);
  }, [getUserData, handleAuth]);

  return !user ?
    <Authenticator theme={theme} />
    :
    <Router>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Switch>
        <Route exact path="/" component={ToDoListPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>;
}

//export default withAuthenticator(App, true, [], null, theme);
export default App;
