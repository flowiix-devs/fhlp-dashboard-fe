import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Import toast

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', { // Ensure your backend port is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(data.message || 'Login failed. Please check your credentials.'); // Use toast
        return;
      }

      // Login successful
      toast.success('Login successful!'); // Optional success toast
      login(data); // Update auth context with user data and token
      navigate('/patient-dashboard'); // Redirect to a protected route (e.g., dashboard)

    } catch (err) {
      setLoading(false);
      toast.error('An error occurred. Please try again later.'); // Use toast
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-grayLight)' }} className="min-h-screen flex flex-col items-center justify-center p-4">
      <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="FedHealth Logo" className="h-16 w-auto" />
        </div>
        <h2 style={{ color: 'var(--color-textBlack)' }} className="text-3xl font-bold text-center mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <a href="#" style={{ color: 'var(--color-textBlue)' }} className="font-medium hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            style={{ backgroundColor: 'var(--color-textBlue)', color: 'white' }}
            className="w-full py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity duration-150"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p style={{ color: 'var(--color-grayMedium)' }} className="text-sm text-center mt-8">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-textBlue)' }} className="font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
