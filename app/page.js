"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-purple-700">          
      {/* Navbar - moved to Navigation.js*/}
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Want to publicise your event?</h1>
        <p className="text-3xl text-white mb-8 max-w-2xl mx-auto">
          You've come to the right place.
        </p>
      </div>

      {/* CTA Section */}
          <p className="text-white mb-8 max-w-2xl mx-auto text-center">
            Join thousands of users who are already posting their events and reaching their target audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create">
          <button type="submit" className="px-8 py-3 bg-indigo-950 text-white rounded-full font-medium">
            Post a new Event
          </button>
          </Link>
          <Link href="/events">
          <button type="submit" className="px-8 py-3 bg-indigo-950 text-white rounded-full font-medium">
            Browse Events
          </button>
          </Link>
        </div>
        

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl sm:text-1xl md:text-2xl font-bold text-white mb-6">
          Why choose us?</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-950 mb-2">Easy Posting</h3>
            <p className="text-gray-600">Create and publish your events in minutes with our simple interface.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-950 mb-2">Wide Reach</h3>
            <p className="text-gray-600">Get your events seen by thousands of people.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-950 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your events are safe with our secure and reliable platform.</p>
          </div>
        </div>
      </div>

      

      {/* Footer - moved to globalComponents */}

    </div>
  );
}
