import React from 'react'
import Cards from './Cards'
import Table from './Table'



const DashBoard: React.FC = () => {
  return (
    <>
          <div className="p-3">
          <Cards />
          <Table />
        </div>
</>

  )
}

export default DashBoard
