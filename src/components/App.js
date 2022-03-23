import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Diary from './Diary';
import Tips from './Tips';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';
import * as calData from '../data';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.handleTokenCheck();
  }

  handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      // we're checking the user's token
      auth.checkToken(jwt).then((res) => {
        let calGoal = 0;
        // we're finding the selected user's total calories
        // from the list of possible goals
        calData.calData.forEach((goal) => {
          if (goal.id === res.en_cal_goal) {
            // the selected user's goal
            calGoal = goal.calGoal;
          }
        })
        if (res) {
          // if a goal is found, add it to the state
          this.setState({
            loggedIn: true,
            calGoal
          }, () => {
            this.props.history.push("/diary");
          });
        }
      });
    }
  }

  handleLogin(calGoal) {
    this.setState({
      loggedIn: true,
      calGoal
    })
  }

  handleLogout() {
    // finish the log out handler
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <>
        <Header />
        <main className="content">
          {this.state.loggedIn && <NavBar handleLogout={this.handleLogout} />}
          <Switch>
            <ProtectedRoute path="/diary" calGoal={this.state.calGoal} loggedIn={this.state.loggedIn} component={Diary} />
            <ProtectedRoute path="/tips" loggedIn={this.state.loggedIn} component={Tips} />
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/">
              {this.state.loggedIn ? <Redirect to="/diary" /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);