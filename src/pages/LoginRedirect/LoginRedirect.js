import React from 'react';
import { useHistory } from "react-router-dom";


const LoginRedirect = () => {

    let history = useHistory();
    
    const handleRoute = () =>{ 
        history.push("/");
      }

    return (
        <div>
            <h1>Success! You are now logged in.</h1>
            <br/>
            <input type="submit" value="Go Back" onClick={handleRoute}/>
        </div>
    )
}

export default LoginRedirect;