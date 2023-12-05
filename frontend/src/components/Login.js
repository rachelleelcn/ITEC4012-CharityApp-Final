import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {HouseHeartFill} from "react-bootstrap-icons";
import {login} from "../services/apiServices";


function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password)
            .then(() => {
                props.onLoginSuccess(); // Set authentication status in parent component
                navigate('/explore'); // Navigate to explore
            })
            .catch(error => {
                console.error('Login failed:', error);
                document.getElementById("loginError").innerHTML = "Incorrect username or password.";
            });
    };

    return (
        // Login page
        <div className="container p-5">
            <div className="col-lg-6 col-md-12 mt-5">
                <div className="d-flex align-items-center">
                    <div className="me-4"><HouseHeartFill size={56}/></div>
                    <h1 className="mt-2">Welcome to MyCharityHub</h1>
                </div>
                <h4 className="mt-5">Login</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-4">
                        <label htmlFor="login_username">Username</label>
                        <input
                            type="text" className="form-control" id="login_username" required
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="login_password">Password</label>
                        <input
                            type="password" className="form-control" id="login_password" required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <p id="loginError" className="text-danger mt-3 mb-0"></p>
                    <button type="submit" className="btn btn-primary px-5 mt-4">Login</button>



                </form>
                <div className="mt-4">
                    <small className="text-muted">Don’t have an account? <a href="#">Sign up</a></small>
                </div>
            </div>
        </div>

    )
}

export default Login;



