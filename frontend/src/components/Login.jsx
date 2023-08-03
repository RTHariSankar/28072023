import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logSvg from '../images/log.svg';
import registerSvg from '../images/register.svg';
import '../css/Login.css';

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Login Input Handler
  const inputHandlerLogin = (e) => {
    if (Object.keys(loginErrors).length > 0) {
      validateLoginFields();
    }
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  // Login Submitted
  const loginHandler = (e) => {
    e.preventDefault();
    const loginValidationErrors = validateLoginFields();
    console.log('Validation signInErrors:', loginValidationErrors);
    if (loginValidationErrors) {
      axios
        .post('http://localhost:5000/api/login', loginUser)
        .then((response) => {
          try {
            if (response.data.message === 'Login successful') {
              const token = response.data.token;
              const userId = response.data.data._id;
              sessionStorage.setItem('userToken', token);
              sessionStorage.setItem('userId', userId);
              alert(response.data.message);
              if (userId === '64bf73a1f8cf24a4a8c9118f') {
                navigate('/admin');
              } else {
                navigate('/faculty');
              }
            } else {
              alert(response.data.message);
            }
          } catch (error) {
            alert(error.response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Field Validation Login
  const validateLoginFields = () => {
    const { email, password } = loginUser;
    const newLoginErrors = {};

    if (email === 'admin' && password === 'admin') {
      return true;
    } else {
      if (!email) {
        newLoginErrors.loginEmail = 'Please enter your email!';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newLoginErrors.loginEmail = 'Please enter a valid email address!';
      }
      if (!password) {
        newLoginErrors.loginPassword = 'Please enter your password!';
      }

      setLoginErrors(newLoginErrors);
      console.log(Object.keys(newLoginErrors).length);

      return Object.keys(newLoginErrors).length === 0;
    }
  };

  // Signup
  const [signInInputs, setSignInInputs] = useState({});
  const [signInErrors, setSignInErrors] = useState({});

  const sinputHandlerSignIn = (e) => {
    if (Object.keys(signInErrors).length > 0) {
      validateFieldsSignIn();
    }
    setSignInInputs({
      ...signInInputs,
      [e.target.name]: e.target.value,
    });
  };

  const validateFieldsSignIn = () => {
    const { name, email, password, confirmPassword } = signInInputs;
    const newErrorsSignIn = {};

    if (!name) {
      newErrorsSignIn.name = 'Please enter your name!';
    }

    if (!email) {
      newErrorsSignIn.email = 'Please enter your email!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrorsSignIn.email = 'Please enter a valid email address!';
    }
    if (!password) {
      newErrorsSignIn.password = 'Please enter your password!';
    }
    if (!confirmPassword) {
      newErrorsSignIn.confirmPassword = 'Please confirm your password!';
    } else if (password !== confirmPassword) {
      newErrorsSignIn.confirmPassword = 'Passwords do not match!';
    }
    setSignInErrors(newErrorsSignIn);
    console.log(Object.keys(newErrorsSignIn).length);

    return Object.keys(newErrorsSignIn).length === 0;
  };

  const getPasswordStrengthColor = () => {
    const passwordStrength = getPasswordStrength(signInInputs.password);

    if (passwordStrength === 'strong') {
      return 'green';
    } else if (passwordStrength === 'medium') {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getPasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length >= 8 && hasUppercase && hasLowercase && hasNumber) {
      return 'strong';
    } else if (password.length >= 6 && (hasUppercase || hasLowercase || hasNumber)) {
      return 'medium';
    } else {
      return 'poor';
    }
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateFieldsSignIn();
    console.log('Validation signInErrors:', validationErrors);

    if (validationErrors) {
      let data = {
        name: signInInputs.name,
        email: signInInputs.email,
        password: signInInputs.password,
      };
      console.log('onsubmit', data);

      axios
        .post('http://localhost:5000/api/signup', data)
        .then((response) => {
          console.log('Server Response:', response.data);
          if (response.data.message === 'Registered Successfully!!!') {
            alert(response.data.message);
            // navigate('/');
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  };

  return (
    // Login
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={loginHandler} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="Email"
                value={loginUser.email || ''}
                name="email"
                className={`form-control ${loginErrors.email ? 'is-invalid' : ''}`}
                onChange={inputHandlerLogin}
              />
              {loginErrors.email && (
                <div className="invalid-feedback d-block">{loginErrors.email}</div>
              )}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={loginUser.password || ''}
                className={`form-control ${loginErrors.password ? 'is-invalid' : ''}`}
                onChange={inputHandlerLogin}
                placeholder="Password"
              />
              {loginErrors.password && (
                <div className="invalid-feedback d-block">{loginErrors.password}</div>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>
            <button type="submit" className="btn solid">
              LOGIN
            </button>
          </form>
          {/* SignUp */}
          <form onSubmit={signInHandler} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-loginUser"></i>
              <input
                type="text"
                name="name"
                className={`form-control ${signInErrors.name ? 'is-invalid' : ''}`}
                onChange={sinputHandlerSignIn}
                placeholder="Name"
              />
              {signInErrors.name && (
                <div className="invalid-feedback d-block">{signInErrors.name}</div>
              )}
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="email"
                value={signInInputs.email || ''}
                className={`form-control ${signInErrors.email ? 'is-invalid' : ''}`}
                onChange={sinputHandlerSignIn}
                required
                placeholder="Email"
              />
              {signInErrors.email && (
                <div className="invalid-feedback d-block">{signInErrors.email}</div>
              )}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                className={`form-control ${signInErrors.password ? 'is-invalid' : ''}`}
                id="yourPassword"
                onChange={sinputHandlerSignIn}
                required
              />
              {signInErrors.password && (
                <div className="invalid-feedback d-block">{signInErrors.password}</div>
              )}

              {signInInputs.password && (
                <div style={{ color: getPasswordStrengthColor() }}>
                  Password Strength: {getPasswordStrength(signInInputs.password)}
                </div>
              )}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                name="confirmPassword"
                className={`form-control ${
                  signInErrors.confirmPassword ? 'is-invalid' : ''
                }`}
                id="confirmPassword"
                onChange={sinputHandlerSignIn}
                required
              />
              {signInErrors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {signInErrors.confirmPassword}
                </div>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showConfirmPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label className="form-check-label" htmlFor="showConfirmPassword">
                Show Password
              </label>
            </div>
            <button type="submit" className="btn solid">
              Sign up
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Faculties who haven't created an account, please sign up</p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={logSvg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Already have an account? Sign In</p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={registerSvg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;