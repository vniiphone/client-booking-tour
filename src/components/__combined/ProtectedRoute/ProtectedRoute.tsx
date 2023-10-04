import { Navigate } from 'react-router-dom'
import Unauthorized from '../../../features/unauthorized'
import { useAppSelector } from '../../../hooks'

interface Props {
    role?: string
    children: any
}

function ProtectedRoute({ role, children }: Props) {
    const user = useAppSelector((state) => state.auth)
    let Content: any = ''
    switch (role) {
        case undefined:
            Content = children
            break
        case 'user':
            if (user?.id) Content = children
            else Content = <Navigate to='/login' replace />
            break
        case 'admin':
            if (user?.role === 'admin') Content = children
            else if (user.hasOwnProperty('id')) Content = <Unauthorized />
            else Content = <Navigate to='/' replace />
            break
        default:
            throw new Error('Unknow role')
    }

    return Content
}

export default ProtectedRoute
