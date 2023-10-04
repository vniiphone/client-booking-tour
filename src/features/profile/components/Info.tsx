import React from 'react'

import classNames from 'classnames/bind'
import styles from '../Profile.module.scss'
import { useAppSelector } from '../../../hooks'
import User from '../../../model/user'
const cl = classNames.bind(styles)

interface Props{
  user: User
}

function Info({user}:Props) {
   
    return (
        <div className={cl('info-wrapper')}>
            <div className={cl('image')}>
                <img
                    src='https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
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
