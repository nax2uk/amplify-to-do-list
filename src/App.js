
import React, { useEffect, useCallback, useContext } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import UserContext from './context/user/userContext';
import ToDoListPage from './pages/ToDoListPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import theme from './utils/theme';
import { Hub } from 'aws-amplify';


function App({ history }) {
  const { getUserData, user, setUser, getUserAttr } = useContext(UserContext);

  const handleAuth = ({ payload }) => {
    switch (payload.event) {
      case "signIn": console.log("signed in"); getUserData(); break;
      case "signUp": console.log("signed up"); break;
      case "signOut": console.log("signed out"); setUser(null); break;
      default: return;
    }

  };

  // get userAttribute when there is a user
  useEffect(() => {
    console.log(user);
    getUserAttr();
    // eslint-disable-next-line
  }, [user]);

  //componentDidMount/Unmount
  useEffect(() => {
    getUserData();
    Hub.listen('auth', handleAuth);
    return () => Hub.remove('auth', handleAuth);
    // eslint-disable-next-line
  }, []);

  return !user ?
    <Authenticator theme={theme} />
    :
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ToDoListPage} />
        <Route
          path="/profile"
          component={ProfilePage}
        />
      </Switch>
    </Router>;
}

export default App;
