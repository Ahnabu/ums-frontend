import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout, useCurrentToken, type TUser } from '../../redux/features/auth/authSlice'
import { verifyToken } from '../../utils/verifyToken';
import { Navigate } from 'react-router-dom';
type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);

    let user;

    if (token) {
        user = verifyToken(token);
    }

    const dispatch = useAppDispatch();

    if (role !== undefined && role !== (user as TUser)?.role) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute