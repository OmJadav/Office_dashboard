import React from "react";
import Navbar from "../components/Navbar";
import Expense from "../components/Expense";

function Expensespage() {
  return (
    <>
      <Navbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Expenses
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl  py-6 sm:px-6 lg:px-8">
          <Expense />
        </div>
      </main>
    </>
  );
}

export default Expensespage;
