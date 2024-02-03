import React from "react";
import Navbar from "../components/Navbar";
import Report from "../components/Report";
function Reportpage() {
  return (
    <>
      <Navbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Report
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Report />
        </div>
      </main>
    </>
  );
}

export default Reportpage;
