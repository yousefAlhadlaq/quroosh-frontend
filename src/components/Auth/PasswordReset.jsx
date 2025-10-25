import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log('Password reset for:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary">
              Send Reset Link
            </Button>
            <p className="text-center mt-4">
              <a href="/login" className="text-blue-600 hover:underline">
                Back to Login
              </a>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Password reset link has been sent to your email!
            </p>
            <a href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordReset;
