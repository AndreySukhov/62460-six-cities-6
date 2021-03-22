import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {ActionCreator} from "./store/actions";

const SignInPage = ({loginFormPending, onLogin, isAuthenticated}) => {
  const [formData, setFormData] = useState({email: ``, password: ``});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  if (isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                onChange={handleInputChange}
                value={formData.email}
                disabled={loginFormPending}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required="" />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                onChange={handleInputChange}
                disabled={loginFormPending}
                value={formData.password}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required=""
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={loginFormPending
              || !formData.password.trim().length || !formData.email.trim().length}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

SignInPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginFormPending: PropTypes.bool,
  onLogin: PropTypes.func,
};

const mapStateToProps = ({authentication}) => ({
  loginFormPending: authentication.loginFormPending,
  isAuthenticated: !!authentication.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin(params) {
    dispatch(ActionCreator.login(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
