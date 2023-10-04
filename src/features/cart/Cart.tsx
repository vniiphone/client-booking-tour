import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Empty, Spin } from 'antd'
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQueryClient, useQuery } from '@tanstack/react-query'

import Item from './components/CartItem'
import Button from '../../components/__atom/Button'
import { getCart } from '../../services'
import { useAppSelector } from '../../hooks'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import CartItem from '../../model/cart-item'
import formatCurrency from '../../utils/formatCurrency'
const cl = classNames.bind(styles)

function Cart() {
    const user = useAppSelector((state) => state.auth)
    const cartQuery = useQuery(
        ['cart'],
        () => getCart({ user_id: user?.id }),
        {}
    )

    // const handleClearCart = () =>{
    //     cartQuery?.data?.forEach((x:CartItem)=>{

    //     })
    // }
    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/cart'>Cart</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('main')}>
                <div className={cl('heading')}>SHOPPING CART</div>
                <div className={`row ${cl('content')}`}>
                    <div className={`col l-8 m-8 c-12 ${cl('items')}`}>
                        {cartQuery.isLoading ? (
                            <Spin />
                        ) : cartQuery.data.length < 1 ? (
                            <Empty />
                        ) : (
                            cartQuery.data.map((x: CartItem) => (
                                <Item key={x.id} {...x} />
                            ))
                        )}
                        <div className={cl('tools')}>
                            <Link className={cl('tool')} to='/'>
                                <LeftOutlined className={cl('icon')} /> CONTINUE
                                SHOPPING
                            </Link>
                            <div className={cl('tool')}>
                                <DeleteOutlined className={cl('icon')} /> CLEAR
                                SHOPPING CART
                            </div>
                        </div>
                    </div>
                    <div className={`col l-4 m-4 c-12`}>
                        <div className={cl('summary')}>
                            <div className={cl('total')}>
                                <div className={cl('label')}>SUBTOTAL:</div>
                                <div>
                                    {' '}
                                    {formatCurrency(
                                        cartQuery?.data?.reduce(
                                            (acc: number, item: CartItem) =>
                                                (acc +=
                                                    item.quantity *
                                                    item.product.price),
                                            0
                                        )
                                    )}
                                </div>
                            </div>
                            <div className={cl('total')}>
                                <div className={cl('label', 'bold')}>
                                    GRAND TOTAL:
                                </div>
                                <div>
                                    {formatCurrency(
                                        cartQuery?.data?.reduce(
                                            (acc: number, item: CartItem) =>
                                                (acc +=
                                                    item.quantity *
                                                    item.product.price),
                                            0
                                        )
                                    )}
                                </div>
                            </div>
                            <Button
                                size='large'
                                type='primary'
                                className={cl('checkout')}
                                to='/checkout'
                            >
                                PROCEED TO CHECKOUT
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
