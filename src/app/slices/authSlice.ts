import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

import User from '../../model/user'

const strUser = localStorage.getItem('user') || '{}'
const initialState: User = JSON.parse(strUser)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            message.success('Login successfully')
            return action.payload
        },
        logout: (state) => {
            localStorage.removeItem('user')
            message.info('Good bye')
            const initialState: User = JSON.parse(
                localStorage.getItem('user') || '{}'
            )
            return initialState
        },
        changeEmail: (state, action) => {
            const newUserInfo = { ...state, email: action.payload }
            localStorage.setItem('user', JSON.stringify(newUserInfo))
            return newUserInfo
        },
    },
})

export const { loginSuccess, logout, changeEmail } = authSlice.actions

export default authSlice.reducer
