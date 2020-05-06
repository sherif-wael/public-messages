import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({isAuthenticated, path, component}) => {
    return (
        isAuthenticated ?
          <Route path={path} component={component} exact /> : 
          <Redirect to="/" />
    )
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)