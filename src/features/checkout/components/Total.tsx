import classNames from 'classnames/bind'
import styles from '../Checkout.module.scss'
import Heading from './Heading'
import Item from './Item'
import Button from '../../../components/__atom/Button'
import CartItem from '../../../model/cart-item'
import vnpayIcon from '../../../assets/img/components/vnpay.png'
import paypalIcon from '../../../assets/img/components/paypal.png'
import { Divider, Radio } from 'antd'
const cl = classNames.bind(styles)

function Total({
    cart = [],
    method,
    setMethod,
}: {
    cart: CartItem[]
    method: string
    setMethod: any
}) {
    return (
        <div className={cl('numbers')}>
            <Heading>Your Order</Heading>
            <div className='mt-4'>
                <Item label='Products' value='Total'></Item>
                <Divider style={{ marginBlock: '10px' }} />
                {cart?.length > 0 &&
                    cart.map((x) => (
                        <Item
                            key={x.id}
                            label={x.product.name}
                            value={`${x.quantity} x ${x.product.price} VND`}
                        ></Item>
                    ))}
                <Divider style={{ marginBlock: '10px' }} />
                <Item
                    label='Subtotal'
                    value={`${cart.reduce(
                        (acc, item) =>
                            (acc += item.product.price * item.quantity),
                        0
                    )} VND`}
                ></Item>
                <Divider style={{ marginBlock: '10px' }} />

                <Item label='Shipping' value='Free'></Item>
                <Divider style={{ marginBlock: '10px' }} />

                <Item
                    label='Total'
                    value={`${cart.reduce(
                        (acc, item) =>
                            (acc += item.product.price * item.quantity),
                        0
                    )} VND`}
                    bold
                ></Item>
                <Divider style={{ marginBlock: '10px' }} />
                <div className={cl('group')}>
                    <div className={cl('title')}>Billing Address</div>
                    <Radio.Group
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                    >
                        <div className={cl('method-wrapper')}>
                            <label
                                htmlFor='method1'
                                className={cl('method', {
                                    expand: method === 'vnpay',
                                })}
                            >
                                <Radio id='method1' value='vnpay'></Radio>
                                <div className={cl('method-icon')}>
                                    <img
                                        src={vnpayIcon}
                                        alt=''
                                        className={cl('method-img')}
                                    />
                                </div>
                                <div className={cl('method-name')}>VNPay</div>
                            </label>
                            <div className={cl('method-expand')}>
                                In order to complete your transaction, we will
                                transfer you over to VNPay's secure servers.
                            </div>
                        </div>
                        <div className={cl('method-wrapper')}>
                            <label
                                htmlFor='method2'
                                className={cl('method', {
                                    expand: method === 'paypal',
                                })}
                            >
                                <Radio id='method2' value='paypal' />
                                <div className={cl('method-icon')}>
                                    <img
                                        src={paypalIcon}
                                        alt=''
                                        className={cl('method-img')}
                                    />
                                </div>
                                <div className={cl('method-name')}>Paypal</div>
                            </label>
                            <div className={cl('method-expand')}>
                                In order to complete your transaction, we will
                                transfer you over to PayPal's secure servers.
                            </div>
                        </div>
                    </Radio.Group>
                </div>
            </div>
            <Button type='primary' className='mt-4'>
                Place Order
            </Button>
        </div>
    )
}

export default Total
