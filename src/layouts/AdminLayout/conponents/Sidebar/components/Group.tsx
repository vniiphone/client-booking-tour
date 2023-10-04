import React from 'react'

import classNames from 'classnames/bind';
import styles from './Group.module.scss';
const cl = classNames.bind(styles);

interface Props {
    title: string
    children: React.ReactNode
}

function Group({ title, children }: Props) {
    return (
        <div className={cl('wrapper')}>
            <div className={cl('title')}>{title}</div>
            <div className={cl('items')}>
            {children}
            </div>
        </div>
    )
}

export default Group
