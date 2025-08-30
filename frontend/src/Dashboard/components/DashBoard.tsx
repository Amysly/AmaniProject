import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import Cards from './Cards'
import Table from './Table'



const DashBoard: React.FC = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)

  useEffect(()=>{
    if (!user) {
      navigate('/login')
    }
  })
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
