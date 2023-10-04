import React from 'react'
import {Link} from 'react-router-dom'
import { Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import UserMenu from '../../../../components/__combined/UserMenu'

import logo from '../../../../assets/img/global/logo.png'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cl = classNames.bind(styles)

function Header() {
    return (
        <div className={cl('wrapper')}>
            <Link to='/'><img src={logo} alt='logo' className={cl('logo')} /></Link>
            <Popover
                trigger={'click'}
                content={<UserMenu />}
                title={null}
                placement='bottomRight'
            >
                <UserOutlined className={cl('icon')} />
            </Popover>
        </div>
    )
}

export default Header
