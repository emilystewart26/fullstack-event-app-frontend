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
    
    <div className="bg-purple-700">
      
      {/* Navbar */}
      <nav className="bg-indigo-950">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">EventApp</span>
        </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-950 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-indigo-950">
        <li>
          <a href="events" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0">Browse</a>
        </li>
        <li>
          <a href="create" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0">Post</a>
        </li>
        <li>
          <a href="user" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
      <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Browse Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.location}
                </p>
                  <p className="text-lg font-semi text-gray-900 dark:text-white">
                    {event.details}
                  </p>
                  <div className="text-md text-blue-600 dark:text-white">
                  {new Date(event.datetime).toLocaleDateString(undefined, options)} at {new Date(event.datetime).toLocaleTimeString()}
                  </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <form action="/api/contact" method="POST">
                  <input type="hidden" name="adId" value={event.id} />
                  <button 
                    type="submit"
                    className="w-full bg-indigo-950 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buy Tickets
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}