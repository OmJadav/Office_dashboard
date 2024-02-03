import React from "react";
import Navbar from "../components/Navbar";
import Edit from "../components/EditProduct";

function Editpage() {
  return (
    <>
      <Navbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-3  sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit Product Details
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl flex justify-center py-6 sm:px-6 lg:px-8">
          <Edit />
        </div>
      </main>
    </>
  );
}

export default Editpage;
