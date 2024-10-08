import React, { useState } from "react";
import classes from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={classes.outer - container}>
      {/* Logo */}
      <div className={classes.inner - container}>
        <div className={classes.logo - container}>
          <a href="/">
            <img
              src="https://66cf6e20751318039e6352ff--peaceful-dragon-75676e.netlify.app/assets/evangadi-logo-home-D98Zk6nH.png"
              alt="Evangadi Logo"
            />
          </a>
        </div>
        <div>
          {/* Toggle Button with Hamburger Icon */}
          <button
            className={classes.menu - toggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          {/* Navigation */}

          <nav className={`nav-container ${isMenuOpen ? "open" : ""}`}>
            <ul className={classes.nav - list}>
              <li>
                <a href="/">Home</a>
              </li>
              <li className={classes.divider} />
              <li>
                <a href="/how-it-works">How it Works</a>
              </li>
              <li className={classes.divider} />
            </ul>
            <div>
              <button className={classes.button - container}>SIGN IN</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
