import request from '../../../utils/request'

interface Props {
    id: number
    user_id: number
    product_id: number
    quantity: number
}
export const updateQuantity = async ({
    id,
    user_id,
    product_id,
    quantity,
}: Props) => {
    const res = await request.put(`/cart/${id}`, {
        user_id,
        product_id,
        quantity,
    })
    return res
}
