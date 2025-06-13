import { type ReactNode } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useCurrentToken } from '../../redux/features/auth/authSlice'
import { NavLink } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken)
    if (!token) {
        // If no token is found, redirect to login or show an error
        <NavLink to="/login" className="text-blue-500 hover:underline">
            Please login to access this page
        </NavLink>
        return null // Prevent rendering of children
    }
    return children

}

export default ProtectedRoute