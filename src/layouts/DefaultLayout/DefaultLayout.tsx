import React from 'react'
import Header from '../../components/__layout/Header'
import Footer from '../../components/__layout/Footer'

interface Props {
    children: React.ReactNode
}

function DefaultLayout({ children }: Props) {
    return (
        <div>
            <Header></Header>
            <div className='grid wide' style={{ overflow: 'visible' }}>
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout
