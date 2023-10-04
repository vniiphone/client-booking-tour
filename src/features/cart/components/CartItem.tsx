import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateQuantity } from '../services'
import { deleteCartItem } from '../../../services'
import CartItemModel from '../../../model/cart-item'

import classNames from 'classnames/bind'
import styles from '../Cart.module.scss'
import formatCurrency from '../../../utils/formatCurrency'
const cl = classNames.bind(styles)

function CartItem({ id, product, quantity }: CartItemModel) {
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
            product_id: 0,
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
        deleteCartItemMutation.mutate({ cart_id: id })
    }
    return (
        <div className={cl('item-wrapper')}>
            <DeleteOutlined
                onClick={handleDelete}
                className={cl('item-delete')}
            />
            <img
                src={
                    product.imageUrl ||
                    'https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
                }
                alt=''
                className={cl('item-image')}
            />
            <Link to='/' className={cl('item-info')}>
                <div className={cl('item-name')}>{product.name}</div>
                <div className={cl('item-price')}>
                    {formatCurrency(product.price)}
                </div>
            </Link>
            <InputNumber
                onChange={(value) => {
                    if (value) handleUpdateQuantity(value)
                }}
                size='large'
                min={1}
                max={product.stock}
                defaultValue={1}
            />
            <div className={cl('item-subtotal')}>
                {formatCurrency(product.price * quantity)}
            </div>
        </div>
    )
}

export default CartItem
