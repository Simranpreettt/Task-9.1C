import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Header from './Header';
import Banner from './Banner';
import ArticleList from './ArticleList'; 
import TutorialList from './TutorialList';
import Signup from './Signup';
import Login from './Login'; 
import Footer from './Footer';
import NewPostPage from './NewPostPage';
import FindQuestionPage from './FindQuestionPage';
import RouteAccess from './RouteAccess';  // Import ProtectedRoute

function App() {
  const [showLogin, setShowLogin] = useState(false);  // State to show login
  const [showSignup, setShowSignup] = useState(false); // State to show signup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status

  // Function to handle login button click
  const handleLoginClick = () => {
    setShowLogin(true);  // Show login page when login button is clicked
    setShowSignup(false); // Hide signup page when login is clicked
  };

  // Function to redirect to home and hide login/signup pages
  const redirectToHome = () => {
    setIsLoggedIn(true);  // Set the user as logged in
    setShowLogin(false);  // Hide the login page
    setShowSignup(false); // Hide the signup page
  };

  // Function to show signup instead of login
  const showSignupPage = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  // Function to show login instead of signup
  const showLoginPage = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    setIsLoggedIn(false);  // Set user as logged out
    alert('Logged out successfully');
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/new-post">New Post</Link>
          <Link to="/find-question">Find Question</Link>
        </nav>

        {/* Pass props to Header */}
        <Header 
          handleLoginClick={handleLoginClick} 
          handleLogoutClick={handleLogoutClick} 
          isLoggedIn={isLoggedIn} 
        />

        {/* Content */}
        <Banner />

        {/* Conditional rendering for Login and Signup */}
        {!isLoggedIn && showLogin && (
          <Login showSignUp={showSignupPage} redirectToHome={redirectToHome} />
        )}

        {!isLoggedIn && showSignup && (
          <Signup showLogin={showLoginPage} />
        )}

        {/* Routes for other pages */}
        <Routes>
          <Route path="/" element={
            <div>
              <h1 align="center">Featured Articles</h1>
              <ArticleList />
              <h1 align="center">Featured Tutorials</h1>
              <TutorialList />
            </div>
          } />

          {/* Protected Routes for New Post and Find Question */}
          <Route 
            path="/new-post" 
            element={
              <RouteAccess isLoggedIn={isLoggedIn}>
                <NewPostPage />
              </RouteAccess>
            } 
          />
          
          <Route 
            path="/find-question" 
            element={
              <RouteAccess isLoggedIn={isLoggedIn}>
                <FindQuestionPage />
              </RouteAccess>
            } 
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
