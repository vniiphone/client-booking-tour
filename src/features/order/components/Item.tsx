import React from 'react'

import classNames from 'classnames/bind'
import styles from '../Order.module.scss'
import { Image } from 'antd'
import Product from '../../../model/tour'
import productPlaceholder from '../../../assets/img/components/product_placeholder.png'
import formatCurrency from '../../../utils/formatCurrency'
import CartItem from '../../../model/cart-item'
const cl = classNames.bind(styles)

function Item({ item }: { item: CartItem }) {
    return (
        <div className={cl('item')}>
            <Image
                width={100}
                height={100}
                src={
                    item.tour.imageUrls
                    // 'https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
                }
                fallback={productPlaceholder}
            />
            <div className={cl('name')}>{item.tour.name}</div>
            <div className={cl('info')}>
                <div className={cl('price')}>
                    {formatCurrency(item.tour.giaThamKhao)}
                </div>
                <div className={cl('quantity')}>
                    x {''}
                    {item.soLuongVe}
                    {''} =
                </div>
                <div className={cl('price')}>
                    {formatCurrency(item.tour.giaThamKhao * item.soLuongVe)}
                </div>
            </div>
        </div>
    )
}

export default Item
