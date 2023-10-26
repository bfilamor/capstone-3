import React, { useState } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false)

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
            setMessage('Passwords do not match');
            return; //end function
        }

        try {
            const token = localStorage.getItem("token"); // Replace with your actual JWT token
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword: password }),
            });

            if (response.ok) {
                setMessage('Password reset successfully');
                setPassword('');
                setConfirmPassword('');
                setError(false)
            } else {
                const errorData = await response.json();
                setError(true)
                setMessage(errorData.message);

            }
        } catch (error) {
            setError(true)
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {
                    message && error === true ? <div className="alert alert-danger">{message}</div> : message && error === false ? <div className="alert alert-success">{message} </div> : null

                }
                <button type="submit" className="btn btn-dark">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
