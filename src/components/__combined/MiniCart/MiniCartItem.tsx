import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import CartItem from '../../../model/cart-item'
import { deleteCartItem } from '../../../services'

import classNames from 'classnames/bind'
import styles from './MiniCart.module.scss'
import { message } from 'antd'
import formatCurrency from '../../../utils/formatCurrency'
const cl = classNames.bind(styles)

function MiniCartItem({ id, tour, quantity }: CartItem) {
    const queryClient = useQueryClient()
    const deleteCartItemMutation = useMutation(deleteCartItem, {
        onSuccess: (data) => {
            message.info('Removed from cart')
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleDelete = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        deleteCartItemMutation.mutate({ cart_id: id })
    }
    return (
        <Link to={`/tour/${tour.id}`} className={cl('item-wrapper')}>
            <img
                src={
                    tour?.imageUrls[0] ||
                    'https://wokiee.jamstacktemplates.dev/assets/images/product/product-03.jpg'
                }
                alt='product'
                className={cl('item-img')}
            />
            <div className={cl('item-info')}>
                <div>{tour.name}</div>
                <div>
                    {quantity} x {formatCurrency(tour.giaThamKhao)}
                </div>
            </div>
            <div onClick={(e) => handleDelete(e)} className={cl('item-delete')}>
                <DeleteOutlined />
            </div>
        </Link>
    )
}

export default MiniCartItem
