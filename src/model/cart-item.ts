import Tour from './tour'

export default interface CartItem {
    id: number
    tour: Tour
    quantity: number
    status: boolean
}
