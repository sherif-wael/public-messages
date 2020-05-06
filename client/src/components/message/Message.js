import React, {useState} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {deleteMessage} from "../../actions/messageActions"
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    }
}))


const Message = ({message, user, deleteMessage}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = e => setAnchorEl(e.target);
    const handleClose = () => setAnchorEl(null);
    const handleMenuItemClick = () => {
        deleteMessage(message._id);
        setAnchorEl(null)
    }
    return (
        <Card className={classes.root}>
            <CardHeader title={`To:  ${message.reciever}`} 
            action={user.id == message.author || user.username == message.reciever ? <IconButton aria-label="settings" onClick={handleClick}><MoreVertIcon /></IconButton> : null} />
            <Menu anchorEl={anchorEl} open={anchorEl ? true : false} keepMounted onClose={handleClose}>
                <MenuItem onClick={handleMenuItemClick}><DeleteIcon />Delete</MenuItem>
            </Menu>
            <Divider />
            <CardContent>
                <Typography variant="body2" component="p">
                    {message.body}
                </Typography>
            </CardContent>
        </Card>
    )
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {deleteMessage})(Message)