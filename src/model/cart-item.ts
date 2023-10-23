import Tour from './tour'

export default interface CartItem {
    id: number
    tour: Tour
    soLuongVe: number
    status: boolean
}
