import React, {useState} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        transition: theme.transitions.create("width", theme.transitions.duration.shortest),
        borderRadius: 5,
        width: 200,
        [theme.breakpoints.down("md")]: {
            width: 150
        },
        display: "flex",
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.down("xs")]: {
            flexGrow: 1 
        }
    },
    search: {
        color: "#ffffff",
        flexGrow: 1
    }
}))

const SearchBar = () => {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const searchHandler = () => {
        if(value) window.location.href = `/search/${value}`;
    }
    return (
        <div className={classes.root}>
            <IconButton color="inherit" onClick={searchHandler}>
                <SearchIcon />
            </IconButton>
            <InputBase placeholder="Search..." value={value} onChange={e => setValue(e.target.value)}
             type="text" inputProps={{"aria-label": "search"}} className={classes.search}/>
        </div>
    )
}

export default withRouter(SearchBar)