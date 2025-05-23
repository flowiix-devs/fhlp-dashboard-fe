import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Keep this for form-level errors if needed
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!"); // Use toast for error
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', { // Ensure your backend port is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.errors) {
            const errorMessages = Object.values(data.errors).join('\n');
            // Display each validation error as a separate toast or a single one
            Object.values(data.errors).forEach(errMsg => toast.error(errMsg));
            setError(errorMessages); // Optionally still set local error state for display within the form
        } else {
            toast.error(data.message || 'Registration failed. Please try again.');
            setError(data.message || 'Registration failed. Please try again.');
        }
        return;
      }

      // Registration successful
      console.log('Registration successful:', data);
      toast.success('Registration successful! Please log in.'); // Use toast for success
      navigate('/login'); // Redirect to login page

    } catch (err) {
      setLoading(false);
      toast.error('An error occurred. Please try again later.'); // Use toast for general error
      setError('An error occurred. Please try again later.'); // Optionally set local error
      console.error('Registration error:', err);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-grayLight)' }} className="min-h-screen flex flex-col items-center justify-center p-4">
      <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-8 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="FedHealth Logo" className="h-16 w-auto" />
        </div>
        <h2 style={{ color: 'var(--color-textBlack)' }} className="text-3xl font-bold text-center mb-8">
          Create Your Account
        </h2>
        {/* You can choose to remove the local error display if toasts are sufficient */}
        {error && !toast.isActive && <p className="text-sm text-center text-red-500 mb-4">{error.split('\n').map((line, i) => (<span key={i}>{line}<br/></span>))}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label htmlFor="emailReg" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="emailReg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor="passwordReg" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="passwordReg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" style={{ color: 'var(--color-grayMedium)' }} className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-var(--color-textBlue) focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: 'var(--color-textBlue)', color: 'white' }}
            className="w-full py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity duration-150 mt-2"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p style={{ color: 'var(--color-grayMedium)' }} className="text-sm text-center mt-8">
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-textBlue)' }} className="font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
