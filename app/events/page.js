'use client';
import { useEffect, useState } from 'react';
import { ApiClient } from '../../apiClient/apiClient';
import Link from "next/link"

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [editForm, setEditForm] = useState ({
    name: '',
    location: '',
    details: '',
    date: ''
  });
  
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
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
  }, [events]);

  // DELETE - Works but needs further review 
 const deleteEvent = async (id) => {
  if (!id) {
    setError('Invalid event ID.');
    return;
  }
  setLoading(true);
  setSuccess(false);
  try {
    const apiClient = new ApiClient();
    const response = await apiClient.removeEvent(id);
    if (response.data) {setSuccess(true)};
    return; 
  } catch (err) {
    setError(err?.response?.data?.message || 'Failed to delete event. Please try again later.');
  } finally {
    setLoading(false);
  }
};
//=============================


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
      
      {/* Navbar - moved to Navigation.js in globalComponents*/}

      
      <div className="min-h-screen max-w-screen mx-10 p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Browse Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-content-stretch">
          {events.map((event) => (
            <div 
              key={event._id}
              className="bg-white rounded-xl  overflow-hidden hover:shadow-md shadow-gray-900 transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-950 mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-700 mb-4">
                  {event.location}
                </p>
                  <p className="text-md font-normal text-gray-900 line-clamp-3 mb-2">
                    {event.details}
                  </p>
                  <div className="text-lg font-normal text-blue-800 mb-2">
                  {new Date(event.datetime).toLocaleDateString(undefined, options)} at {new Date(event.datetime).toLocaleTimeString().slice(0,5)}
                  </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-5">
                {/*<form action="/api/contact" method="POST">
                  <input type="hidden" name="eventId" value={event.id} />
                  <button 
                    type="submit"
                    className="w-full bg-indigo-950 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buy Tickets
                  </button>
                </form>*/}
                <button 
                    className="w-full bg-indigo-950 text-white py-2 px-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setEditEvent(event);
                      setEditForm({
                        id: event._id,
                        name: event.name, 
                        location: event.location,
                        details: event.details,
                        datetime: event.datetime
                      })
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    className="w-full bg-indigo-950 text-white py-2 px-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={()=> deleteEvent(event._id)}
                  >
                    Delete
                  </button>
              </div>
            </div>
          ))}

{/* ==== Conditional rendering for edit event form ==== */}
{editEvent && editForm && (
  <div className="min-h-screen flex items-center justify-center bg-purple-700 dark:bg-gray-900">
    <form className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center"> Edit Event </h1>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Enter event name"
          value={editForm.name || ''} 
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className={`w-full px-4 py-2 rounded-lg border ${error?.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
        <input 
          type="text" 
          id="location" 
          name="location" 
          placeholder="Enter event location" 
          value={editForm.location || ''} 
          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} 
          className={`w-full px-4 py-2 rounded-lg border ${error?.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
        />
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Details</label>
        <textarea 
          id="details" 
          name="details" 
          placeholder="Enter event description"
          value={editForm.details || ''} 
          onChange={(e) => setEditForm({ ...editForm, details: e.target.value })} 
          rows={4} 
          className={`w-full px-4 py-2 rounded-lg border ${error?.details ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}    
        />
      </div>

      {/* Date and Time */}
      <div>
        <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date and Time</label>
        <input 
          type="datetime-local" 
          id="datetime" 
          name="datetime"
          value={editForm.datetime || ''} 
          onChange={(e) => setEditForm({ ...editForm, datetime: e.target.value })} 
          className={`w-full px-4 py-2 rounded-lg border ${error?.datetime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
        />
      </div>

      {/* Submit/Cancel Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-5">
      <button
          className="w-full bg-indigo-950 text-white py-2 px-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => {
            setEditEvent(null);
            setEditForm(null);
          }}
        >
          Cancel
        </button>

        <button 
          className="w-full bg-indigo-950 text-white py-2 px-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={async () => {
            const apiClient = new ApiClient();
            try {
              await apiClient.updateEvent(editForm.id, editForm.name, editForm.location, editForm.details, editForm.datetime);
              setEditEvent(null); 
              setEditForm(null); 
              window.location.reload();
            } catch (error) {
              const message = error.response?.data?.message || "Update failed.";
              alert(message);
              console.error("Update failed", error.response?.data || error.message);
            }
          }}
        >
          Save 
        </button>

      </div>
    </form>
  </div>
)}
{/* ========================================*/}

        </div>
      )}
    </div>
    </div>
  );
}