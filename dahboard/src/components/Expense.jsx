import React from "react";
function Expense() {
  return (
    <div className="text-center">
      <div className="text-2xl text-red-600 mb-4">
        This page is under construction, and it will be completed only after I
        receive my payment of 2000/-.
      </div>
      <div className="mx-auto max-w-1/2">
        <img
          src="https://raw.githubusercontent.com/OmJadav/images/main/qr_code.jpg"
          alt=""
          className="max-w-full h-auto mx-auto qr-img"
        />
      </div>
      <div className="text-2xl text-red-600 mt-2">
        <p>It took 18 hours to complete this much</p>
      </div>
    </div>
  );
}

export default Expense;
