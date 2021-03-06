import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './nav-bar';
import Dashboard from './dashboard';
import Workouts from './workouts';
import Tracker from './tracker'
import WorkoutForm from './workout-form';
import WorkoutView from './workout-view';
import WorkoutEditForm from './workout-edit-form';
import LandingPage from './landing';
import RegistrationPage from './register';
import LoginPage from './login';
import Logout from './logout';
import Sidebar from './sidebar';
import Backdrop from './backdrop';
import Spinner from './spinner';
import { refreshAuthToken } from '../actions/auth';
import { workoutGet } from '../actions/workouts';
import { connect } from 'react-redux';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sideBarOpen: false
    }
    this.sidebarClickHandler = this.sidebarClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
        //Fetch data
        this.props.dispatch(workoutGet());
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }

  sidebarClickHandler() {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    })
  }

  backdropClickHandler() {
    this.setState({
      sideBarOpen: false
    })
  }

  render() {
    let backdrop;
    let spinner;

    if (this.state.sideBarOpen) {
      backdrop = <Backdrop show={this.backdropClickHandler} />
    }
    
    if (this.props.loading || this.props.authLoading) {
      spinner = <Spinner />
    }

    return (
      <Router>
        <div className="app">
          <NavBar sidebarHandler={this.sidebarClickHandler} />
          <Sidebar open={this.state.sideBarOpen} clickHandler={this.sidebarClickHandler} />
          {backdrop}
          {spinner}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/workouts" component={Workouts} />
            <Route exact path="/workouts/add" component={WorkoutForm} />
            <Route exact path="/workouts/:id" component={WorkoutView} />
            <Route exact path="/workouts/:id/edit" component={WorkoutEditForm} />
            <Route exact path="/tracker" component={Tracker} />
            </Switch>
          </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  loading: state.app.loading,
  error: state.app.error,
  authLoading: state.auth.loading
});

export default connect(mapStateToProps)(App);