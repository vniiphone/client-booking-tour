import React from 'react'
import Header from './conponents/Header'
import Sidebar from './conponents/Sidebar'

interface Props {
    children: React.ReactNode
}

function AdminLayout({ children }: Props) {
    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
            <div className='admin-content'>
                <div className='grid'>{children}</div>
            </div>
        </>
    )
}

export default AdminLayout
