import React from 'react'
import {
    ShoppingOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    DashboardOutlined,
    CreditCardOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './UserMenu.module.scss'
import { useAppSelector } from '../../../hooks'
import { useDispatch } from 'react-redux'
import { logout } from '../../../app/slices/authSlice'
const cl = classNames.bind(styles)

interface Props {}

function UserMenu({}: Props) {
    const user = useAppSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className={cl('wrapper')}>
            {user.hasOwnProperty('id') ? (
                <>
                    <div className={cl('name')}>Hello, {user.username}</div>
                    {user.role === 'admin' && (
                        <Link to='/admin/dashboard' className={cl('item')}>
                            <DashboardOutlined className={cl('icon')} />
                            Admin
                        </Link>
                    )}
                    <Link to='/cart' className={cl('item')}>
                        <ShoppingOutlined className={cl('icon')} />
                        Cart
                    </Link>
                    <Link to='/invoice' className={cl('item')}>
                        <CreditCardOutlined className={cl('icon')} />
                        Orders
                    </Link>
                    <Link to='/profile' className={cl('item')}>
                        <UserOutlined className={cl('icon')} />
                        Account
                    </Link>

                    <div onClick={handleLogout} className={cl('item')}>
                        <LogoutOutlined className={cl('icon')} />
                        Logout
                    </div>
                </>
            ) : (
                <>
                    <div className={cl('name')}>GUEST</div>
                    <Link to='/login' className={cl('item')}>
                        <LoginOutlined className={cl('icon')} />
                        Login
                    </Link>
                    <Link to='/register' className={cl('item')}>
                        <UserOutlined className={cl('icon')} />
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}

export default UserMenu
