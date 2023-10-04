import React from 'react'
import classNames from 'classnames/bind'
import styles from '../UserOrder.module.scss'
import Invoice from '../../../model/invoice'
import ProductItem from '../../order/components/Item'
import logo from '../../../assets/img/global/logo_primary.png'
import formatCurrency from '../../../utils/formatCurrency'
import moment from 'moment'
const cl = classNames.bind(styles)

function Item({ invoice }: { invoice: Invoice }) {
    return (
        <div className={cl('item')}>
            <div className={cl('header')}>
                <span className={cl('status', { pending: !invoice.wasPay })}>
                    STATUS: {invoice.wasPay ? 'PAID' : 'PENDING'}
                </span>
            </div>
            <div className={cl('info')}>
                <div className={cl('left')}>
                    <div className={cl('title')}>INVOICE</div>
                    <div className={cl('group')}>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>
                                Invoice ID
                            </span>
                            :
                            <span className={cl('group-value')}>
                                {invoice.invoiceId}
                            </span>
                        </div>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>
                                Issue Date
                            </span>
                            :
                            <span className={cl('group-value')}>
                                {moment
                                    .utc(invoice.timeCreate, 'DD-MM-yyyy HH:mm')
                                    .format('DD/MM/yyyy')}
                            </span>
                        </div>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>
                                Payment method
                            </span>
                            :
                            <span className={cl('group-value')}>
                                {(
                                    invoice.paymentMethod || 'VNPAY'
                                ).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cl('right')}>
                    <img src={logo} className={cl('logo')} alt='logo' />
                    <div className={cl('group')}>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>Address</span>:
                            <span className={cl('group-value')}>
                                {invoice.address.address}
                            </span>
                        </div>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>Phone</span>:
                            <span className={cl('group-value')}>
                                {invoice.address.phone}
                            </span>
                        </div>
                        <div className={cl('group-item')}>
                            <span className={cl('group-label')}>City</span>:
                            <span className={cl('group-value')}>
                                {`${invoice.address.ward.name}, ${invoice.address.ward.district.name}, ${invoice.address.ward.district.city.name}`}
                            </span>
                        </div>
                    </div>
                    <div className={cl('total')}>
                        TOTAL:{' '}
                        {formatCurrency(
                            invoice.cartItems.reduce(
                                (acc, item) =>
                                    (acc += item.quantity * item.product.price),
                                0
                            )
                        ) || 0}
                    </div>
                </div>
            </div>
            <div className={cl('products')}>
                {invoice.cartItems.map((x) => (
                    <ProductItem item={x} key={x.id}></ProductItem>
                ))}
            </div>
        </div>
    )
}

export default Item
