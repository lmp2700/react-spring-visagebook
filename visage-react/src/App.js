import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main/Main';
import Login from './Login/Login';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {
        "username": ""
      },
      loggedIn: false,
      error: ""
    }
  }
  handleLogin = async (formData) => {
    console.log(formData);
    console.log(JSON.stringify(formData));
    const newUser = await fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(newUser.status === 200){
      const newUserResponse = await newUser.json();
      this.setState({
        currentUser: newUserResponse,
        loggedIn: true,
        error: ""
      })
    }else {
      this.setState({
        error: "invalid credentials:"
      })
    }
    
    
  }
  handleRegister = async (formData) => {
    console.log(formData);
    console.log(JSON.stringify(formData));
    const newUser = await fetch('http://localhost:8080/users', {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newUserResponse = await newUser.json();
    if(newUser.status === 200){
      console.log("GOOD REGISTER");
    }else{
      this.setState({
        error: "invalid registration"
      })
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? 
          <Main></Main> :
          <Login handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
        }
      </div>
    );
  }
}

export default App;
