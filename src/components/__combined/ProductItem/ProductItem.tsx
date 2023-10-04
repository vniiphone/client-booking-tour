import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '../../../hooks'
import { addToCart } from '../../../services'
import Button from '../../../components/__atom/Button'

import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'
import { message } from 'antd'
const cl = classNames.bind(styles)

interface Props {
    id: number
    name: string
    giaThamKhao: number
    imageUrls: Array<string>
    category: any
    soLuongVe: number
}

function ProductItem({ id, name, giaThamKhao, imageUrls, category, soLuongVe }: Props) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth)
    const addToCartMutation = useMutation(addToCart, {
        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201)
                message.success('Added to cart')
            else message.error('Tour is out of stock')
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleAddToCart = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user.hasOwnProperty('id')) navigate('/login')
        else
            addToCartMutation.mutate({
                tour_id: id,
                quantity: 1,
                user_id: user.id,
            })
    }

    return (
        <Link to={`/tour/${id}`} className={cl('item-wrapper')}>
            <img
                src={
                    imageUrls[0] ||
                    'https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
                }
                alt=''
                className={cl('item-img')}
            />
            <div className={cl('item-info')}>
                <div className={cl('item-name')}>{name}</div>
                <div className={cl('item-price')}>{giaThamKhao} VND</div>
                <Button
                    onClick={handleAddToCart}
                    className={cl('item-add')}
                    type='primary'
                    disabled={soLuongVe === 0}
                >
                    Add to cart
                </Button>
            </div>
            {/* <div className={cl('category')}>{category.name}</div> */}
        </Link>
    )
}

export default ProductItem
