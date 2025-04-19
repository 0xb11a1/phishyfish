"use client";
// import { useState } from "react";
import { useState, useEffect } from "react";
// import { DNA } from "react-loader-spinner";
import { getCookie } from "cookies-next";
var fdata = "";
try {
  const res = await fetch(`${process.env.API_URL}/visitors`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "X-API-Key": getCookie("API_KEY"),
    },
  });
  fdata = await res.json();
} catch (error) {}
function GeneralInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState(fdata);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/visitors`, {
          method: "GET",
          cache: "no-cache",
          headers: {
            "X-API-Key": getCookie("API_KEY"),
          },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {}
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Visitors
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white dark:bg-gray-700 rounded-lg shadow flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Visitors
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="p-4 space-y-4 overflow-y-auto"
              style={{ maxHeight: "60vh" }}
            >
              {data.map((visitor, i) => (
                <p
                  key={i}
                  className="text-base text-gray-500 dark:text-gray-400 text-left"
                >
                  {visitor.id} : {visitor.visit_count}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneralInfo;
