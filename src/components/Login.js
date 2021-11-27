import React from 'react'
import axios from 'axios';
import "./Login.css"
import { useHistory } from "react-router-dom";


const env = require("../server/props");


const Login = () => {
    
    // This can be one object
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const login = {
        "username": username,
        "password": password 
    }

    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin(login);
    }

    const submitLogin = (auth) => {
        axios
            .post(`${env.SERVER_URL}${env.SERVER_PORT}/auth`, auth, {withCredentials: true})
            .then((x) => {
                console.log(x);
                console.log('Routing to /session from React');
                history.push('/session');
            })
    }

    const userTest = () => {
        axios
            .get(`${env.SERVER_URL}${env.SERVER_PORT}/authtest`, {withCredentials: true})
            .then((x) => {
                console.log(x);
                console.log('were routed to authtest')
            })

    }

    const adminTest = () => {
        axios
            .get(`${env.SERVER_URL}${env.SERVER_PORT}/admin`, {withCredentials: true})
            .then((x) => {
                console.log(x);
                console.log('were routed to authtest')
            })

    }
    
    const logout = () => {
        axios
            .get(`${env.SERVER_URL}${env.SERVER_PORT}/logout`, {withCredentials: true})
            .then((x) => {
                console.log(x);
            })
        window.location.reload();
    }

    return (
        <div>
            <button onClick={adminTest}> OWNER TEST </button>
            <button onClick={userTest}> VIEWER TEST </button>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input
                    value={username}
                    onChange={(u) => setUsername(u.target.value)}
                    name="username" // added so cypress can find the inputbox
                    required
                /><br/>
                <label>Password:</label><br/>
                <input
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                    type="password"
                    required
                /><br/>
                <input type="submit" value="Submit"/>
            </form> 
            <button onClick={logout}> DESTROY COOKIE </button>
        </div>
    )
}

export default Login