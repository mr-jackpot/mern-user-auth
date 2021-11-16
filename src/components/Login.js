import React from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./Login.css"

const env = require("../server/props");


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
            .post(`${env.SERVER_URL}${env.SERVER_PORT}/auth`, auth, {withCredentials: true})
            .then((x) => {
                console.log(x);
                console.log('Routing to /session from React')
                // window.location.href="/session"
            })
    }

    const authTest = (auth) => {
        axios
            .get(`${env.SERVER_URL}${env.SERVER_PORT}/authtest`, {withCredentials: true})
            .then((x) => {
                console.log(x);
                console.log('were routed to authtest')
            })

    }
    
    return (
        <div>
            <button onClick={authTest}> Click me </button>
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