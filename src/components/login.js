import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './login-form';
import './login.css';

export class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isHidden: true
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />
    }
    let demoUserInfo;

    if (!this.state.isHidden) {
      demoUserInfo = (
        <div className='demo-user-info'>
          <p>Username: demouser</p>
          <p>Password: demouserpassword</p>
        </div>
      )
    }
    

    return (
      <div className="login-page">
        <LoginForm />
        <div className="demo">
          <p>Want to demo GymNotes? <span className="demo-show" onClick={() => this.setState({isHidden: false})}>Click Here!</span></p>
          {demoUserInfo}  
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
