import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
const cl = classNames.bind(styles)

function Footer() {
    return (
        <div className={cl('wrapper')}>
            <div className='grid wide'>
                <div className={cl('inner')}>
                    <div className='row'>
                        <div className='col l-3 m-4 c-6'>
                            <div className={cl('column')}>
                                <div className={cl('heading')}>LINK</div>
                                <ul className={cl('list')}>
                                    <li>
                                        <Link to='/tour' className={cl('item')}>
                                            Chuyến Đi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/Account' className={cl('item')}>
                                            Tài Khoản
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className='col l-3 m-4 c-6'>
                            <div className={cl('column')}>
                                <div className={cl('heading')}>Brands</div>
                                <ul className={cl('list')}>
                                    <li>
                                        <Link to='/' className={cl('item')}>
                                            Akko
                                        </Link>
                                    </li>
                                    <li>
                                        {' '}
                                        <Link to='/' className={cl('item')}>
                                            Logitech
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        <div className='col l-3 m-4 c-6'>
                            <div className={cl('column')}>
                                <div className={cl('heading')}>Thông Tin</div>
                                <div className={cl('members')}>
                                    <div className={cl('member')}>
                                        <div className={cl('student-id')}>
                                            B1910025
                                        </div>
                                        <div className={cl('student-name')}>
                                            Nguyễn Quốc Vũ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-3 m-4 c-6'>
                            <div className={cl('column')}>
                                <div className={cl('heading')}>Liên Hệ</div>
                                <div className={cl('text')}>
                                    <div className={cl('text-item')}>
                                        <span className={cl('label')}>
                                            Địa chỉ:
                                        </span>
                                        Số 66 Lê Lợi, Phường 3, Thành phố Sa Đéc, Tỉnh Đồng Tháp, Việt Nam
                                    </div>
                                    <div className={cl('text-item')}>
                                        <span className={cl('label')}>
                                            Di động:
                                        </span>
                                        +84 939 941 069
                                    </div>
                                    <div className={cl('text-item')}>
                                        <span className={cl('label')}>
                                            Giờ làm việc:
                                        </span>
                                       24/7
                                    </div>
                                    <div className={cl('text-item')}>
                                        <span className={cl('label')}>
                                            E-mail:
                                        </span>
                                        <Link className={cl('item')} to='/'>
                                           <> </>dulichvuan@gmail.com
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
