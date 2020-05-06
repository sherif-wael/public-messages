import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profileActions";
import{makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CurrentUserSentMessages from "../message/CurrentUserSentMessages";
import CurrentUserRecievedMessages from "../message/CurrentUserRecievedMessages";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1600,
        margin: "0 auto",
        padding: "0 200px",
        [theme.breakpoints.down("sx")]:{
            padding: "0 25px"
        },
        [theme.breakpoints.down("sm")]:{
            padding: "0 50px"
        },
        [theme.breakpoints.down("mg")]: {
            padding: "0 100px"
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
        backgroundColor: theme.palette.secondary.main
    }
}))

const CurrentUserProfile = ({getCurrentProfile, profile, loading}) => {
    const classes = useStyles();
    const [value, setValue] = useState("sentMessages");
    const handleChange = (e, newValue) => setValue(newValue)
    useEffect(() => {
        getCurrentProfile()
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
                              <Typography variant="h5" component="h5">{profile.name}</Typography>
                              <Typography variant="body1" component="p" color="textSecondary">username: {profile.username}</Typography>
                          </div>
                      </div>
                      <Paper square className={classes.tabs}>
                          <Tabs value={value} indicatorColor="primary" textColor="primary" variant="fullWidth"
                          onChange={handleChange} aria-label="disabled tabs examply" className={classes.tab}>
                              <Tab label="Sent" value="sentMessages" className={classes.tabEl}></Tab>
                              <Tab label="Recieved" value="recievedMessages" className={classes.tabEl}></Tab>
                          </Tabs>
                      </Paper>
                      {
                          value === "sentMessages" ?
                            <CurrentUserSentMessages /> :
                            <CurrentUserRecievedMessages />
                      }
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

export default connect(mapStateToProps, {getCurrentProfile})(CurrentUserProfile)