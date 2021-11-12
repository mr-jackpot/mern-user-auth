import React from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./Login.css"


const Login = () => {



    let history = useHistory();
    
    // const handleRoute = () =>{ 
    //     history.push("/session");
    //   }
    
    // This can be one object
    const [response, setResponse] = React.useState("");
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const login = {
        "username": username,
        "password": password 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin(login);
    }

    const submitLogin = (auth) => {
        axios
            .post('http://localhost:4000/auth', auth)
            .then(() => {
                window.location.href="/session";},
                (res) => setResponse('ERROR: User not authenticated.'))
    }
    
    return (
        <div>
            <div className="FailureResponse">{response}</div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input
                    value={username}
                    onChange={(u) => setUsername(u.target.value)}
                    required
                /><br/>
                <label>Password:</label><br/>
                <input
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                    type="password"
                    required
                /><br/>
                <input type="submit" value="Submit" 
                // onClick={handleRoute}
                />
            </form>
        </div>
    )
}

export default Login