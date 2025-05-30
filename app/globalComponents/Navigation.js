"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "../../apiClient/apiClient";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false); // hydration flag

  useEffect(() => {
    setHasHydrated(true);
    setIsLoggedIn(apiClient.isLoggedIn());

    const handleStorageChange = () => {
      setIsLoggedIn(apiClient.isLoggedIn());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    apiClient.logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-indigo-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">EventApp</span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-950 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-indigo-950">
            <li>
              <Link href="/events" className="px-4 py-1 bg-indigo-950 text-white rounded-full font-medium">Browse</Link>
            </li>
            <li>
              <Link href="/create" className="px-4 py-1 bg-indigo-950 text-white rounded-full font-medium">Post</Link>
            </li>
            {/* Only render this part after hydration */}
            {hasHydrated && (
              isLoggedIn ? (
                <li
                    onClick={handleLogout}
                    className="px-4 py-1 bg-white text-indigo-950 rounded-full font-medium"
                  >
                    Logout
                </li>
              ) : (
                <li>
                  <Link href="/user" className="px-4 py-1 bg-white text-indigo-950 rounded-full font-medium">Login</Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;