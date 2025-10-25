import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function NotificationsPanel() {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    targetAudience: 'all'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday',
      type: 'warning',
      date: '2024-01-10',
      sent: true
    },
    {
      id: 2,
      title: 'New Feature Released',
      message: 'Check out our new Zakah calculator',
      type: 'info',
      date: '2024-01-08',
      sent: true
    }
  ]);

  const handleChange = (e) => {
    setNotification({
      ...notification,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotification = {
      id: notifications.length + 1,
      ...notification,
      date: new Date().toISOString().split('T')[0],
      sent: false
    };
    setNotifications([newNotification, ...notifications]);
    setNotification({ title: '', message: '', type: 'info', targetAudience: 'all' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Notification */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create Notification</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Title"
              type="text"
              name="title"
              value={notification.title}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={notification.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={notification.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <select
                name="targetAudience"
                value={notification.targetAudience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Users</option>
                <option value="advisors">Advisors Only</option>
                <option value="clients">Clients Only</option>
              </select>
            </div>
            <Button type="submit" variant="primary">
              Send Notification
            </Button>
          </form>
        </div>

        {/* Notifications History */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Notification History</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-l-4 rounded ${
                  notif.type === 'info'
                    ? 'border-blue-500 bg-blue-50'
                    : notif.type === 'warning'
                    ? 'border-yellow-500 bg-yellow-50'
                    : notif.type === 'success'
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{notif.title}</h4>
                  <span className="text-xs text-gray-500">{notif.date}</span>
                </div>
                <p className="text-sm text-gray-700">{notif.message}</p>
                <span
                  className={`text-xs ${
                    notif.sent ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {notif.sent ? '✓ Sent' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPanel;
