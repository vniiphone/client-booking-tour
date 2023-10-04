import React from 'react'

import classNames from 'classnames/bind'
import styles from './FormWrapper.module.scss'
const cl = classNames.bind(styles)

interface Props {
    title: string
    description?: string
    className?: string
    children: React.ReactNode
}

function FormWrapper({ title, description, className, children }: Props) {
    return (
        <div className={`${className} ${cl('wrapper')}`}>
            <div className={cl('title')}>{title}</div>
            <div className={cl('description')}>{description}</div>
            <div className={cl('form')}>{children}</div>
        </div>
    )
}

export default FormWrapper
