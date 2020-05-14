import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/);

const formValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault(e);

    if (formValid(this.state.formErrors)) {
      console.log(`
        Submitting:
        First Name : ${this.state.firstName}
        Last Name : ${this.state.lastName}
        Email : ${this.state.email}
        Password : ${this.state.password}
      `);
    } else {
      console.error('Form invalid');
    }
  }

  handleChange = (e) => {
    e.preventDefault(e);
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'minimum 3 characters required' : "";
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'minimum 3 characters required' : "";
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
        break;
      case 'password':
        formErrors.password = value.length < 6 ? 'minimum 6 characters required' : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="App">
        <div className="form-container">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? 'error form-control' : 'form-control'}
                type="text"
                name="firstName"
                placeholder="Elena"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? 'error form-control' : 'form-control'}
                type="text"
                name="lastName"
                placeholder="Vigo"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email form-group">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? 'error form-control' : 'form-control'}
                type="email"
                name="email"
                placeholder="elena@gmail.com"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password form-group">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? 'error form-control' : 'form-control'}
                type="password"
                name="password"
                placeholder="..."
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button className="button btn btn-info" type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
