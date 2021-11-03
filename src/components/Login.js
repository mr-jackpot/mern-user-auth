import {React, useState } from 'react'

const Login = () => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                <input
                    onChange={(u) => setUsername(u.target.value)}
                    required
                /><br/>
                <label>Password:</label><br/>
                <input
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