import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ROUTES} from '../../util/constants';
import userShape from '../../propTypes/user';

const Header = ({user}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={ROUTES.main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={user ? `${ROUTES.favorites}` : `${ROUTES.login}`}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {user ?
                    (<span className="header__user-name user__name">{user.email}</span>) :
                    (<span className="header__login">Sign in</span>)
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: userShape,
};

const mapStateToProps = ({authentication}) => ({
  user: authentication.user,
});

export default connect(mapStateToProps, null)(Header);
