import request from '../../../utils/request'

interface Props {
    id: number
    user_id: number
    tour_id: number
    quantity: number
}
export const updateQuantity = async ({
    id,
    user_id,
    tour_id,
    quantity,
}: Props) => {
    const res = await request.put(`/Booking/${id}`, {
        user_id,
        tour_id,
        quantity,
    })
    return res
}
