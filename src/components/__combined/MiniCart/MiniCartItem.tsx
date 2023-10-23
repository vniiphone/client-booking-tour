import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import CartItem from '../../../model/cart-item'
import { deleteCartItem } from '../../../services'
import image4 from "../../../assets/img/global/LOGO.png"
import classNames from 'classnames/bind'
import styles from './MiniCart.module.scss'
import { message } from 'antd'
import formatCurrency from '../../../utils/formatCurrency'
const cl = classNames.bind(styles)

function MiniCartItem({ id, tour, soLuongVe }: CartItem) {
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
        deleteCartItemMutation.mutate({ booking_id: id })
    }
    return (
        <Link to={`/tour/${tour.id}`} className={cl('item-wrapper')}>
            <img
                src={
                    tour?.imageUrls || image4
                }
                alt='product'
                className={cl('item-img')}
            />
            <div className={cl('item-info')}>
                <div>{tour.name}</div>
                <div>
                    {soLuongVe} x {formatCurrency(tour.giaThamKhao)}
                </div>
            </div>
            <div onClick={(e) => handleDelete(e)} className={cl('item-delete')}>
                <DeleteOutlined />
            </div>
        </Link>
    )
}

export default MiniCartItem
