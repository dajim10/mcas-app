import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
        // Check if the user is logged in
        if (token) {
            navigate('/')
        }
    }
        , [token]);



    const handleLogin = async (event) => {
        event.preventDefault();

        // Replace 'your-api-endpoint' with the actual endpoint of your REST API
        const apiEndpoint = `${import.meta.env.VITE_API_URL}/elogin`;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });




            const data = await response.json();
            // Save the token in local storage
            if (!data.token) {
                Swal.fire({
                    title: 'Fail to login !',
                    text: 'Error username or password',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                return;
            }

            localStorage.setItem('token', data.token);

            // Handle the API response
            // console.log(data);
            navigate('/')
            // You can redirect to another page or perform other actions based on the response
        } catch (error) {
            console.error('Error:', error.message);

        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center ">Please Login</div>

                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        placeholder='user.n ไม่ต้องใส่ @rmutsv.ac.th'
                                        autoFocus
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="password">Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="field-icon"
                                            onClick={handleTogglePassword}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2 form-control">
                                    เข้าสู่ระบบ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
