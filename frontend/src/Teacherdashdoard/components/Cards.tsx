import React from 'react';
import { FaUser, FaDollarSign, FaExclamationCircle } from 'react-icons/fa';

const Cards: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5">
      {/* Users Card */}
      <div className="p-5 bg-blue-500 text-white rounded-lg shadow flex items-center">
        <div className="mr-4 border border-white p-3 rounded-full">
          <FaUser size={30} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Users</h3>
          <p>There are currently 100 active users.</p>
        </div>
      </div>

      {/* Sales Card */}
      <div className="p-5 bg-green-500 text-white rounded-lg shadow flex items-center">
        <div className="mr-4 border border-white p-3 rounded-full">
          <FaDollarSign size={30} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Sales</h3>
          <p>Sales this month: <span className="font-bold">$5000</span></p>
        </div>
      </div>

      {/* Errors Card */}
      <div className="p-5 bg-red-500 text-white rounded-lg shadow flex items-center">
        <div className="mr-4 border border-white p-3 rounded-full">
          <FaExclamationCircle size={30} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Errors</h3>
          <p>There have been <span className="font-bold">2</span> errors reported.</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
