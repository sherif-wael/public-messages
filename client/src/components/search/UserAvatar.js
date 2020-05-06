import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: "50%"
    },
    char: {
        backgroundColor: red[500],
        color: theme.palette.getContrastText(red[500]),
        padding: theme.spacing(1)
    }
}))



const UserAvatar = ({photo, char}) => {
    const classes = useStyles()
    return (
        <Fragment>
            {
                photo ? 
                  <img src={photo} alt="ptofile img" className={classes.avatar} /> : 
                  <Avatar className={classes.char}>{char}</Avatar>
            }
        </Fragment>
    )
}

export default UserAvatar