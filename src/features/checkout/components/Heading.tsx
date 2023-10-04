import React from 'react'
import classNames from 'classnames/bind'
import styles from '../Checkout.module.scss'
const cl = classNames.bind(styles)

function Heading({ children }: { children: React.ReactNode }) {
    return <div className={cl('subheading')}>{children}</div>
}

export default Heading
