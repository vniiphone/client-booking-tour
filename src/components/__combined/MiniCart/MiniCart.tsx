import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Divider, Empty, Spin } from 'antd'
import { useSelector } from 'react-redux'

import MiniCartItem from './MiniCartItem'
import Button from '../../__atom/Button'
import { getCart } from '../../../services'

import classNames from 'classnames/bind'
import styles from './MiniCart.module.scss'
import { useAppSelector } from '../../../hooks'
import CartItem from '../../../model/cart-item'
import formatCurrency from '../../../utils/formatCurrency'
import { useState } from 'react'
const cl = classNames.bind(styles)

function MiniCart() {
    const user = useAppSelector((state) => state.auth)
    const [cartList, setCartList] = useState();
    const bookingQuery = useQuery(
        ['booking'],
        () => getCart({ user_id: user?.id })
    )


    return (

        <div className={cl('wrapper')}>
            {bookingQuery.isLoading ? (
                <Spin />
            ) : bookingQuery.data.length < 1 ? (
                <h3> Null</h3>
                // <Empty />
            ) : (
                bookingQuery.data.map((x: CartItem) => (
                    <MiniCartItem key={x.id} {...x} />
                ))
            )}
            <Divider />
            <div className={cl('sub-total')}>
                <span>Tổng cộng:</span>
                <span>
                    {formatCurrency(
                        bookingQuery?.data?.reduce(
                            (acc: number, item: CartItem) =>
                                (acc += item.soLuongVe * item.tour.giaThamKhao),
                            0
                        )
                    )}
                </span>
            </div>
            <Button className={cl('button')} to='/checkout' type='primary'>
                Đặt Vé
            </Button>
            <Link className={cl('link')} to='/cart'>
                Xem Tour Đang Yêu Thích
            </Link>
        </div>

    )
}

export default MiniCart
