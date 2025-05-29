'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '../../apiClient/apiClient';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiClient = new ApiClient();
        if (!apiClient.isLoggedIn()) {
          window.location.href = '/unauthorized';
          return;
        }
        const response = await apiClient.getEvents();
        setEvents(response);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {event.location}
                </p>
                  <p className="text-lg font-semi text-gray-900 dark:text-white">
                    {event.details}
                  </p>
                  <div className="text-md text-blue-600 dark:text-white">
                  {new Date(event.datetime).toLocaleDateString(undefined, options)} at {new Date(event.datetime).toLocaleTimeString()}
                  </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                <form action="/api/contact" method="POST">
                  <input type="hidden" name="adId" value={event.id} />
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Contact Seller
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}