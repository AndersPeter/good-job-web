import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <div className='text-2xl'>Loading...</div>
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute