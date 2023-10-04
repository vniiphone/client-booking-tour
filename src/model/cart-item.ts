import Product from './tour'

export default interface CartItem {
    id: number
    product: Product
    quantity: number
    status: boolean
}
