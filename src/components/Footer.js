import React from "react";
import "./Footer.css"; // Import CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Connect with me:</h3>
          <ul>
            <li>
              <a
                href="https://wa.me/message/OZNQX54WO67AO1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.criativodevs.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/criativodevs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact:</h3>
          <p>Mobile: +351 911 509 368</p>
          <p>
            Email:{" "}
            <a href="mailto:criativo.devs@criativodevs.online">
              criativo.devs@criativodevs.online
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
