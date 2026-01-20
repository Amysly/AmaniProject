import Cards from './components/Cards'
import Table from './components/Table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LecturerDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (!user) {
      // not logged in → send to login
      navigate('/login')
    } else if (user.role !== 'lecturer') {
      // logged in but not lecturer → send to student dashboard
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

export default LecturerDashboard
