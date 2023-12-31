import React, { useState } from 'react';
import { login } from '../service/dataservice';
import { useUserContext } from '../contexts/user-context'; // Import the useUserContext hook
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUserContext(); // Use the loginUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      console.log('Login Data:', data);

      // Store the token in localStorage and set user authentication
      localStorage.setItem('token', data.token);
      loginUser(data.user);

      // Redirect to '/postList' after successful login
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
