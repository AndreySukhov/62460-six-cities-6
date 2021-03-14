import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from "../../util/constants";

const Footer = () => {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={ROUTES.main}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
};

export default Footer;
