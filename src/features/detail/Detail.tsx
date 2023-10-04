import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Image, InputNumber, message, Spin } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '../../hooks'
import Button from '../../components/__atom/Button'
import { getProductById } from '../../services'
import { addToCart } from '../../services'

import classNames from 'classnames/bind'
import styles from './Detail.module.scss'
import User from '../../model/user'
const cl = classNames.bind(styles)

interface Props {
    id: number
}

function Detail() {
    const queryClient = useQueryClient()
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const user: User = useAppSelector((state) => state.auth)
    const { id } = useParams()
    const productQuery = useQuery(['product'], () => getProductById({ id }))

    const addToCartMutation = useMutation(addToCart, {
        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201)
                message.success('Added to cart')
            else message.error('Product is out of stock')
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleAddToCart = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user.hasOwnProperty('id') || !id) navigate('/login')
        else
            addToCartMutation.mutate({
                product_id: parseInt(id),
                quantity: quantity,
                user_id: user.id,
            })
    }

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/product'>Product</Link>
                </Breadcrumb.Item>
                {productQuery?.data && (
                    <Breadcrumb.Item>
                        <Link to={`/product/${productQuery.data.id}`}>
                            {productQuery.data.name}
                        </Link>
                    </Breadcrumb.Item>
                )}
            </Breadcrumb>
            <div className={cl('main')}>
                {productQuery.isLoading ? (
                    <Spin />
                ) : (
                    <>
                        <div className={cl('image-wrapper')}>
                            <Image
                                className={cl('image')}
                                src={productQuery.data.imageUrl}
                                fallback='https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
                            ></Image>
                        </div>
                        <div className={cl('info')}>
                            <div className={cl('text')}>
                                Availability:{' '}
                                {productQuery.data.stock > 0
                                    ? 'Stock'
                                    : 'Out of stock'}
                            </div>
                            <div className={cl('name')}>
                                {productQuery.data.name}
                            </div>
                            <div className={cl('price')}>
                                {productQuery.data.price} VND
                            </div>
                            <div className={cl('text')}>
                                {productQuery.data.description}
                            </div>
                            <div className={cl('cart')}>
                                <InputNumber
                                    onChange={(value) => setQuantity(value)}
                                    value={quantity}
                                    size='large'
                                    max={productQuery.data.stock}
                                    min={1}
                                    defaultValue={1}
                                />
                                <Button
                                    className={cl('button')}
                                    size='large'
                                    type='primary'
                                    onClick={handleAddToCart}
                                    disabled={productQuery.data.stock === 0}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Detail
