'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '../../apiClient/apiClient';

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    details: '',
    datetime: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiClient = new ApiClient();
    if (!apiClient.isLoggedIn()) {
      window.location.href = '/unauthorized';
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.details.trim()) newErrors.details = 'Details are required';
    if (!formData.datetime.trim()) newErrors.datetime = 'Date and time are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validateForm()) {
      setLoading(true);
      try {
        const apiClient = new ApiClient();
        const response = await apiClient.addEvent(formData.name, formData.location, formData.details, formData.datetime);
        setSuccess(true);
        setFormData({ name: '', location: '', details: '', datetime: ''});
      } catch (err) {
        console.error('Error creating event:', err.response || err); // Debug log
        setErrors({ 
          submit: err.response?.data?.message || 'Failed to create event. Please try again.' 
        });
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 dark:bg-gray-900">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-6">

          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                    Create Event
                </h1>
        
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
            placeholder="Enter event name" 
          />
          {errors.name && (<p className="mt-1 text-sm text-red-500">{errors.name}</p>)}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            rows={4} 
            className={`w-full px-4 py-2 rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
            placeholder="Enter event location" 
          />
          {errors.location && (<p className="mt-1 text-sm text-red-500">{errors.location}</p>)}
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Details</label>
          <textarea 
            id="details" 
            name="details" 
            value={formData.details} 
            onChange={handleChange} 
            rows={4} 
            className={`w-full px-4 py-2 rounded-lg border ${errors.details ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
            placeholder="Enter event description" 
          />
          {errors.details && (<p className="mt-1 text-sm text-red-500">{errors.details}</p>)}
        </div>

        {/* Date and Time */}
        <div>
          <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date and Time</label>
          <div className="relative">
            <input 
              type="datetime-local" 
              id="datetime" 
              name="datetime"
              value={formData.datetime} 
              onChange={handleChange} 
              className={`w-full pl-8 pr-4 py-2 rounded-lg border ${errors.datetime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
            />
          </div>
          {errors.datetime && (<p className="mt-1 text-sm text-red-500">{errors.datetime}</p>)}
        </div>

        {/* Submit Button */}
        {errors.submit && (<p className="text-red-500 text-sm">{errors.submit}</p>)}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-indigo-950 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
        {success && (<p className="text-green-600 text-center mt-4">Event created successfully!</p>)}
      </form>
    </div>
  );
}