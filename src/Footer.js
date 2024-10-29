import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Explore</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#questions">Questions</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#tutorials">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Support</h2>
          <ul>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Stay connected</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="facebook icon"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
               <i className="twitter icon"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="instagram icon"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>DEV@Deakin 2022</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms</a>
          <a href="#code-of-conduct">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
