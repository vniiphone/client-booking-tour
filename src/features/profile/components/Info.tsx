import React from 'react'

import classNames from 'classnames/bind'
import styles from '../Profile.module.scss'
import { useAppSelector } from '../../../hooks'
import User from '../../../model/user'
const cl = classNames.bind(styles)
import image4 from "../../../assets/img/global/7158459.jpg"
interface Props {
    user: User
}

function Info({ user }: Props) {

    return (
        <div className={cl('info-wrapper')}>
            <div className={cl('image')}>
                <img
                    src={image4}
                    alt=''
                    className={cl('img')}
                />
            </div>
            <div className={cl('name')}>{user.username}</div>
            <div className={cl('email')}>{user.email}</div>
        </div>
    )
}

export default Info
