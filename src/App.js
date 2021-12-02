import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import HomePage from "./pages/homepage/homepage.component";
import SignInAndSignOut from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

import "./App.css";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/signin">
              <SignInAndSignOut />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
