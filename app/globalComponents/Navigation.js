"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-indigo-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            EventApp
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-950 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-indigo-950">
            <li>
              <Link href="/events" className="px-4 py-1 text-white rounded-full font-medium">Browse</Link>
            </li>
            <li>
              <Link href="/create" className="px-4 py-1 text-white rounded-full font-medium">Post</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 bg-white text-indigo-950 rounded-full font-medium"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/user"
                  className="px-4 py-1 bg-white text-indigo-950 rounded-full font-medium"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;