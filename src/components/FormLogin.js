import React from 'react';
import '../styles/style.css';
import { loadUser, toggleLogin } from '../actionCreators';
import store from '../store';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }  

  render() {
    return (
      <div className='frame'>
        <form>
          <div className='title'>
            <h2><i>LOGIN</i></h2> 
          </div>

          <div className='divider'></div>

          <label>Email</label>
          <input name='email' placeholder='Email..' value={this.state.email} onChange={this.handleChange}/>

          <label>Password</label>
          <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>

          <div className='button green' onClick={() => this.handleSubmit(this.state)}> INGRESAR </div>
          <div className='button blue' onClick={this.handleRegister}> REGISTER </div>
        </form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = user => {
    fetch("https://blooming-ravine-89993.herokuapp.com/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Usuario o contraseña inválida, Intenta Nuevamente');
        this.setState({
          email: '',
          password: ''
        });
      } else {
        store.dispatch(toggleLogin(true));
        localStorage.setItem("token", data.token);
        store.dispatch(loadUser());
        this.props.history.push(`/`);
      }
    })
  }

  handleRegister = () => {
    this.props.history.push(`/register`);
  }
}

export default Login;