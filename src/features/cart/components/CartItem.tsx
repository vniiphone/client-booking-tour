import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateQuantity } from '../services'
import { deleteCartItem } from '../../../services'
import CartItemModel from '../../../model/cart-item'
import imgReplace from '../../../assets/img/global/404/007-travel-itinerary.png'
import classNames from 'classnames/bind'
import styles from '../Cart.module.scss'
import formatCurrency from '../../../utils/formatCurrency'
const cl = classNames.bind(styles)

function CartItem({ id, tour, soLuongVe }: CartItemModel) {
    const queryClient = useQueryClient()
    const updateQuantityMutation = useMutation(updateQuantity, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleUpdateQuantity = (value: number) => {
        updateQuantityMutation.mutate({
            id,
            quantity: value,
            user_id: 0,
            tour_id: 0,
        })
    }

    const deleteCartItemMutation = useMutation(deleteCartItem, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleDelete = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        deleteCartItemMutation.mutate({ booking_id: id })
    }
    return (
        <div className={cl('item-wrapper')}>
            <DeleteOutlined
                onClick={handleDelete}
                className={cl('item-delete')}
            />
            <img
                src={
                    tour.imageUrls || imgReplace
                }
                alt=''
                className={cl('item-image')}
            />
            <Link to='/' className={cl('item-info')}>
                <div className={cl('item-name')}>{tour.name}</div>
                <div className={cl('item-price')}>
                    {tour.giaThamKhao.toLocaleString(
                        'vi-VN',
                        {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0,
                        }
                    )}
                    {/* {formatCurrency(tour.giaThamKhao)} */}
                </div>
            </Link>
            <InputNumber
                onChange={(value) => {
                    if (value) handleUpdateQuantity(value)
                }}
                size='large'
                min={1}
                max={tour.soLuongVe}
                defaultValue={1}
            />
            <div className={cl('item-subtotal')}>
                {(tour.giaThamKhao * soLuongVe).toLocaleString(
                    'vi-VN',
                    {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                    }
                )}
                {/* {formatCurrency(tour.giaThamKhao * soLuongVe)} */}
            </div>
        </div>
    )
}

export default CartItem
