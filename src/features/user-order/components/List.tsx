import React from 'react'

import classNames from 'classnames/bind'
import styles from '../UserOrder.module.scss'
import { getUserOrders } from '../services'
import { useAppSelector } from '../../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'
import Item from './Item'
import Invoice from '../../../model/invoice'
const cl = classNames.bind(styles)

function List() {
    const user = useAppSelector((state) => state.auth)
    const myOrdersQuery = useQuery(['my-orders'], () => getUserOrders(user.id))

    return (
        <div className={cl('list')}>
            {myOrdersQuery?.data?.map((x:Invoice) => (
                <Item invoice={x} key={x.invoiceId}></Item>
            ))}
        </div>
    )
}

export default List
