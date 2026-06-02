import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-5">
          {/* Brand / Social */}
          <Col xs={12} md={4}>
            <div className="footer-brand">
              <span className="brand-dot" />
              <h5 className="footer-title">Kerala IT Park Jobs</h5>
            </div>
            <p className="footer-text">
              Get the latest IT park job openings, hiring alerts, and career
              tips from Kerala's top tech hubs — directly in your inbox.
            </p>

            <div className="social-icons">
              <a
                href="https://www.facebook.com/findmycareercom/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/findmycareeritb"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com/in/shahbazaman"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <div className="contact-info">
              <p>
                <FaEnvelope className="contact-icon" />
                keralaitparkjobs@gmail.com
              </p>
              <p>
                <FaPhone className="contact-icon" />
                7560929242
              </p>
              <p>
                <FaMapMarkerAlt className="contact-icon" />
              Technopark ,InfoPark ,CyberPark, Kerala
              </p>
            </div>
          </Col>

          {/* Getting Started */}
          <Col xs={6} md={2}>
            <h6 className="footer-heading">Getting Started</h6>
            <ul className="footer-list">
              <li>How It Works</li>
              <li>Create Profile</li>
              <li>Upload Resume</li>
              <li>Job Alerts</li>
              <li>API Access</li>
            </ul>
          </Col>

          {/* Platform */}
          <Col xs={6} md={2}>
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-list">
              <li>Browse Jobs</li>
              <li>Companies</li>
              <li>Career Guidance</li>
              <li>Skill Assessment</li>
            </ul>
          </Col>

          {/* Company */}
          <Col xs={6} md={2}>
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </Col>

          {/* Legal */}
          <Col xs={6} md={2}>
            <h6 className="footer-heading">Legal</h6>
            <ul className="footer-list">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
              <li>Data Protection</li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col>
            <p className="copyright text-center">
              © 2025 Kerala IT Park Jobs. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;