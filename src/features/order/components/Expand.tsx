import React from 'react'

import classNames from 'classnames/bind'
import styles from '../Order.module.scss'
import Product from '../../../model/tour'
import CartItem from '../../../model/cart-item'
import Item from './Item'
import Address from '../../../model/address'
const cl = classNames.bind(styles)

function Expand({ record, address }: { record: CartItem[]; address: Address }) {
    return (
        <div className={cl('wrapper')}>
            <div className={cl('row')}>
                <span className={cl('label')}>Address:</span>
                <span
                    className={cl('value')}
                >{`${address.address}, ${address.ward.name}, ${address.ward.district.name}, ${address.ward.district.city.name}`}</span>
            </div>
            <div className={cl('row')}>
                <span className={cl('label')}>Phone:</span>
                <span
                    className={cl('value')}
                >{address.phone}</span>
            </div>
            {record.map((x) => (
                <Item key={x.id} item={x} />
            ))}
        </div>
    )
}

export default Expand
