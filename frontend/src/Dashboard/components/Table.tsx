import React from 'react'

const Table: React.FC = () => {
  type TableData ={
    id: number,
    orderId: number,
    customer: string,
    status : string
  }
  const tableDatas: TableData [] = [
    {
      id: 1,
      orderId:1,
      customer:"John",
      status:"completed"
    },
    {
      id: 2,
      orderId:2,
      customer:"Mary",
      status:"pending"
    },
    {
      id: 3,
      orderId:3,
      customer:"Nate",
      status:"completed"
    },
    {
      id: 4,
      orderId:4,
      customer:"John",
      status:"pending"
    },

    {
      id: 5,
      orderId:5,
      customer:"John",
      status:"pending"
    },
  ]
  return (
<div className="mt-10 mb-3">
      <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
        {tableDatas.map ((tableData)=>(
            <tr key={tableData.id} className="text-center border-b">
            <td className="p-2">{tableData.orderId}</td>
            <td className="p-2">{tableData.customer}</td>
            <td className="p-2 text-green-500">{tableData.status}</td>
          </tr>  
            )
          )}
          </tbody>
      </table>
    </div>
  )
}

export default Table
