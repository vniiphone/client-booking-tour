import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './UserOrder.module.scss'
import List from './components/List'
const cl = classNames.bind(styles)

function UserOrder() {
    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <div>My orders</div>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('main')}>
                <div className={cl('heading')}>MY ORDERS</div>
                <List></List>
            </div>
        </div>
    )
}

export default UserOrder
