import request from '../../../utils/request'

export const getUserOrders = async (userId: number) => {
    const res = await request.get(
        `/invoice/getAllInvoicesPaySuccessByUser/${userId}`
    )
    if (res.status === 200) return res.data
    return []
}
