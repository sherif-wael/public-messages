import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        boxSizing: "border-box",
        boxShadow: theme.shadows[2],
        backgroundColor: "#ffffff",
        margin: theme.spacing(2),
        display: "flex",
        alignItems: "center"
    },
    info: {
        padding: "0 30px",
    }
}))

const SearchProfile = ({history, user}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} onClick={() => history.push(`/profile/${user.id}`)}>
            <UserAvatar photo={user.photo} char={user.name[0]}/>
            <div className={classes.info}>
                <Typography variant="body1" component="p">{user.name}</Typography>
                <Typography variant="subtitle1" component="p" color="textSecondary">{user.username}</Typography>
            </div>
        </div>
    )
} 

export default SearchProfile