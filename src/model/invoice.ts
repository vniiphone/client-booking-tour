import Address from './address'
import CartItem from './cart-item'
import User from './user'

export default interface Invoice {
    invoiceId: number
    method: string
    paymentMethod?: string
    timeCreate: string
    totalPrice: number
    wasPay: boolean
    address: Address
    user: User
    cartItems: CartItem[]
}
