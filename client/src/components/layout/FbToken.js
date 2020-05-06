import React from "react";


const FbToken = ({match, history}) => {
    localStorage.setItem("jwt", match.params.token);
    return (
        <a href="/">continue</a>
    )
}

export default FbToken