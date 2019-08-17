import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

function Header(props) {
  const logOut = () => {
    props.logOut();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Company X
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {props.isAuth ? (
                <Link className="nav-link" to="/dashboard">
                  Dashboard <span className="sr-only">(current)</span>
                </Link>
              ) : null}
            </li>
          </ul>
          <div className="form-inline mt-2 mt-md-0">
            <ul className="nav navbar-nav ml-auto">
              {!props.isAuth ? (
                [
                  <li className="nav-item" key="signup">
                    <Link className="nav-link" to="signup">
                      Sign Up
                    </Link>
                  </li>,
                  <li className="nav-item" key="signin">
                    <Link className="nav-link" to="signin">
                      Sign In
                    </Link>
                  </li>,
                ]
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="logout" onClick={logOut}>
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(
  mapStateToProps,
  actions
)(Header);
