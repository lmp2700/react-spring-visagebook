import React, {Component} from 'react';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginForm: {
                username: "",
                password: ""
            },
            registerForm: {
                username: "",
                password: ""
            }
        }
    }
    handleRegisterChange = (e) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleLoginChange = (e) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.loginForm);
    }
    handleRegisterSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state.registerForm);
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleLoginSubmit}>
                    username: <input type="text" name="username" onChange={this.handleLoginChange}/>
                    password: <input type="text" name="password" onChange={this.handleLoginChange}/>
                    <input type="submit"/>
                </form>
                <h1>Register</h1>
                <form onSubmit={this.handleRegisterSubmit}>
                    username: <input type="text" name="username" onChange={this.handleRegisterChange}/>
                    password: <input type="text" name="password" onChange={this.handleRegisterChange}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Login;