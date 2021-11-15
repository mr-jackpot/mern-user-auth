import {React, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";



const Login = () => {

    // let history = useHistory(); 
 
    // const handleRoute = () =>{ 
    //     history.push("/session");
    //   }
    
    // This can be one object
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            .then((x) => {
                console.log(x);
                console.log('Routing to /session from React')
                // window.location.href="/session"
            })
    }

    return (
        <div>
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