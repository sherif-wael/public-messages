import React, {useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {searchUsers} from "../../actions/profileActions";
import CircularProgress from "@material-ui/core/CircularProgress"
import SearchProfile from "./SearchProfile";

const useStyles  = makeStyles(theme => ({
    root: {
        padding: "50px 125px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            padding: "20px 25px"
        },
        [theme.breakpoints.down("md")]:{
            padding: "30px 30px"
        },
        [theme.breakpoints.down("lg")]: {
            padding: "50px 80px"
        }
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const SearchResult = ({match, history, users, loading, searchUsers}) => {
    const classes = useStyles();
    useEffect(() => {
        searchUsers(match.params.handler)
    }, [])

    return (
        <div className={classes.root}>
            {
                loading ? 
                  <div className={classes.loading}><CircularProgress color="secondary" /></div> : 
                  <div className={classes.result}>
                      {
                          !users.length ? 
                            <div className={classes.nouser}>
                                <Typography variant="h6" component="p" color="textSecondary">user not found</Typography>
                            </div> 
                            :
                            <div className={classes.users}>
                                {
                                    users.map((user, i) => <SearchProfile user={user} key={i} history={history}/>)
                                }
                            </div>
                      }
                  </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        loading: state.profile.loading,
        users: state.profile.searchProfiles
    }
}

export default connect(mapStateToProps, {searchUsers})(SearchResult);