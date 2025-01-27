import React, { useState } from 'react'
import './RegisterMobileView.css'
import { url } from '../../../../utils/api';
import { Link } from 'react-router-dom';


const RegisterMobileView = ({ mobileSignupClicked, handleRegisterView }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation for the form
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError('');
        setLoading(true);

        // Prepare FormData
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);

        try {
            // Send POST request with FormData to the API
            const response = await fetch(`${url}/api/v1/web-users/add`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // Handle success (e.g., show success message, reset form, etc.)
                alert('Sign up successful!');
                // Optionally reset the form here
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                // Handle error
                setError(result.message || 'Something went wrong');
            }
        } catch (error) {
            // Handle network error
            setError('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`mobile-register-main ${mobileSignupClicked ? 'slide-register-left' : ''}`}>
            <div className='mobile-register-top-heading'>
                <p>Already have an account?</p>
                <button onClick={handleRegisterView}>Sign in</button>
            </div>
            <div className='mobile-register-content'>
                <h3 className='mobile-register-heading'>Register</h3>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label className="mobile-login-input-label">
                        <p>First Name<span style={{ color: "var(--icon-color)" }} >*</span></p>
                        <input
                            className="login-and-register-input"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="mobile-login-input-label">
                        <p>Last Name<span style={{ color: "var(--icon-color)" }} >*</span></p>
                        <input
                            className="login-and-register-input"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="mobile-login-input-label">
                        <p>Email<span style={{ color: "var(--icon-color)" }} >*</span></p>
                        <input
                            className="login-and-register-input"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="mobile-login-input-label">
                        <p>Password<span style={{ color: "var(--icon-color)" }} >*</span></p>
                        <input
                            className="login-and-register-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label className="mobile-login-input-label">
                        <p>Confirm Password<span style={{ color: "var(--icon-color)" }} >*</span></p>
                        <input
                            className="login-and-register-input"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label className="mobile-login-input-label checkbox">
                        <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            required
                        />
                        <span>I agree to the <Link >Privacy Policy</Link></span>
                    </label>
                    <label className="mobile-login-input-label checkbox">
                        <input
                            type="checkbox"
                            checked={acceptPrivacy}
                            onChange={(e) => setAcceptPrivacy(e.target.checked)}
                            required
                        />
                        <span>I agree to the <Link >Privacy Policy</Link></span>
                    </label>


                    {/* Error message */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Submit Button */}
                    <button className="signup-button mobile-view-register-btn" type="submit">Register</button>
                </form>


              
            </div>
        </div>
    )
}

export default RegisterMobileView
