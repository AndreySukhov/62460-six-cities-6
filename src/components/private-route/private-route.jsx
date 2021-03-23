import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Preloader from '../preloader/preloader';

const PrivateRoute = ({authentication, children, path, exact, redirectRoute}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (authentication.pending) {
          return (<Preloader />);
        }
        if (authentication.user) {
          return (<>{children}</>);
        }
        return (<Redirect to={redirectRoute} />);
      }}
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  redirectRoute: PropTypes.string,

  exact: PropTypes.bool,
  authentication: PropTypes.shape({
    pending: PropTypes.bool,
    user: PropTypes.string,
  }),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

PrivateRoute.defaultProps = {
  redirectRoute: `/404`
};

const mapStateToProps = ({authentication}) => ({
  authentication,
});

export default connect(mapStateToProps, null)(PrivateRoute);
