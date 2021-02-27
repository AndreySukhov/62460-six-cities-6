import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import PropTypes from "prop-types";

import NotFoundPage from '../not-found-page/not-found-page';

const PrivateRoute = ({isAuthenticated, children, path, exact}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (isAuthenticated) {
          return <>{children}</>;
        }
        return (<NotFoundPage />);
      }}
    />
  );
};

const mapStateToProps = ({isAuthenticated}) => ({
  isAuthenticated,
});

PrivateRoute.propTypes = {
  path: PropTypes.string,

  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default connect(mapStateToProps, null)(PrivateRoute);
