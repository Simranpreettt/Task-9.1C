import React, { useState } from 'react';
import Input1 from './Input1';
import './App.css';
import './Signup.css';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from './firebase'; 

const SignUp = ({ showLogin }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [contact, setContact] = useState(initialState);

  const { name, email, password, confirmPassword } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      if (user) {
        await createUserDocFromAuth(user, { name });
        alert('Sign-up successful! Redirecting to login page...');
        showLogin(); 
      }
    } catch (error) {
      alert('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <Input1
          name='name'
          type='text'
          placeholder='Name'
          onChange={handleChange}
          value={name}
        />
        <br />
        <Input1
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          value={email}
        />
        <br />
        <Input1
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          value={password}
        />
        <br />
        <Input1
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          onChange={handleChange}
          value={confirmPassword}
        />
        <br />
        <button onClick={handleSubmit}>Sign up</button>
        <br />
        <br />
        
        <button onClick={showLogin}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
