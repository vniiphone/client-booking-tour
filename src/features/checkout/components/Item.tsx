import React from 'react'
import classNames from 'classnames/bind'
import styles from '../Checkout.module.scss'
const cl = classNames.bind(styles)

interface Props {
    label: string
    value: string | number
    bold?: boolean
}

function Item({ label, value, bold }: Props) {
    return (
        <div className={cl('item')}>
            <span>{label}</span>
            <span className={cl('', { bold })}>{value}</span>
        </div>
    )
}

export default Item
