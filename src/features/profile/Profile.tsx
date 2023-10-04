import React from 'react'

import Form from './components/Form'
import InfoForm from './components/InfoForm'
import Info from './components/Info'
import Nav from './components/Nav'

import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import { useAppSelector } from '../../hooks'
const cl = classNames.bind(styles)

function Profile() {
    const user = useAppSelector((state) => state.auth)
    return (
        <div className={cl('wrapper')}>
            <div className='row'>
                <div className='col l-4 m-6 c-12'>
                    <Info user={user}></Info>
                    <Nav></Nav>
                </div>
                <div className='col l-8 m-6 c-12'>
                    <InfoForm user={user}/>
                    <Form></Form>
                </div>
            </div>
        </div>
    )
}

export default Profile
