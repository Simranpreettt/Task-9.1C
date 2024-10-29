import React, { useState } from 'react';
import Input1 from './Input1';
import './App.css';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from './firebase';
import './Login.css';

const Login = ({ showSignUp, redirectToHome }) => {
  const [contact, setContact] = useState({
    email: '',
    password: ''
  });

  const { email, password } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signinAuthUserWithEmailAndPassword(email, password);
      if (user) {
        redirectToHome();
      }
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      alert(`Welcome, ${user.displayName}!`);
      redirectToHome(); 
    } catch (error) {
      alert('Google Sign-In failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Input1
          name='email'
          type='text'
          placeholder='Email'
          onChange={handleChange}
          value={contact.email}
        />
        <br />

        <Input1
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          value={contact.password}
        />
        <br />

        <button onClick={handleSubmit}>Sign in</button>
        <br />
        <button onClick={logGoogleUser}>Log in with Google</button>
        <br />
        <br />

        <button onClick={showSignUp}>Sign up instead</button>
      </div>
    </div>
  );
};

export default Login;
