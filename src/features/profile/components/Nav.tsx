import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from '../Profile.module.scss'
import {
    CodepenOutlined,
    PoweroffOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
const cl = classNames.bind(styles)

function Nav() {
    return (
        <div className={cl('nav-wrapper')}>
            <Link to='/' className={cl('link')}>
                <CodepenOutlined />
                Products
            </Link>
            <Link to='/' className={cl('link')}>
                <ShoppingCartOutlined />
                Your cart
            </Link>
            <Link to='/' className={cl('link')}>
                <PoweroffOutlined />
                Logout
            </Link>
        </div>
    )
}

export default Nav
