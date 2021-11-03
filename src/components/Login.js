import {React, useState } from 'react'

const Login = () => {
    
    // This can be one object
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        // to api
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
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default Login