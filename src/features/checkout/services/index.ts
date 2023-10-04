import request from '../../../utils/request'

interface Props {
    address_id: number
    user_id: number
    cart_id?: number
}

export const createOrder = async (values: Props) => {
    const res = await request.post('/invoice/create', { ...values, cart_id: 0 })
    return res
}

export const goPayment = async ({
    invoice_id,
    user_id,
    method,
}: {
    invoice_id: number
    user_id: number
    method: string
}) => {
    const res = await request.post(`/payment/pay/${invoice_id}`, {
        user_id,
        paymentMethod: method,
    })
    return res
}
