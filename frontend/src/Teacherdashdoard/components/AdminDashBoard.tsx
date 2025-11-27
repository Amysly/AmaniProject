import Cards from './Cards'
import Table from './Table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminDashBoard: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (!user) {
      // not logged in → send to login
      navigate('/login')
    } else if (user.role !== 'admin') {
      // logged in but not admin → send to student dashboard
      navigate('/dashboard')
    }
  }, [user, navigate]) 

  return (
    <div className="p-3">
      <Cards />
      <Table />
    </div>
  )
}

export default AdminDashBoard
