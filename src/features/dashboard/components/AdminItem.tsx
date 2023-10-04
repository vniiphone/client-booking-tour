import React from 'react'
import classNames from 'classnames/bind'
import styles from '../Dashboard.module.scss'
import { UsergroupAddOutlined } from '@ant-design/icons'
const cl = classNames.bind(styles)

interface Props {
    title: string
    value: string | number
    description: string
    icon: any
}
function AdminItem({ title, value, description, icon }: Props) {
    return (
        <div className={cl('item')}>
            <div className={cl('item-top')}>
                {icon}
                {/* <UsergroupAddOutlined className={cl('item-icon')} /> */}
                <div className={cl('item-title')}>{title}</div>
            </div>
            <div className={cl('item-value')}>{value}</div>
            <div className={cl('item-desc')}>{description}</div>
        </div>
    )
}

export default AdminItem
