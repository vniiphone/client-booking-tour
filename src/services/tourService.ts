import request from '../utils/request'

interface Props {
    id: string
    page: number
    sortBy: string
    user_id: number
    tour_id: number
    quantity: number
    cart_id: number
}

// Get all Tuors
export const getTours = async ({ page, sortBy }: Partial<Props>) => {
    const res = await request.get('/tour', {
        params: { page, sortBy: sortBy || 'id' },
    })
    // console.log(res)
    if (res.status === 200) return res.data
    return []
}