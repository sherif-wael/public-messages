import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getProfileById} from "../../actions/profileActions";
import{makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import MessagesRecieved from "../message/MessagesRecieved";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1600,
        margin: "0 auto",
        padding: "0 200px",
        [theme.breakpoints.down("lg")]:{
            padding: "0 150px"
        },
        [theme.breakpoints.down("md")]:{
            padding: "0 60px"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "0 25px"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0 10px"
        }
    },
    loading: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    wrapper: {
        padding: "20px 0"
    },
    profile: {
        display: "flex",
        justifyContent: "center",
        margin: "40px 0"
    },
    avatar: {
        margin: "0 20px",
        width: 100,
        height: 100,
        borderRadius: 0,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]:{
            margin: "0 auto",
            display: "block"
        },
        center: {
            [theme.breakpoints.down("sm")]: {
                textAlign: "center"
            }
        }
    }
}))

const CurrentUserProfile = ({getProfileById, profile, loading, match}) => {
    const classes = useStyles();
    useEffect(() => {
        getProfileById(match.params.id)
    }, [])
    return (
        <div className={classes.root}>
            {
                loading || profile == null ?
                  <div className={classes.loading}><CircularProgress color="secondary"/></div> :
                  <div className={classes.wrapper}>
                      <div className={classes.profile}>
                          <div>
                            {profile.photo ? <Avatar alt="profile image" src={profile.photo} className={classes.avatar}/> : <Avatar color="secondary" className={classes.avatar}>{profile.name[0]}</Avatar>}
                          </div>
                          <div>
                              <Typography variant="h5" component="h5" className={classes.center}>{profile.name}</Typography>
                              <Typography variant="body1" component="p" color="textSecondary" className={classes.center}>username: {profile.username}</Typography>
                          </div>
                      </div>
                      <Paper square className={classes.tabs}>
                          <Tabs value="recievedMessages" indicatorColor="primary" textColor="primary" variant="fullWidth"
                            aria-label="disabled tabs examply" className={classes.tab}>
                              <Tab label="Recieved" value="recievedMessages" className={classes.tabEl}></Tab>
                          </Tabs>
                      </Paper>
                     <MessagesRecieved username={profile.username}/>
                  </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        profile: state.profile.profile,
        loading: state.profile.loading
    }
}

export default connect(mapStateToProps, {getProfileById})(CurrentUserProfile)