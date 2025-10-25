import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    bio: ''
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add profile update logic here
    console.log('Profile Update:', profileData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
