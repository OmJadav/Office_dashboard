import React from "react";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
function Homepage() {
  return (
    <>
      <Navbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
          <Home />
        </div>
      </main>
    </>
  );
}

export default Homepage;
