import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../layout/Home";
import CurrentUserProfile from "../profile/CurrentUserProfile";
import UserProfile from "../profile/UserProfile";
import EditProfile from "../profile/EditProfile1";
import CreateMessage from "../message/CreateMessage";
import Messages from "../message/Messages";
import CreateMessageIcon from "../message/CreateMessageIcon";
import SearchResult from "../search/SearchResult";
import AlertWrapper from "../alert/AlertWrapper";
import FbToken from "../layout/FbToken";

const Routes = () => {
    return (
        <Fragment>
            <CreateMessageIcon />
            <AlertWrapper />
            <Switch>
                <Route path="/" exact component={Home} />
                <PrivateRoute path="/home" component={CurrentUserProfile} />
                <Route path="/messages" exact component={Messages} />
                <PrivateRoute path="/profile/:id" component={UserProfile} />
                <PrivateRoute path="/createMessage" component={CreateMessage} />
                <PrivateRoute path="/edit" component={EditProfile} />
                <Route path="/search/:handler" component={SearchResult} />
                <Route path="/fb/:token" component={FbToken} />
            </Switch>
        </Fragment>
    )
}

export default Routes